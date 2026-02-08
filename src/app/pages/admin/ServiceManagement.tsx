import React, { useEffect, useState } from 'react';
import { Service } from '../../types';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { serviceApi } from '../../../services/api';

export const ServiceManagement: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const data = await serviceApi.getServices();
            setServices(data);
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredServices = services.filter(service => {
        return service.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
                    <p className="text-gray-500">Manage and view all services.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={fetchServices} variant="outline" size="sm">Refresh</Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search services..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center text-gray-500">
                        <Loader2 className="animate-spin w-8 h-8" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Artist</th>
                                    <th className="px-6 py-4">Delivery</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredServices.map((service) => (
                                    <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={service.images[0] || 'https://via.placeholder.com/150'}
                                                    alt=""
                                                    className="w-10 h-10 rounded bg-slate-100 object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">{service.title}</p>
                                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{service.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                                                {service.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            ₹{service.price} <span className="text-xs text-gray-500">({service.priceType})</span>
                                        </td>
                                        <td className="px-6 py-4">{service.vendorName}</td>
                                        <td className="px-6 py-4">{service.deliveryTime}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredServices.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No services found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
