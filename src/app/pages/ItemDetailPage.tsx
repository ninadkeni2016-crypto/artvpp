import React from 'react';
import { ArrowLeft, Star, Share2, Heart, Clock, User, CheckCircle, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';
import { mockProducts, mockServices } from '../data/mockData';
import { toast } from 'sonner';

interface ItemDetailPageProps {
    id: string;
    type: 'product' | 'service';
    onNavigate: (page: string) => void;
}

export const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ id, type, onNavigate }) => {
    const { addToCart } = useCart();

    // Find item based on type and id
    const item = type === 'product'
        ? mockProducts.find(p => p.id === id)
        : mockServices.find(s => s.id === id);

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-xl text-gray-600 mb-4">Item not found</p>
                <Button onClick={() => onNavigate('home')}>Back to Home</Button>
            </div>
        );
    }

    const handleAction = () => {
        if (type === 'product') {
            const product = item as typeof mockProducts[0];
            addToCart({
                productId: product.id,
                itemType: 'product',
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.images[0],
                vendorId: product.vendorId,
            });
            toast.success('Added to cart!');
        } else {
            const service = item as typeof mockServices[0];
            addToCart({
                serviceId: service.id,
                itemType: 'service',
                title: service.title,
                price: service.price,
                quantity: 1,
                image: service.images[0],
                vendorId: service.vendorId,
            });
            toast.success('Service request added to cart!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 hover:bg-gray-200"
                    onClick={() => onNavigate(type === 'product' ? 'marketplace-physical' : 'services-custom')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to {type === 'product' ? 'Marketplace' : 'Services'}
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60';
                                }}
                            />
                        </div>
                        {item.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {item.images.map((img, idx) => (
                                    <div key={idx} className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-600 transition-all">
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{item.title}</h1>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center text-yellow-500">
                                            <Star className="w-5 h-5 fill-current" />
                                            <span className="ml-1 font-bold text-gray-900">{item.rating}</span>
                                        </div>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-gray-600 underline cursor-pointer hover:text-purple-600">
                                            {item.reviewCount} reviews
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        {type === 'service' && 'Starting from'} Price
                                    </p>
                                    <p className="text-3xl font-bold text-purple-600">
                                        ₹{item.price.toLocaleString('en-IN')}
                                    </p>
                                </div>
                                {type === 'service' && 'deliveryTime' in item && (
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 mb-1 flex items-center justify-end gap-1">
                                            <Clock className="w-3 h-3" /> Delivery Time
                                        </p>
                                        <p className="font-semibold text-gray-900">{(item as any).deliveryTime}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Vendor Info */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <img
                                src={item.vendorAvatar}
                                alt={item.vendorName}
                                className="w-12 h-12 rounded-full ring-2 ring-white"
                            />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500">Created by</p>
                                <h3 className="font-bold text-gray-900 flex items-center gap-1">
                                    {item.vendorName}
                                    <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-100" />
                                </h3>
                            </div>
                            <Button variant="outline" size="sm">View Profile</Button>
                        </div>

                        {/* Description */}
                        <div className="prose text-gray-600">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                            <p>{item.description}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {item.tags?.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 capitalize">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Secure Payment</p>
                                    <p className="text-xs text-gray-500">Funds held in escrow</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Quality Guarantee</p>
                                    <p className="text-xs text-gray-500">Verified standards</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="sticky bottom-4 md:static">
                            <Button
                                size="lg"
                                className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl"
                                onClick={handleAction}
                            >
                                {type === 'service' ? 'Request Portrait' : 'Add to Cart'}
                            </Button>
                            <p className="text-xs text-center text-gray-500 mt-2">
                                {type === 'service'
                                    ? 'No payment required until proposal is accepted'
                                    : 'Free shipping on orders above ₹999'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
