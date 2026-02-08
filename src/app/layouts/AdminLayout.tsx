import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Palette,
    GraduationCap,
    LogOut,
    Menu,
    X,
    Settings,
    FileText,
    Search,
    Calendar,
    Bell,
    MessageSquare,
    ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
    activePage: string;
    onNavigate: (page: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activePage, onNavigate }) => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        onNavigate('home');
    };

    const isAdmin = user?.role === 'admin';
    const isArtist = user?.role === 'vendor'; // 'vendor' is the artist role in our system
    const isCreator = user?.role === 'creator';

    // Define menu items based on role
    const getMenuItems = () => {
        const items = [
            { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ];

        if (isAdmin) {
            items.push(
                { id: 'admin-users', label: 'Customers', icon: Users },
                { id: 'admin-orders', label: 'Orders', icon: ShoppingBag },
                { id: 'admin-approvals', label: 'Approvals', icon: FileText }
            );
        }

        if (isAdmin || isArtist) {
            items.push(
                { id: 'dashboard-products', label: 'Products', icon: Palette },
                { id: 'dashboard-services', label: 'Services', icon: Settings } // Using Settings icon temporarily, maybe Briefcase better
            );
        }

        if (isAdmin || isCreator) {
            items.push(
                { id: 'dashboard-courses', label: 'Courses', icon: GraduationCap }
            );
        }

        return items;
    };

    const menuItems = getMenuItems();

    // Protect Admin Routes
    if (!user || (user.role !== 'admin' && user.role !== 'vendor' && user.role !== 'creator')) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center p-8 max-w-md">
                    <LogOut className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
                    <button
                        onClick={() => onNavigate('home')}
                        className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const getPageTitle = () => {
        switch (activePage) {
            case 'dashboard': return 'Overview';
            case 'admin-users': return 'Customers';
            case 'admin-orders': return 'Orders';
            case 'admin-approvals': return 'Approvals';
            case 'dashboard-products': return 'Products';
            case 'dashboard-services': return 'Services';
            case 'dashboard-courses': return 'Courses';
            default: return 'Dashboard';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="h-20 flex items-center px-6 border-b border-gray-50">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-xl">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                                <span className="text-amber-600 font-bold">A</span>
                            </div>
                            <span className="text-gray-900">Admin Dashboard</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-gray-400">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            // Match 'dashboard' exactly or partial match for others if needed, keeping simple exact match for now
                            const isActive = activePage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                                        ${isActive
                                            ? 'bg-amber-50 text-amber-600'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <Icon size={20} className={isActive ? 'text-amber-500' : 'text-gray-400'} />
                                    {item.label}
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer / User Profile - Optional based on design, maybe just logout */}
                    <div className="p-4 border-t border-gray-50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            Log Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 h-20 px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button onClick={() => setSidebarOpen(true)} className="text-gray-500">
                            <Menu size={24} />
                        </button>
                    </div>

                    <h1 className="text-xl font-bold text-gray-800 hidden lg:block">{getPageTitle()}</h1>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm text-gray-700 focus:ring-0 focus:bg-gray-100 placeholder-gray-400"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search size={16} /> {/* Second icon on right as per some designs or just keep clean */}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                            <Calendar size={16} />
                            <span>30 May</span> {/* Static date layout example */}
                        </button>

                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                            <MessageSquare size={20} />
                        </button>

                        <div className="ml-2 flex items-center gap-2 pl-2 border-l border-gray-100">
                            <img
                                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                                alt=""
                                className="w-8 h-8 rounded-full bg-emerald-100"
                            />
                            {/* Optional dropdown arrow */}
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
