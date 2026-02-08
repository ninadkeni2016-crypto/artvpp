import React from 'react';
import { Star, ShoppingCart, Download, Calendar } from 'lucide-react';
import { Product, Service, Course } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div onClick={onClick}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-purple-600">Featured</Badge>
          )}
          {product.type === 'digital' && (
            <Badge className="absolute top-2 right-2 bg-blue-600">
              <Download className="w-3 h-3 mr-1" />
              Digital
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={product.vendorAvatar}
              alt={product.vendorName}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-600">{product.vendorName}</span>
          </div>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</span>
            {product.type === 'physical' && product.stock && product.stock < 5 && (
              <span className="text-xs text-orange-600">Only {product.stock} left</span>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  onBookNow: () => void;
  actionLabel?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, onBookNow, actionLabel = 'Book Now' }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div onClick={onClick}>
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={service.images[0]}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60';
            }}
          />
          {service.featured && (
            <Badge className="absolute top-2 left-2 bg-purple-600">Featured</Badge>
          )}
          {service.availableSlots && service.availableSlots < 5 && (
            <Badge className="absolute top-2 right-2 bg-orange-600">
              {service.availableSlots} slots left
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={service.vendorAvatar}
              alt={service.vendorName}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-600">{service.vendorName}</span>
          </div>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{service.title}</h3>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{service.description}</p>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{service.rating}</span>
            <span className="text-xs text-gray-500">({service.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs text-gray-500 block">
                {service.priceType === 'starting-from' ? 'Starting from' :
                  service.priceType === 'custom-quote' ? 'Custom Quote' : 'Fixed Price'}
              </span>
              <span className="font-bold text-lg">₹{service.price.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-xs text-gray-600">{service.deliveryTime}</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onBookNow();
          }}
          className="w-full"
        >
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
};

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  onEnroll: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, onEnroll }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div onClick={onClick}>
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {course.featured && (
            <Badge className="absolute top-2 left-2 bg-purple-600">Featured</Badge>
          )}
          <Badge className="absolute top-2 right-2 bg-gray-900/80 text-white">
            {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
          </Badge>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs text-gray-600">{course.instructor}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs text-gray-500">({course.reviewCount})</span>
          </div>
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Duration: {course.duration}</span>
              <span className="capitalize">{course.mode}</span>
            </div>
            {course.startDate && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>Starts: {new Date(course.startDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">
                {course.enrolled}/{course.maxParticipants} enrolled
              </span>
              {course.maxParticipants && course.maxParticipants - course.enrolled < 5 && (
                <span className="text-orange-600">Few spots left!</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">₹{course.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onEnroll();
          }}
          className="w-full"
          disabled={course.enrolled >= (course.maxParticipants || Infinity)}
        >
          {course.enrolled >= (course.maxParticipants || Infinity) ? 'Fully Booked' : 'Enroll Now'}
        </Button>
      </div>
    </Card>
  );
};
