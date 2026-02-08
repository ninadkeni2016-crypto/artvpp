import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About KALAVPP</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            India's premier marketplace for creative products and services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              KALAVPP is dedicated to empowering artists and creative professionals by providing a platform
              where they can showcase, sell, and grow their creative businesses. We believe in democratizing
              art and making it accessible to everyone.
            </p>
            <p className="text-gray-600">
              Our platform connects talented artists with art enthusiasts, collectors, and learners,
              creating a vibrant ecosystem that celebrates creativity and supports artistic growth.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1662117940162-b666fea153cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Creative Workspace"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <p className="text-gray-600">Verified Artists</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
            <p className="text-gray-600">Artworks Sold</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
            <p className="text-gray-600">Happy Customers</p>
          </Card>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Creative Community</h2>
          <p className="text-lg mb-6 opacity-90">
            Whether you're an artist looking to sell or an art lover looking to discover, KALAVPP is your platform.
          </p>
          <Button size="lg" variant="secondary">Get Started Today</Button>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-gray-600">info@kalavpp.com</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-sm text-gray-600">+91 98765 43210</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Address</h3>
              <p className="text-sm text-gray-600">Mumbai, Maharashtra, India</p>
            </Card>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={6} />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const VendorOnboardingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a KALAVPP Artist</h1>
            <p className="text-lg text-gray-600">
              Join thousands of artists selling their creative work on India's fastest-growing art marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Apply</h3>
              <p className="text-sm text-gray-600">Submit your application with portfolio samples</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Get Approved</h3>
              <p className="text-sm text-gray-600">Our team reviews your application within 48 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Start Selling</h3>
              <p className="text-sm text-gray-600">Upload your work and start earning</p>
            </div>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Artist Application Form</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="artist-name">Full Name</Label>
                  <Input id="artist-name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist-email">Email</Label>
                  <Input id="artist-email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist-phone">Phone Number</Label>
                <Input id="artist-phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist-bio">Artist Bio</Label>
                <Textarea id="artist-bio" placeholder="Tell us about yourself and your art..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio URL</Label>
                <Input id="portfolio" type="url" placeholder="https://your-portfolio.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="art-type">Type of Art You Create</Label>
                <Input id="art-type" placeholder="e.g., Digital Art, Paintings, Sculptures" />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Low Commission</h3>
              <p className="text-gray-600">We charge only 10-15% commission, one of the lowest in the industry</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Marketing Support</h3>
              <p className="text-gray-600">Get featured in our newsletters and social media channels</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
              <p className="text-gray-600">Fast and secure payment processing with weekly payouts</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Creative Freedom</h3>
              <p className="text-gray-600">Set your own prices and maintain full control of your work</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};