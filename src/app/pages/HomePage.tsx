import React from 'react';
import { ArrowRight, Palette, Sparkles, Users, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ProductCard, ServiceCard, CourseCard } from '../components/ItemCards';
import { mockProducts, mockServices, mockCourses } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import heroVideo from '../../assets/hero-video.mp4';

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();

  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 4);
  const featuredServices = mockServices.filter(s => s.featured).slice(0, 3);
  const featuredCourses = mockCourses.filter(c => c.featured).slice(0, 3);

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addToCart({
      productId: product.id,
      itemType: 'product',
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      vendorId: product.vendorId,
    });
    toast.success('Added to cart!');
  };

  const handleBookService = (service: typeof mockServices[0]) => {
    addToCart({
      serviceId: service.id,
      itemType: 'service',
      title: service.title,
      price: service.price,
      quantity: 1,
      image: service.images[0],
      vendorId: service.vendorId,
    });
    toast.success('Service added to cart!');
  };

  const handleEnrollCourse = (course: typeof mockCourses[0]) => {
    addToCart({
      courseId: course.id,
      itemType: 'course',
      title: course.title,
      price: course.price,
      quantity: 1,
      image: course.image,
      vendorId: '2',
    });
    toast.success('Course added to cart!');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
          >
            <source src={"/hero-video.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl">
          <Badge className="mb-6 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm px-4 py-1.5 text-sm transition-all">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            Values Art & Creativity
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Discover & Trade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              Creative Excellence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Your one-stop platform for physical art, digital creations, custom services, and creative learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => onNavigate('marketplace-physical')}
            >
              Explore Products
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => onNavigate('marketplace-digital')}
            >
              Our Artworks
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From traditional to contemporary, physical to digital – discover the perfect creative solution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => onNavigate('marketplace-physical')}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1635141849017-c531949fb5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Physical Art"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl mb-1">Physical Art</h3>
                  <p className="text-sm opacity-90">Original & prints</p>
                </div>
              </div>
            </Card>
            <Card
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => onNavigate('marketplace-digital')}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551651653-c5186a1fbba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Digital Art"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl mb-1">Digital Art</h3>
                  <p className="text-sm opacity-90">Instant downloads</p>
                </div>
              </div>
            </Card>
            <Card
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => onNavigate('services-custom')}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1750924718700-63eae04841f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Custom Services"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl mb-1">Custom Services</h3>
                  <p className="text-sm opacity-90">Commissions & more</p>
                </div>
              </div>
            </Card>
            <Card
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => onNavigate('learn-workshops')}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1752649936105-0b02f795ea41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Learn"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl mb-1">Learn</h3>
                  <p className="text-sm opacity-90">Workshops & courses</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Artworks</h2>
              <p className="text-gray-600">Handpicked masterpieces from our talented artists</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('marketplace-physical')}>
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onNavigate('product-detail', product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Custom Services</h2>
              <p className="text-gray-600">Bring your creative vision to life with expert artists</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('services-custom')}>
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => onNavigate('service-detail', service.id)}
                onBookNow={() => handleBookService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Learn from Masters</h2>
              <p className="text-gray-600">Enhance your skills with expert-led workshops and courses</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('learn-workshops')}>
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onNavigate('course-detail', course.id)}
                onEnroll={() => handleEnrollCourse(course)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KALAVPP?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to creating the best experience for artists and art lovers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Curated Selection</h3>
              <p className="text-sm text-gray-600">
                Every artwork and artist is carefully vetted for quality and authenticity
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Artist Community</h3>
              <p className="text-sm text-gray-600">
                Join a vibrant community of artists and creative professionals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">
                Safe and secure transactions with buyer protection
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Growth Support</h3>
              <p className="text-sm text-gray-600">
                Tools and resources to help artists grow their business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#4a044e] to-[#f97316]">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Start Your Creative Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of artists and art lovers in India's fastest-growing creative marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate('marketplace-physical')}>
              Explore Marketplace
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={() => onNavigate('vendor-onboarding')}>
              Become a Vendor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};