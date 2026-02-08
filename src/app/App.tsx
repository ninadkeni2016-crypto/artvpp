import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CartPage } from './pages/CartPage';
import { DashboardPage } from './pages/DashboardPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage, ContactPage, VendorOnboardingPage } from './pages/OtherPages';
import { Toaster } from 'sonner';
import { LearnPage } from './pages/LearnPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { AdminOrderManagement } from './pages/admin/OrderManagement';
import { ProductManagement } from './pages/admin/ProductManagement';
import { ServiceManagement } from './pages/admin/ServiceManagement';
import { CourseManagement } from './pages/admin/CourseManagement';

type PageType =
  | 'home'
  | 'marketplace-physical'
  | 'marketplace-digital'
  | 'marketplace-merchandise'
  | 'services-custom'
  | 'services-art'
  | 'services-limited'
  | 'learn-workshops'
  | 'learn-courses'
  | 'learn-masterclasses'
  | 'artists'
  | 'about'
  | 'contact'
  | 'vendor-onboarding'
  | 'dashboard'
  | 'cart'
  | 'checkout'
  | 'payment-success'
  | 'profile'
  | 'product-detail'
  | 'service-detail'
  | 'course-detail'
  | 'search'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-orders'
  | 'admin-approvals'
  | 'dashboard-products'
  | 'dashboard-services'
  | 'dashboard-courses';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as PageType);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;

      case 'marketplace-physical':
        return <MarketplacePage onNavigate={handleNavigate} type="physical" />;

      case 'marketplace-digital':
        return <MarketplacePage onNavigate={handleNavigate} type="digital" />;

      case 'marketplace-merchandise':
        return <MarketplacePage onNavigate={handleNavigate} type="merchandise" />;

      // ✅ Services
      case 'services-custom':
      case 'services-art':
      case 'services-limited':
        return <ServicesPage onNavigate={handleNavigate} />;

      // ✅ Learn pages now open LearnPage
      case 'learn-workshops':
      case 'learn-courses':
      case 'learn-masterclasses':
        return <LearnPage />;

      case 'cart':
        return (
          <CartPage
            onNavigate={handleNavigate}
            onOpenAuthModal={() => handleOpenAuthModal('login')}
          />
        );

      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;

      case 'payment-success':
        return <PaymentSuccessPage onNavigate={handleNavigate} />;

      case 'dashboard':
      case 'profile':
        // Redirect based on role
        // In a real app, we'd check user role here.
        // For now, we'll default to the standard user dashboard
        // unless they are explicitly navigating to admin
        return <DashboardPage onNavigate={handleNavigate} />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'vendor-onboarding':
        return <VendorOnboardingPage />;

      case 'artists':
        return (
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-8 text-center">Featured Artists</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${[
                        '1560421683-6856ea585c78',
                        '1500917293891-ef795e70e1f6',
                        '1438761681033-6461ffad8d80',
                        '1464863972986-890495bedc7f',
                        '1580489944761-15a19d654956',
                        '1534528741775-53994a69daeb',
                        '1531123897727-8f129e1688ce',
                        '1573496359142-b8d87734a5a2',
                      ][i - 1]}?auto=format&fit=crop&q=80&w=400&h=400`}
                      alt={`Artist ${i}`}
                      className="aspect-square w-full object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="font-bold">Artist Name {i}</h3>
                      <p className="text-sm text-gray-600">Digital Artist</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'product-detail':
        if (!selectedId) return <HomePage onNavigate={handleNavigate} />;
        return <ItemDetailPage id={selectedId} type="product" onNavigate={handleNavigate} />;

      case 'service-detail':
        if (!selectedId) return <ServicesPage onNavigate={handleNavigate} />;
        return <ItemDetailPage id={selectedId} type="service" onNavigate={handleNavigate} />;

      case 'course-detail':
        return (
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
                <h1 className="text-3xl font-bold mb-4">Course Detail Page</h1>
                <p>Course ID: {selectedId}</p>
                <button
                  onClick={() => handleNavigate('home')}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mt-4"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-8 text-center">Search Results</h1>
            </div>
          </div>
        );

      // ✅ Admin Routes
      case 'admin-dashboard':
        return (
          <AdminLayout activePage="dashboard" onNavigate={handleNavigate}>
            <AdminDashboard />
          </AdminLayout>
        );
      case 'admin-users':
        return (
          <AdminLayout activePage="admin-users" onNavigate={handleNavigate}>
            <UserManagement />
          </AdminLayout>
        );
      case 'admin-orders':
        return (
          <AdminLayout activePage="admin-orders" onNavigate={handleNavigate}>
            <AdminOrderManagement />
          </AdminLayout>
        );
      case 'admin-approvals':
        return (
          <AdminLayout activePage="admin-approvals" onNavigate={handleNavigate}>
            <UserManagement /> {/* Reusing UserMgmt for approvals logic */}
          </AdminLayout>
        );

      case 'dashboard-products':
        return (
          <AdminLayout activePage="dashboard-products" onNavigate={handleNavigate}>
            <ProductManagement />
          </AdminLayout>
        );

      case 'dashboard-services':
        return (
          <AdminLayout activePage="dashboard-services" onNavigate={handleNavigate}>
            <ServiceManagement />
          </AdminLayout>
        );

      case 'dashboard-courses':
        return (
          <AdminLayout activePage="dashboard-courses" onNavigate={handleNavigate}>
            <CourseManagement />
          </AdminLayout>
        );

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header
            onNavigate={handleNavigate}
            currentPage={currentPage}
            onOpenAuthModal={handleOpenAuthModal}
          />
          <main className="flex-1">{renderPage()}</main>
          <Footer onNavigate={handleNavigate} />
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            defaultMode={authModalMode}
          />
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
