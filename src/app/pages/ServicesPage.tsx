import React from 'react';
import {
    Palette, Brush, Shield, CheckCircle, MapPin, Repeat, Lock,
    ChevronDown, ChevronUp, ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { ServiceCard, CourseCard } from '../components/ItemCards'; // Reusing existing cards
import { mockServices, mockCourses } from '../data/mockData';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';

interface ServicesPageProps {
    onNavigate: (page: string, id?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
    const { addToCart } = useCart();
    const [openFaq, setOpenFaq] = React.useState<number | null>(null);

    // --- Data Filtering ---
    const customServices = mockServices.filter(s => s.type === 'commission' || s.type === 'custom');
    const limitedEdition = mockServices.filter(s => s.type === 'limited-edition');
    const professionalServices = mockServices.filter(s => s.type === 'art-service');
    const courses = mockCourses;

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
        toast.success(service.type === 'art-service' ? 'Proposal request initialized!' : 'Service added to inquiry list!');
    };

    const handleEnrollCourse = (course: typeof mockCourses[0]) => {
        addToCart({
            courseId: course.id,
            itemType: 'course',
            title: course.title,
            price: course.price,
            quantity: 1,
            image: course.image,
            vendorId: course.instructor,
            instructor: course.instructor,
        });
        toast.success('Course added to cart!');
    };

    const faqs = [
        { q: "How do custom commissions work?", a: "Post your requirement, get quotes from artists, and funds are held in escrow until completion." },
        { q: "Is my payment secure?", a: "Yes! KALAVPP holds your payment securely. We only release funds to the artist once you are satisfied." },
        { q: "Can I request revisions?", a: "Most artists include a specific number of revisions. You can discuss this before starting." },
        { q: "How long does it take?", a: "Timelines vary by project. Artists list their estimated delivery times on their service cards." }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. HERO SECTION */}
            <section className="relative bg-gradient-to-br from-[#4a044e] via-[#9d174d] to-[#ea580c] py-24 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-soft-light"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Creative Services by Professional Artists
                    </h1>
                    <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto font-light">
                        Commission custom artworks, order professional creative services, or book art workshops from verified artists.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-lg px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                            onClick={() => onNavigate('contact')}
                        >
                            Request Custom Art
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 rounded-full backdrop-blur-sm"
                            onClick={() => document.getElementById('browse-services')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Browse Creative Services
                        </Button>
                    </div>
                </div>
            </section>

            <div id="browse-services" className="py-10"></div>

            {/* 2. CATEGORY-BASED CREATIVE SERVICES */}

            {/* 2a. Customized & Commission-Based Art */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                        <Palette className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Customized & Commission-Based Art</h2>
                        <p className="text-gray-600">Portraits, Murals, Sculptures & Personal Art</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {customServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            actionLabel={service.title.includes('Portrait') ? 'Request Portrait' : 'Book Now'}
                            onClick={() => onNavigate('service-detail', service.id)}
                            onBookNow={() => handleBookService(service)}
                        />
                    ))}
                </div>
            </section>

            {/* 2b. Limited Edition & Large-Scale Works */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                            <Shield className="w-8 h-8" /> {/* Using Shield as icon for Certified/Limited */}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Limited Edition & Large-Scale Works</h2>
                            <p className="text-gray-600">Certified Art, Installations & Exclusive Series</p>
                        </div>
                    </div>
                    {limitedEdition.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {limitedEdition.map(service => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    onClick={() => onNavigate('service-detail', service.id)}
                                    onBookNow={() => handleBookService(service)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 italic">No limited edition services available at the moment.</div>
                    )}
                </div>
            </section>

            {/* 2c. Professional Art Services (Pre-Order) */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <Brush className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Professional Art Services</h2>
                        <p className="text-gray-600">Branding, Illustration, Design & Curation</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {professionalServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={{ ...service, priceType: 'custom-quote' }} // Ensure UI emphasizes proposal nature
                            onClick={() => onNavigate('service-detail', service.id)}
                            onBookNow={() => {
                                toast("Requesting proposal...");
                                handleBookService(service);
                            }}
                        />
                    ))}
                </div>
            </section>

            {/* 2d. Educational Art Products */}
            <section className="py-16 bg-indigo-50/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <span className="text-2xl font-bold">🎓</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Educational Art Products</h2>
                            <p className="text-gray-600">Workshops, Courses, Masterclasses & Mentoring</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.map(course => (
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

            {/* 3. HOW CREATIVE SERVICES WORK */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">How Creative Services Work</h2>
                        <div className="h-1 w-20 bg-purple-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { step: 1, title: 'Choose a Service', desc: 'Browse categories or search for the specific creative service you need.' },
                            { step: 2, title: 'Submit Request', desc: 'Provide details, budget, and timeline. For courses, simply book your spot.' },
                            { step: 3, title: 'Collaborate & Get Art', desc: 'Work with the artist, approve drafts, and receive your final masterpiece.' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 relative">
                                <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-xl transform rotate-3">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                {i !== 2 && (
                                    <div className="hidden md:block absolute top-10 -right-[20%] text-gray-300">
                                        <ArrowRight className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. WHY CHOOSE OUR CREATIVE SERVICES */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Our Creative Services</h2>
                        <p className="text-gray-400">Trusted by thousands of art lovers and businesses</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                        {[
                            { icon: CheckCircle, title: 'Verified Artists', desc: 'Curated professionals' },
                            { icon: Palette, title: 'Custom Work', desc: 'Tailored to your needs' },
                            { icon: Lock, title: 'Secure Payments', desc: 'Funds held in escrow' },
                            { icon: Repeat, title: 'Revision Support', desc: 'Ensuring satisfaction' },
                            { icon: MapPin, title: 'Pan-India Network', desc: 'Talent from everywhere' },
                        ].map((benefit, idx) => (
                            <div key={idx} className="p-4 hover:bg-white/5 rounded-xl transition-colors">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold mb-1">{benefit.title}</h4>
                                <p className="text-sm text-gray-400">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. ARTIST CTA */}
            <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Are you a Professional Artist?</h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Join KALAVPP to offer your creative services, sell your art, and teach workshops to a growing audience.
                    </p>
                    <Button
                        size="lg"
                        className="bg-gray-900 text-white hover:bg-gray-800 text-lg px-10 py-6 rounded-full shadow-xl"
                        onClick={() => onNavigate('vendor-onboarding')}
                    >
                        Become a Creative Service Provider
                    </Button>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className="w-full flex justify-between items-center p-4 text-left font-bold hover:bg-gray-50"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    {faq.q}
                                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
