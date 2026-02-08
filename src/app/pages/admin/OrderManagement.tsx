import React, { useState } from 'react';
import { Order, CartItem, Address } from '../../types';
import { Search, Loader2, Eye, Filter, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

// Dummy Order Data
const DUMMY_ORDERS: Order[] = [
    {
        id: 'ORD-2024-001',
        userId: 'u1',
        items: [
            {
                id: 'item1',
                productId: 'p1',
                itemType: 'product',
                vendorId: 'v1',
                quantity: 1,
                price: 12500,
                title: 'Abstract Waves',
                image: 'https://images.unsplash.com/photo-1635141849017-c531949fb5b3?q=80&w=200'
            }
        ],
        subtotal: 12500,
        tax: 0,
        shipping: 0,
        total: 12500,
        status: 'delivered',
        paymentMethod: 'card',
        paymentStatus: 'paid',
        shippingAddress: {
            id: 'addr1',
            label: 'Home',
            street: '123, Park Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            zip: '400001',
            country: 'India'
        },
        createdAt: '2024-05-15T10:30:00Z',
        updatedAt: '2024-05-15T10:30:00Z'
    },
    {
        id: 'ORD-2024-002',
        userId: 'u2',
        items: [
            {
                id: 'item2',
                productId: 'p2',
                itemType: 'product',
                vendorId: 'v1',
                quantity: 2,
                price: 2499,
                title: 'Handcrafted Ceramic Vase',
                image: 'https://images.unsplash.com/photo-1735807009262-59c7c0366042?q=80&w=200'
            }
        ],
        subtotal: 4998,
        tax: 0,
        shipping: 0,
        total: 4998,
        status: 'processing',
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        shippingAddress: {
            id: 'addr2',
            label: 'Home',
            street: '45, Green Avenue',
            city: 'Ahmedabad',
            state: 'Gujarat',
            zip: '380001',
            country: 'India'
        },
        createdAt: '2024-05-20T14:15:00Z',
        updatedAt: '2024-05-20T14:15:00Z'
    },
    {
        id: 'ORD-2024-003',
        userId: 'u3',
        items: [
            {
                id: 'item3',
                productId: 'p3',
                itemType: 'product',
                vendorId: 'v1',
                quantity: 1,
                price: 1899,
                title: 'Tribal Art Print',
                image: 'https://images.unsplash.com/photo-1661708736258-8f44f9ed76bd?q=80&w=200'
            }
        ],
        subtotal: 1899,
        tax: 0,
        shipping: 0,
        total: 1899,
        status: 'processing', // Use valid status enum
        paymentMethod: 'card',
        paymentStatus: 'paid',
        shippingAddress: {
            id: 'addr3',
            label: 'Home',
            street: '78, MG Road',
            city: 'Bangalore',
            state: 'Karnataka',
            zip: '560001',
            country: 'India'
        },
        createdAt: '2024-05-22T09:00:00Z',
        updatedAt: '2024-05-22T09:00:00Z'
    },
    {
        id: 'ORD-2024-004',
        userId: 'u4',
        items: [
            {
                id: 'item4',
                productId: 'p4',
                itemType: 'product',
                vendorId: 'v1',
                quantity: 1,
                price: 15000,
                title: 'Realistic Family Portrait',
                image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=200'
            }
        ],
        subtotal: 15000,
        tax: 0,
        shipping: 0,
        total: 15000,
        status: 'pending',
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        shippingAddress: {
            id: 'addr4',
            label: 'Home',
            street: '12, Civil Lines',
            city: 'Delhi',
            state: 'Delhi',
            zip: '110054',
            country: 'India'
        },
        createdAt: '2024-05-24T18:45:00Z',
        updatedAt: '2024-05-24T18:45:00Z'
    },
    {
        id: 'ORD-2024-005',
        userId: 'u5',
        items: [
            {
                id: 'item5',
                productId: 'p5',
                itemType: 'product',
                vendorId: 'v1',
                quantity: 3,
                price: 450,
                title: 'Terracotta Planter',
                image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=200'
            }
        ],
        subtotal: 1350,
        tax: 0,
        shipping: 0,
        total: 1350,
        status: 'delivered',
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        shippingAddress: {
            id: 'addr5',
            label: 'Home',
            street: '56, Jubilee Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            zip: '500033',
            country: 'India'
        },
        createdAt: '2024-05-10T11:20:00Z',
        updatedAt: '2024-05-10T11:20:00Z'
    }
];

export const AdminOrderManagement: React.FC = () => {
    // Cast dummy data to Order[] to avoid strict enum issues if any, though we matched them mostly.
    const [orders, setOrders] = useState<Order[]>(DUMMY_ORDERS as unknown as Order[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.userId.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-500">Manage and track all customer orders</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download size={16} />
                        Export
                    </Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search by Order ID or User ID..."
                        className="pl-10 bg-gray-50 border-gray-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter size={16} />
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs font-medium text-gray-600">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                    <img
                                                        src={order.items[0]?.image || 'https://via.placeholder.com/40'}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="max-w-[150px]">
                                                    <p className="font-medium text-gray-900 truncate" title={order.items[0]?.title}>
                                                        {order.items[0]?.title}
                                                    </p>
                                                    {order.items.length > 1 && (
                                                        <p className="text-xs text-gray-500">+{order.items.length - 1} more items</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">User {order.userId}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ₹{order.total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                                <Search className="text-gray-400" size={20} />
                                            </div>
                                            <p className="font-medium">No orders found</p>
                                            <p className="text-sm mt-1">Try adjusting your search or filter</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
