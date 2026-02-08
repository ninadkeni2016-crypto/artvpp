import React from 'react';
import { Button } from '../components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessPageProps {
    onNavigate: (page: string) => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your order. Your payment has been processed successfully.
                </p>
                <div className="space-y-3">
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={() => onNavigate('dashboard')}
                    >
                        View My Orders
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => onNavigate('home')}
                    >
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
};
