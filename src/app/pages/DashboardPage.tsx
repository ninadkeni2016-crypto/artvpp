import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Plus,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockDashboardStats, mockRevenueData, mockOrders, mockProducts } from '../data/mockData';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AdminDashboard } from './admin/AdminDashboard';
import { UserDashboard } from './UserDashboard';


interface DashboardPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="mb-4">Please login to access dashboard</p>
          <Button onClick={() => onNavigate('home')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  if (user.role === 'admin') {
    return <AdminDashboard onNavigate={onNavigate} />;
  }

  // Vendor Dashboard
  if (user.role === 'vendor') {
    const vendorProducts = mockProducts.filter(p => p.vendorId === user.id);
    const vendorOrders = mockOrders.filter(o => o.items.some(i => i.vendorId === user.id));

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
              <p className="text-gray-600">Manage your products and sales</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-1">Total Products</p>
              <h3 className="text-3xl font-bold">{vendorProducts.length}</h3>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <h3 className="text-3xl font-bold">{vendorOrders.length}</h3>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-1">Revenue (This Month)</p>
              <h3 className="text-3xl font-bold">₹42,500</h3>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card className="p-6">
                <div className="space-y-4">
                  {vendorProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.title}</h4>
                        <p className="text-sm text-gray-600">₹{product.price.toLocaleString('en-IN')}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{product.type}</Badge>
                          {product.featured && <Badge>Featured</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.items[0]?.title}</TableCell>
                        <TableCell>₹{order.total.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{order.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Sales Analytics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockRevenueData.slice(-6)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#9333ea" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Customer Dashboard
  return <UserDashboard onNavigate={onNavigate} />;
};