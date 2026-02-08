import React from 'react';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface OrderFiltersProps {
    filters: {
        status: string[];
        time: string;
    };
    onFilterChange: (type: 'status' | 'time', value: string) => void;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({
    filters,
    onFilterChange,
}) => {
    const statusOptions = [
        { id: 'on-the-way', label: 'On the way' },
        { id: 'delivered', label: 'Delivered' },
        { id: 'cancelled', label: 'Cancelled' },
        { id: 'returned', label: 'Returned' },
    ];

    const timeOptions = [
        { id: 'last-30-days', label: 'Last 30 days' },
        { id: '2024', label: '2024' },
        { id: '2023', label: '2023' },
        { id: 'older', label: 'Older' },
    ];

    return (
        <div className="w-full md:w-64 shrink-0 space-y-4">
            <Card className="p-4 shadow-sm border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Filters</h3>

                {/* Order Status */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Order Status
                    </h4>
                    <div className="space-y-3">
                        {statusOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`status-${option.id}`}
                                    checked={filters.status.includes(option.id)}
                                    onCheckedChange={() => onFilterChange('status', option.id)}
                                />
                                <Label
                                    htmlFor={`status-${option.id}`}
                                    className="text-sm cursor-pointer"
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Time */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Order Time
                    </h4>
                    <div className="space-y-3">
                        {timeOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`time-${option.id}`}
                                    checked={filters.time === option.id}
                                    onCheckedChange={() => onFilterChange('time', option.id)}
                                // For radio-like behavior with checkboxes (simple implementation)
                                // In a real app, might use RadioGroup
                                />
                                <Label
                                    htmlFor={`time-${option.id}`}
                                    className="text-sm cursor-pointer"
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
