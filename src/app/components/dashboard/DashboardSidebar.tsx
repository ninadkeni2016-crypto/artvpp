import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    User,
    Package,
    Settings,
    MapPin,
    CreditCard,
    Gift,
    Heart,
    Star,
    Bell,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface DashboardSidebarProps {
    activeSection: string;
    onNavigate: (section: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    activeSection,
    onNavigate,
}) => {
    const { user, logout } = useAuth();

    const menuItems = [
        {
            section: 'My Orders',
            icon: Package,
            id: 'orders',
            type: 'link'
        },
        {
            section: 'Account Settings',
            icon: Settings,
            id: 'account',
            items: [
                { label: 'Profile Information', id: 'profile' },
                { label: 'Manage Addresses', id: 'addresses' },
                { label: 'PAN Card Information', id: 'pan' },
            ]
        },
        {
            section: 'Payments',
            icon: CreditCard,
            id: 'payments',
            items: [
                { label: 'Gift Cards', id: 'gift-cards' },
                { label: 'Saved UPI', id: 'saved-upi' },
                { label: 'Saved Cards', id: 'saved-cards' },
            ]
        },
        {
            section: 'My Stuff',
            icon: Heart,
            id: 'stuff',
            items: [
                { label: 'My Coupons', id: 'coupons' },
                { label: 'My Reviews & Ratings', id: 'reviews' },
                { label: 'Notifications', id: 'notifications' },
                { label: 'Wishlist', id: 'wishlist' },
            ]
        }
    ];

    return (
        <div className="w-full md:w-[280px] shrink-0 space-y-4">
            {/* User Greeting Card */}
            <Card className="p-4 flex items-center gap-3 shadow-none border">
                <img
                    src={user?.avatar || 'https://github.com/shadcn.png'}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="text-xs text-gray-500">Hello,</p>
                    <h3 className="font-bold text-gray-900">{user?.name || 'User Name'}</h3>
                </div>
            </Card>

            {/* Navigation Menu */}
            <Card className="shadow-none border overflow-hidden">
                <div className="divide-y">
                    {menuItems.map((group) => (
                        <div key={group.id} className="py-2">
                            {/* If it has items (submenu) */}
                            {group.items ? (
                                <div>
                                    <div className="px-4 py-3 flex items-center text-gray-500 font-medium">
                                        <group.icon className="w-5 h-5 mr-3 text-blue-600" />
                                        {group.section}
                                    </div>
                                    <div className="flex flex-col">
                                        {group.items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => onNavigate(item.id)}
                                                className={`px-4 py-3 pl-12 text-sm text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${activeSection === item.id
                                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                                        : 'text-gray-700'
                                                    }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => onNavigate(group.id)}
                                    className={`w-full px-4 py-4 flex items-center text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${activeSection === group.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 font-medium'
                                        }`}
                                >
                                    <group.icon className="w-5 h-5 mr-3 text-blue-600" />
                                    <span className="flex-1">{group.section}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Logout */}
                    <div className="py-2">
                        <button
                            onClick={logout}
                            className="w-full px-4 py-4 flex items-center text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                        >
                            <LogOut className="w-5 h-5 mr-3 text-gray-500" />
                            Logout
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
