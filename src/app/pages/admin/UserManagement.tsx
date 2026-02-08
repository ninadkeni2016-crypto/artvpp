import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, UserRole } from '../../types';
import { Search, Loader2, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import api from '../../../services/api';

export const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/admin/users');
            setUsers(response.data.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: UserRole) => {
        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole });
            // Optimistic update
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            console.error("Failed to update role", error);
            alert("Failed to update role");
        }
    };

    const handleApproval = async (userId: string, isApproved: boolean) => {
        try {
            await api.put(`/admin/users/${userId}/approve`, { isApproved });
            // Optimistic update
            setUsers(users.map(u => u.id === userId ? { ...u, isApproved } : u));
        } catch (error) {
            console.error("Failed to update approval", error);
            alert("Failed to update approval");
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500">Manage users, roles, and approvals.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={fetchUsers} variant="outline" size="sm">Refresh</Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search users by name or email..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className="h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value as any)}
                >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="vendor">Artist (Vendor)</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* Users Table */}
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
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full bg-slate-100"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'vendor' ? 'bg-blue-100 text-blue-800' :
                                                        user.role === 'creator' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-gray-100 text-gray-800'}
                                            `}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {(user.role === 'vendor' || user.role === 'creator') && (
                                                user.isApproved ? (
                                                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                                        <CheckCircle size={14} /> Approved
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-yellow-600 text-xs font-medium">
                                                        Waitlist / Pending
                                                    </span>
                                                )
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {(user.role === 'vendor' || user.role === 'creator') && !user.isApproved && (
                                                    <Button
                                                        size="sm"
                                                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                                                        onClick={() => handleApproval(user.id, true)}
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                                <select
                                                    className="h-8 px-2 rounded border border-gray-300 text-xs bg-white"
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="vendor">Artist</option>
                                                    <option value="creator">Creator</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No users found matching your filters.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
