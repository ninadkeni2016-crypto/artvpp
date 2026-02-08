import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { paymentApi } from '../../services/api';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface CheckoutPageProps {
    onNavigate: (page: string) => void;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
    const { items, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const tax = totalPrice * 0.18;
    const shipping = totalPrice > 5000 ? 0 : 500;
    const total = totalPrice + tax + shipping;

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!user) {
            toast.error("Please login to continue");
            return;
        }

        setLoading(true);

        try {
            const res = await loadRazorpayScript();

            if (!res) {
                toast.error('Razorpay SDK failed to load. Are you online?');
                return;
            }

            // 1. Create Order on Backend
            const orderData = await paymentApi.createOrder(total);

            if (!orderData || !orderData.id) {
                console.error("Order creation failed", orderData);
                toast.error("Server error. Failed to create order.");
                return;
            }

            // 2. Open Razorpay Modal (OFFICIAL)
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // test key from env
                amount: orderData.amount.toString(),
                currency: orderData.currency,
                name: "KALAVPP",
                description: "Artwork Purchase",
                order_id: orderData.id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment on Backend
                        const verificationData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            items: items.map(item => ({
                                itemType: item.itemType,
                                itemId: item.id,
                                title: item.title,
                                image: item.image,
                                vendorId: item.vendorId,
                                customizationNotes: item.customizationNotes,
                                quantity: item.quantity,
                                price: item.price
                            })),
                            amount: total,
                            shippingAddress: {}
                        };

                        const result = await paymentApi.verifyPayment(verificationData);

                        if (result.status === 'success') {
                            // alert("Payment Successful!"); // Optional as per request
                            toast.success('Payment Successful!');
                            clearCart();
                            onNavigate('payment-success');
                        } else {
                            toast.error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error('Payment verification failed');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || '9999999999',
                },
                theme: {
                    color: "#7C3AED",
                },
            };

            const Razorpay = window.Razorpay;
            if (!Razorpay) {
                toast.error("Razorpay SDK not loaded");
                return;
            }

            const paymentObject = new Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Payment failed", error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Your cart is empty. <Button variant="link" onClick={() => onNavigate('home')}>Go Shopping</Button></p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Order Details */}
                    <Card className="p-6">
                        <h3 className="font-bold text-lg mb-4">Order Details</h3>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <div>
                                        <span className="font-medium">{item.title}</span>
                                        <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                    </div>
                                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="border-t pt-4 mt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (18%)</span>
                                    <span>₹{tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Payment Section */}
                    <Card className="p-6 h-fit">
                        <h3 className="font-bold text-lg mb-4">Payment</h3>
                        <div className="bg-blue-50 p-4 rounded-md mb-6">
                            <p className="text-sm text-blue-800">
                                <strong>Test Mode:</strong> No real money will be deducted. You can use any dummy card details or UPI.
                            </p>
                        </div>


                        <div className="space-y-4">
                            <div className="bg-white border rounded-lg p-4 flex flex-col items-center text-center space-y-2">
                                <p className="text-gray-600 mb-2">Secure Payment via Razorpay</p>
                                {/* We can add a razorpay logo image here if available, or just keeping it simple as requested */}
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6"
                            size="lg"
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                `Pay ₹${total.toLocaleString()}`
                            )}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};
