import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { AddressManagement } from '../components/dashboard/AddressManagement';
import { OrdersPage } from './OrdersPage';
import { ProfileInformation } from '../components/dashboard/ProfileInformation';
import { useAuth } from '../context/AuthContext';

interface UserDashboardProps {
    onNavigate: (page: string, id?: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onNavigate }) => {
    const [activeSection, setActiveSection] = useState('addresses');
    const { user } = useAuth();

    if (!user) {
        return null; // Or redirect
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'addresses':
                return <AddressManagement />;
            case 'orders':
                return <OrdersPage />;
            case 'profile':
                return <ProfileInformation />;
            default:
                return (
                    <div className="p-6 bg-white rounded shadow-sm">
                        <h2 className="text-xl font-bold mb-4 capitalize">{activeSection.replace('-', ' ')}</h2>
                        <p className="text-gray-500">Content for {activeSection} coming soon.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <DashboardSidebar
                        activeSection={activeSection}
                        onNavigate={setActiveSection}
                    />
                    <main className="flex-1 min-w-0">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};
