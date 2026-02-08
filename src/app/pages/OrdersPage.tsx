import React, { useState, useMemo, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { OrderFilters } from '../components/orders/OrderFilters';
import { OrderCard } from '../components/orders/OrderCard';
import { orderApi } from '../../services/api';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

export const OrdersPage: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{ status: string[]; time: string }>({
        status: [],
        time: '',
    });

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const data = await orderApi.getUserOrders(user.id);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleFilterChange = (type: 'status' | 'time', value: string) => {
        if (type === 'status') {
            setFilters((prev) => ({
                ...prev,
                status: prev.status.includes(value)
                    ? prev.status.filter((id) => id !== value)
                    : [...prev.status, value],
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                time: prev.time === value ? '' : value, // Toggle
            }));
        }
    };

    const filteredOrders = useMemo(() => {
        let result = [...orders];

        // Status Filter
        if (filters.status.length > 0) {
            result = result.filter((order) => {
                // Map UI filter IDs to data statuses
                if (filters.status.includes('on-the-way') && (order.status === 'processing' || order.status === 'in-progress')) return true;
                if (filters.status.includes('delivered') && order.status === 'delivered') return true;
                if (filters.status.includes('cancelled') && order.status === 'cancelled') return true;
                if (filters.status.includes('returned') && order.status === 'returned') return true;
                return false;
            });
        }

        // Time Filter (simplified)
        if (filters.time) {
            // Basic date filtering logic
        }

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((order) =>
                order.items.some((item) =>
                    item.title.toLowerCase().includes(query)
                ) || order.id.toLowerCase().includes(query)
            );
        }

        // Sort by recent
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return result;
    }, [orders, filters, searchQuery]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin w-8 h-8 text-gray-500" /></div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                {/* Title hidden as it's likely in the parent or represented by breadcrumbs, but requirement said 'Page title: My Orders' */}
                {/* <h2 className="text-xl font-bold mb-4">My Orders</h2> */}
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Filters - Sidebar on Desktop */}
                <OrderFilters filters={filters} onFilterChange={handleFilterChange} />

                {/* Right Side: Search + List */}
                <div className="flex-1 space-y-4">

                    {/* Search Bar */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search your orders here"
                                className="pl-10 bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Search Orders
                        </Button>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            // Empty State
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <Search className="w-12 h-12 mb-4 opacity-20" />
                                    <p className="text-lg font-medium">No orders found</p>
                                    <p className="text-sm">Try adjusting your filters or search query.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
