import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { User, Package, Heart, Settings, LogOut, MapPin, Edit2, Trash2 } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { toast } from 'sonner';

interface ProfilePageProps {
    onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
    const { user, logout, updateProfile } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || ''); // Phone might not be on User type yet, but backend supports it
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile({ name, phone });
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    const userOrders = mockOrders.filter(o => o.userId === user.name); // Simple mock filter

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                            <p className="text-gray-500 mb-4">{user.email}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <Badge variant="secondary" className="px-4 py-1">Member since 2024</Badge>
                                <Badge variant="outline" className="px-4 py-1 capitalize">{user.role}</Badge>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('settings')}>
                                <Settings className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button variant="destructive" className="w-full justify-start" onClick={logout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>

                    {/* Content Tabs */}
                    <Tabs defaultValue="orders" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="addresses">Manage Addresses</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="orders">
                            <Card className="p-6">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Order History
                                </h3>
                                {userOrders.length > 0 ? (
                                    <div className="space-y-4">
                                        {userOrders.map((order) => (
                                            <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <span className="font-semibold">Order #{order.id}</span>
                                                        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-bold block">₹{order.total.toLocaleString('en-IN')}</span>
                                                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'processing' || order.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600">{order.items.length} items</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No orders found</p>
                                        <Button variant="link" onClick={() => onNavigate('marketplace-physical')}>Start Shopping</Button>
                                    </div>
                                )}
                            </Card>
                        </TabsContent>

                        <TabsContent value="wishlist">
                            <Card className="p-6 text-center py-12">
                                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium text-gray-900">Your Wishlist is empty</h3>
                                <p className="text-gray-500 mb-6">Save items you love to buy later.</p>
                                <Button onClick={() => onNavigate('marketplace-physical')}>Explore Marketplace</Button>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings">
                            <Card className="p-6">
                                <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <input type="email" defaultValue={user.email} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" disabled />
                                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+91..."
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                        />
                                    </div>
                                    <Button type="submit" className="mt-4" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </form>

                                {/* DEV ONLY: Admin Promotion */}
                                <div className="mt-8 pt-6 border-t">
                                    <h4 className="text-sm font-semibold mb-2 text-gray-500">Developer Options</h4>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={async () => {
                                            if (!confirm("Promote self to Admin?")) return;
                                            try {
                                                await import('../../services/api').then(({ default: api }) => api.post('/auth/promote-admin', {}));
                                                window.location.reload();
                                                toast.success("Promoted to Admin");
                                            } catch (e) {
                                                toast.error("Failed to promote");
                                            }
                                        }}
                                    >
                                        Make Me Admin
                                    </Button>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="addresses">
                            <AddressManager />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

// Address Manager Component
const AddressManager = () => {
    const { user, updateProfile } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        label: 'Home',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        isDefault: false
    });

    const addresses = user?.addresses || [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let updatedAddresses = [...addresses];
            const newAddress = {
                id: editingId || crypto.randomUUID(),
                ...formData
            };

            if (formData.isDefault) {
                updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
            }

            if (editingId) {
                updatedAddresses = updatedAddresses.map(a => a.id === editingId ? newAddress : a);
            } else {
                updatedAddresses.push(newAddress);
            }

            // Call API to update addresses (we reusing updateProfile or need a new context method?)
            // Assuming updateProfile can handle partial user updates including addresses if we modify it, 
            // BUT api.ts updateProfile implementation sends data to PUT /auth/profile.
            // backend auth.js PUT /profile/address route exists now. 
            // We should use a specific API call for addresses or generic update. 
            // For now, let's use the new endpoint via axios directly or extend AuthContext.
            // Since AuthContext exposes updateProfile which calls api.updateProfile, let's check api.ts.
            // api.ts updateProfile sends to /auth/profile. 
            // We need to call the new route /auth/profile/address.
            // For simplicity in this file without modifying context excessively, we'll use api directly here or add a helper.

            // Let's assume we can pass specific address data to a new api function or generic update.
            // The backend `PUT /profile` routes handles name/phone/bio. `PUT /profile/address` handles addresses.
            // I'll call the address endpoint directly here.

            await import('../../services/api').then(({ default: api }) =>
                api.put('/auth/profile/address', { addresses: updatedAddresses })
            );

            // We also need to update the local user context. 
            // The easiest way is to reload profile or manually update context.
            // Since useAuth doesn't expose a setAddresses, we might need to rely on re-fetching or page reload.
            // Ideally updateProfile in context should handle this, but for now:
            window.location.reload(); // Simple brute force update for now to reflect context

            toast.success(editingId ? 'Address updated' : 'Address added');
            setIsAdding(false);
            setEditingId(null);
            setFormData({ label: 'Home', street: '', city: '', state: '', zip: '', country: 'India', isDefault: false });

        } catch (error) {
            console.error(error);
            toast.error("Failed to save address");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const updatedAddresses = addresses.filter(a => a.id !== id);
            await import('../../services/api').then(({ default: api }) =>
                api.put('/auth/profile/address', { addresses: updatedAddresses })
            );
            window.location.reload();
            toast.success("Address deleted");
        } catch (error) {
            toast.error("Failed to delete address");
        }
    };

    const startEdit = (addr: any) => {
        setFormData({
            label: addr.label,
            street: addr.street,
            city: addr.city,
            state: addr.state,
            zip: addr.zip,
            country: addr.country,
            isDefault: addr.isDefault || false
        });
        setEditingId(addr.id);
        setIsAdding(true);
    };

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Manage Addresses
                </h3>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)}>+ Add New Address</Button>
                )}
            </div>

            {isAdding ? (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-lg border p-4 rounded-lg bg-gray-50">
                    <h4 className="font-semibold">{editingId ? 'Edit Address' : 'New Address'}</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Label (e.g., Home)</label>
                            <input required value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} className="flex h-10 w-full rounded-md border border-input px-3" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">ZIP Code</label>
                            <input required value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} className="flex h-10 w-full rounded-md border border-input px-3" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Street Address</label>
                        <textarea required value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} className="flex w-full rounded-md border border-input px-3 py-2" rows={2} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">City</label>
                            <input required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="flex h-10 w-full rounded-md border border-input px-3" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">State</label>
                            <input required value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="flex h-10 w-full rounded-md border border-input px-3" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="isDefault" checked={formData.isDefault} onChange={e => setFormData({ ...formData, isDefault: e.target.checked })} />
                        <label htmlFor="isDefault" className="text-sm">Set as default address</label>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => { setIsAdding(false); setEditingId(null); }}>Cancel</Button>
                        <Button type="submit">Save Address</Button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    {addresses.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No addresses saved yet.</p>
                    ) : (
                        addresses.map((addr: any) => (
                            <div key={addr.id} className="border rounded-lg p-4 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{addr.label}</span>
                                        {addr.isDefault && <Badge variant="secondary">Default</Badge>}
                                    </div>
                                    <p className="text-gray-600 text-sm">{addr.street}</p>
                                    <p className="text-gray-600 text-sm">{addr.city}, {addr.state} - {addr.zip}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => startEdit(addr)}><Edit2 className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(addr.id)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </Card>
    );
};

// Simple Badge Component helper if not imported
const Badge = ({ children, variant = "default", className = "" }: any) => {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-purple-100 text-purple-900 hover:bg-purple-200",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
    };
    return (
        <div className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`}>
            {children}
        </div>
    );
};
