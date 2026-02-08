import React, { useEffect, useState } from 'react';
import { Course } from '../../types';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { courseApi } from '../../../services/api';

export const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await courseApi.getCourses();
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        return course.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
                    <p className="text-gray-500">Manage and view all courses.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={fetchCourses} variant="outline" size="sm">Refresh</Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search courses..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

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
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Instructor</th>
                                    <th className="px-6 py-4">Level</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={course.image}
                                                    alt=""
                                                    className="w-10 h-10 rounded bg-slate-100 object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">{course.title}</p>
                                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{course.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 capitalize">
                                                {course.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">₹{course.price}</td>
                                        <td className="px-6 py-4">{course.instructor}</td>
                                        <td className="px-6 py-4 capitalize">{course.level}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredCourses.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No courses found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
