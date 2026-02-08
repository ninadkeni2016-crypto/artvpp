import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Menu, X, Search, ShoppingCart, User, Heart, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, onOpenAuthModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  const navItems = [
    {
      label: 'Marketplace',
      items: [
        { label: 'Physical Art', page: 'marketplace-physical' },
        { label: 'Digital Art', page: 'marketplace-digital' },
        { label: 'Merchandise', page: 'marketplace-merchandise' },
      ],
    },
    {
      label: 'Creative Services',
      items: [
        { label: 'Custom Art', page: 'services-custom' },
        { label: 'Art Services', page: 'services-art' },
        { label: 'Limited Editions', page: 'services-limited' },
      ],
    },
    {
      label: 'Learn',
      items: [
        { label: 'Workshops', page: 'learn-workshops' },
        { label: 'Courses', page: 'learn-courses' },
        { label: 'Masterclasses', page: 'learn-masterclasses' },
      ],
    },
    { label: 'Artists', page: 'artists' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300">
      <div className="container max-w-screen-2xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="KALAVPP Logo"
              className="h-16 w-auto object-contain"
            />
          </button>
        </div>

        {/* Desktop Navigation & Actions Wrapper */}
        <div className="hidden md:flex items-center flex-1 justify-end gap-6 text-2xl">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.items ? (
                  <>
                    <button className="text-base font-bold text-gray-700 hover:text-yellow-600 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.4)] transition-all py-2">
                      {item.label}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1">
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.page}
                          onClick={() => onNavigate(subItem.page)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-purple-600 rounded-md"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => onNavigate(item.page!)}
                    className="text-base font-bold text-gray-700 hover:text-yellow-600 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.4)] transition-all py-2"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Compact */}
            <form onSubmit={handleSearch} className="relative hidden lg:block w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 w-full rounded-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </form>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => onNavigate('search')}
            >
              <Search className="w-5 h-5" />
            </Button>

            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                <Heart className="w-5 h-5" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-600 text-white border-2 border-white">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full ml-1 w-12 h-12 p-0 overflow-hidden border-2 border-transparent hover:border-purple-100 transition-all focus:ring-2 focus:ring-purple-100 focus:outline-none">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-gray-100" sideOffset={8}>
                  <div className="px-3 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 m-2.5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-sm truncate">{user?.name}</span>
                      <span className="text-xs text-gray-500 truncate">{user?.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    onClick={() => onNavigate('profile')}
                    className="cursor-pointer py-2.5 px-3 rounded-md hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="font-medium">Open Profile</span>
                  </DropdownMenuItem>

                  {user?.role === 'admin' && (
                    <DropdownMenuItem
                      onClick={() => onNavigate('admin-dashboard')}
                      className="cursor-pointer py-2.5 px-3 rounded-md hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="font-medium">Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer py-2.5 px-3 rounded-md hover:bg-red-50 focus:bg-red-50 text-red-600 focus:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Button variant="ghost" className="font-medium text-gray-700 hover:text-purple-600" onClick={() => onOpenAuthModal('login')}>
                  Login
                </Button>
                <Button className="font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6" onClick={() => onOpenAuthModal('register')}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => onNavigate('cart')}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {totalItems}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white absolute w-full left-0 shadow-xl">
          <nav className="container mx-auto px-4 py-6 space-y-6">
            {/* Mobile specific auth buttons if not logged in */}
            {!isAuthenticated && (
              <div className="flex flex-col gap-3 pb-6 border-b">
                <Button className="w-full bg-purple-600" onClick={() => { onOpenAuthModal('login'); setMobileMenuOpen(false); }}>
                  Login
                </Button>
                <Button variant="outline" className="w-full" onClick={() => { onOpenAuthModal('register'); setMobileMenuOpen(false); }}>
                  Create Account
                </Button>
              </div>
            )}

            {navItems.map((item) => (
              <div key={item.label}>
                <div className="font-medium text-base text-gray-900 mb-3">{item.label}</div>
                {item.items ? (
                  <div className="pl-4 space-y-3 border-l-2 border-gray-100 ml-1">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem.page}
                        onClick={() => {
                          onNavigate(subItem.page);
                          setMobileMenuOpen(false);
                        }}
                        className="block text-sm text-gray-600 hover:text-purple-600"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate(item.page!);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-base text-gray-600 hover:text-purple-600"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
