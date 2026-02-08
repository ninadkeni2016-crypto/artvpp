import React from 'react';
import { Order, CartItem } from '../../types';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Star, Package, RefreshCw, XCircle, CheckCircle2 } from 'lucide-react';

interface OrderCardProps {
    order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    // Helper to get status color and icon
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'delivered':
                return {
                    color: 'bg-green-500',
                    text: 'text-gray-900',
                    icon: <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />,
                    label: `Delivered on ${new Date(order.updatedAt).toLocaleDateString(
                        'en-IN',
                        { month: 'short', day: 'numeric' }
                    )}`,
                    subtext: 'Your item has been delivered'
                };
            case 'cancelled':
                return {
                    color: 'bg-red-500',
                    text: 'text-red-600',
                    icon: <XCircle className="w-4 h-4 text-red-600 mr-2" />,
                    label: 'Cancelled',
                    subtext: 'As per your request'
                };
            case 'returned':
                return {
                    color: 'bg-orange-500',
                    text: 'text-orange-600',
                    icon: <RefreshCw className="w-4 h-4 text-orange-600 mr-2" />,
                    label: 'Refund Completed',
                    subtext: `Refund ID: REF-${order.id.toUpperCase()}` // Mock Refund ID
                };
            case 'processing':
            case 'in-progress':
                return {
                    color: 'bg-blue-500',
                    text: 'text-blue-600',
                    icon: <Package className="w-4 h-4 text-blue-600 mr-2" />,
                    label: 'Arriving Soon',
                    subtext: 'Your order is being processed'
                };
            default:
                return {
                    color: 'bg-gray-500',
                    text: 'text-gray-600',
                    icon: <Package className="w-4 h-4 text-gray-600 mr-2" />,
                    label: status,
                    subtext: ''
                };
        }
    };

    const statusConfig = getStatusConfig(order.status);

    return (
        <Card className="hover:shadow-md transition-shadow border-gray-200 overflow-hidden">
            {order.items.map((item: CartItem) => (
                <div key={item.id} className="p-4 flex flex-col gap-4 border-b last:border-0 border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Image */}
                        <div className="w-full sm:w-24 h-24 shrink-0 bg-gray-100 rounded-md border flex items-center justify-center overflow-hidden">
                            {item.image && !item.image.includes('placeholder') ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                            ) : null}
                            <div className={`flex flex-col items-center justify-center text-gray-400 ${item.image && !item.image.includes('placeholder') ? 'hidden' : ''}`}>
                                <Package className="w-8 h-8 mb-1" />
                                <span className="text-[10px]">No Image</span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-gray-900 truncate pr-4">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.customizationNotes ? item.customizationNotes : 'No variations selected'}
                                    </p>
                                    <div className="mt-2 text-sm text-gray-500">
                                        Seller: <span className="text-gray-700">{order.items[0].vendorId === '2' ? 'Priya Sharma' : 'Kalavpp Seller'}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="font-bold text-lg">
                                        ₹{item.price.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>

                            {/* Status Section */}
                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center font-medium mb-1">
                                        {statusConfig.icon}
                                        <span className="text-gray-900">{statusConfig.label}</span>
                                    </div>
                                    {statusConfig.subtext && (
                                        <p className="text-xs text-gray-500 ml-6">{statusConfig.subtext}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                {(order.status === 'delivered') && (
                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                        <Star className="w-4 h-4 mr-2" />
                                        Rate & Review Product
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Shipment Tracker (Dummy Module) */}
                    <div className="pt-4 mt-2 border-t border-gray-50 bg-gray-50/50 rounded-lg p-3">
                        <div className="relative">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                <div style={{ width: getProgressWidth(order.status) }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <div className={`text-center ${['pending', 'processing', 'in-progress', 'shipped', 'delivered'].includes(order.status) ? 'text-blue-600 font-medium' : ''}`}>Placed</div>
                                <div className={`text-center ${['processing', 'in-progress', 'shipped', 'delivered'].includes(order.status) ? 'text-blue-600 font-medium' : ''}`}>Processing</div>
                                <div className={`text-center ${['shipped', 'delivered'].includes(order.status) ? 'text-blue-600 font-medium' : ''}`}>Shipped</div>
                                <div className={`text-center ${order.status === 'delivered' ? 'text-green-600 font-bold' : ''}`}>Delivered</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Card>
    );
};

// Helper for progress bar
const getProgressWidth = (status: string) => {
    switch (status) {
        case 'pending': return '5%';
        case 'processing': return '35%';
        case 'in-progress': return '65%'; // Simulating Shipped/In-Transit status for now
        case 'shipped': return '80%';
        case 'delivered': return '100%';
        case 'cancelled': return '0%';
        case 'returned': return '100%';
        default: return '0%';
    }
};
