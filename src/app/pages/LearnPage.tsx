import React from "react";
import { CourseCard } from "../components/ItemCards";
// Note: In the static version, we constructed the card content manually or used a simpler layout.
// However, the previous mock version used a simple list. Let's restore that exact simple list structure 
// to avoid "CourseCard not found" if I don't import it, OR import it if it exists.
// The view_file of LearnPage in step 769 showed it used a hardcoded "featured" array and a map loop with a div.
// I will reproduce that EXACT structure.

export const LearnPage = () => {
    const featured = [
        {
            title: "Watercolor Portrait Workshop",
            type: "Workshop",
            rating: "4.8",
            duration: "2 Days",
            price: "₹499",
        },
        {
            title: "Digital Art for Beginners",
            type: "Course",
            rating: "4.9",
            duration: "10 Lessons",
            price: "₹1,299",
        },
        {
            title: "Photography Basics (Mobile)",
            type: "Course",
            rating: "4.7",
            duration: "6 Lessons",
            price: "₹699",
        },
        {
            title: "Masterclass: Selling Art Online",
            type: "Masterclass",
            rating: "5.0",
            duration: "3 Hours",
            price: "₹999",
        },
    ];

    return (
        <div className="w-full">
            {/* Hero */}
            <section className="relative w-full bg-gradient-to-r from-purple-700 via-fuchsia-600 to-orange-500 text-white">
                <div className="mx-auto max-w-screen-2xl px-6 py-24 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Learn. Create. Master Your Art.
                    </h1>
                    <p className="mt-4 text-white/90 max-w-2xl mx-auto">
                        Learn from expert artists through workshops, courses, and masterclasses.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button className="rounded-full bg-white px-6 py-3 font-medium text-purple-700 shadow hover:opacity-90">
                            Explore Workshops
                        </button>
                        <button className="rounded-full border border-white/70 px-6 py-3 font-medium text-white hover:bg-white/10">
                            Browse Courses
                        </button>
                    </div>
                </div>
            </section>


            {/* Categories */}
            <section className="mx-auto max-w-screen-2xl px-6 py-16">
                <h2 className="text-2xl font-semibold text-center">Learning Categories</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {["Workshops", "Courses", "Masterclasses"].map((cat) => (
                        <div
                            key={cat}
                            className="rounded-xl border bg-white p-6 text-center shadow hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-semibold">{cat}</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Explore {cat.toLowerCase()} by expert artists
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured */}
            <section className="mx-auto max-w-screen-2xl px-6 pb-16">
                <h2 className="text-2xl font-semibold mb-6">Featured Learning</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {featured.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-xl border bg-white p-5 shadow hover:shadow-md transition"
                        >
                            <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                {item.type}
                            </span>
                            <h3 className="mt-3 font-semibold">{item.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                ⭐ {item.rating} • {item.duration}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="font-semibold">{item.price}</span>
                                <button className="rounded-full bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700">
                                    Enroll
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
