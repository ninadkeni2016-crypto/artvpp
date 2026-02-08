import React, { useEffect, useState } from 'react';
import {
    Users,
    ShoppingBag,
    TrendingUp,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronRight,
    Palette
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminStats } from '../../types';

// Component for a single stat card
const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtext: string;
    trend: 'up' | 'down';
    trendValue: string;
    icon: React.ElementType;
    iconBgColor: string;
    iconColor: string;
    loading?: boolean;
}> = ({ title, value, subtext, trend, trendValue, icon: Icon, iconBgColor, iconColor, loading }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-400 font-medium mb-1">{title}</p>
                <div className="text-xs text-gray-400 mb-4">{subtext}</div>
            </div>
            <div className={`p-3 rounded-full bg-opacity-20 ${iconBgColor} ${iconColor}`}>
                <Icon size={20} />
            </div>
        </div>

        <div className="flex items-end justify-between">
            {loading ? (
                <div className="h-8 w-24 bg-gray-100 animate-pulse rounded"></div>
            ) : (
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            )}

            <div className={`flex items-center text-xs font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {trendValue}
            </div>
        </div>
    </div>
);

// Mock Chart Components (Static placeholders for visual fidelity without heavy library)
const SalesAnalyticChart = () => (
    <div className="w-full h-64 flex items-end justify-between px-2 gap-2">
        {/* Simple CSS-based bar/line visual representation */}
        <svg className="w-full h-full text-amber-500" preserveAspectRatio="none" viewBox="0 0 100 50">
            <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d="M0,50 L0,40 Q10,35 20,42 T40,30 T60,35 T80,15 L100,20 L100,50 Z" fill="url(#gradient)" />
            <path d="M0,40 Q10,35 20,42 T40,30 T60,35 T80,15 L100,20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
    </div>
);

const SalesTargetChart = () => (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
        {/* Radial Progress Placeholder */}
        <svg className="w-full h-full -rotate-90">
            <circle cx="96" cy="96" r="80" stroke="#f3f4f6" strokeWidth="12" fill="none" />
            <circle cx="96" cy="96" r="80" stroke="#d97706" strokeWidth="12" fill="none" strokeDasharray="502" strokeDashoffset="125" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-gray-800">75%</span>
            <span className="text-xs text-gray-400">Target Achieved</span>
        </div>
    </div>
);

export const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetch for now, replace with actual API when ready
        const fetchStats = async () => {
            try {
                // In production, use api.get('/admin/stats')
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStats({
                    users: 1462,
                    artists: 25,
                    creators: 12,
                    orders: 1645,
                    products: 82,
                    services: 15,
                    courses: 8,
                    revenue: 8265000 // In Rupees now
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch stats", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (!user) return null;

    return (
        <div className="space-y-8">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    subtext="Last 30 days"
                    value={`₹${stats?.revenue.toLocaleString() || '82,65,000'}`}
                    trend="up"
                    trendValue="+15%"
                    icon={TrendingUp}
                    iconBgColor="bg-amber-100"
                    iconColor="text-amber-500"
                    loading={loading}
                />
                <StatCard
                    title="Total Order"
                    subtext="Last 30 days"
                    value={stats?.orders || 1645}
                    trend="up"
                    trendValue="+5%"
                    icon={ShoppingBag}
                    iconBgColor="bg-blue-100"
                    iconColor="text-blue-500"
                    loading={loading}
                />
                <StatCard
                    title="Total Customer"
                    subtext="Last 30 days"
                    value={stats?.users.toLocaleString() || 1462}
                    trend="down"
                    trendValue="-3%"
                    icon={Users}
                    iconBgColor="bg-orange-100"
                    iconColor="text-orange-500"
                    loading={loading}
                />
                <StatCard
                    title="Pending Delivery"
                    subtext="Last 30 days"
                    value="117"
                    trend="up"
                    trendValue="+8%"
                    icon={Package}
                    iconBgColor="bg-purple-100"
                    iconColor="text-purple-500"
                    loading={loading}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Analytic */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-800">Sales Analytic</h3>
                        <select className="text-sm bg-gray-50 border-none rounded-lg px-3 py-1.5 focus:ring-0 text-gray-500 font-medium cursor-pointer">
                            <option>Sort by: Oct 2023</option>
                            <option>Sort by: Sep 2023</option>
                        </select>
                    </div>
                    <div className="flex gap-8 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span className="text-sm text-gray-500">Income</span>
                            <span className="font-bold text-gray-800 ml-1">₹23,26,200</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                            <span className="text-sm text-gray-500">Expenses</span>
                            <span className="font-bold text-gray-800 ml-1">₹11,13,500</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span className="text-sm text-gray-500">Balance</span>
                            <span className="font-bold text-amber-500 ml-1 text-xs px-2 py-0.5 bg-amber-50 rounded bg-opacity-50">+15%</span>
                        </div>
                    </div>
                    <SalesAnalyticChart />
                </div>

                {/* Sales Target */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Sales Target</h3>
                    <SalesTargetChart />
                    <div className="mt-6 flex flex-col gap-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center gap-2 text-gray-500">
                                <Users size={16} className="text-gray-400" /> Daily Target
                            </span>
                            <span className="font-bold text-gray-800">650</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center gap-2 text-amber-500">
                                <ArrowUpRight size={16} /> Monthly Target
                            </span>
                            <span className="font-bold text-gray-800">+14,500</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Top Selling & Current Offer */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Top Selling Products */}
                <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-800">Top Selling Artworks</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Abstract Harmony", price: "12 Sold", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=260" },
                            { name: "Golden Horizon", price: "8 Sold", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=260" },
                            { name: "Urban Dreams", price: "24 Sold", img: "https://images.unsplash.com/photo-1549887552-93f8efb87349?q=80&w=260" },
                            { name: "Serene Valley", price: "15 Sold", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=260" },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 hover:bg-white hover:shadow-md transition-all border border-gray-50 hover:border-gray-100">
                                <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                                    <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Offer Banner */}
                <div className="bg-amber-500 p-6 rounded-2xl shadow-sm border border-amber-500 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-4">Limited Offer</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-amber-100 mb-1">Summer Art Sale - 40% Off</p>
                                <div className="h-1.5 w-full bg-amber-700/30 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-amber-100 mb-1">New Artist Grant</p>
                                <div className="h-1.5 w-full bg-amber-700/30 rounded-full overflow-hidden">
                                    <div className="h-full w-4/5 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-amber-100 mb-1">Premium Canvas Stock</p>
                                <div className="h-1.5 w-full bg-amber-700/30 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
