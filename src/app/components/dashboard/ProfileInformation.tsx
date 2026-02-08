import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export const ProfileInformation: React.FC = () => {
    const { user } = useAuth();

    // State for edit modes
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingMobile, setIsEditingMobile] = useState(false);

    // Split name for demo (assuming simple space separation)
    const [firstName, setFirstName] = useState(user?.name.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.name.split(' ').slice(1).join(' ') || '');
    const [gender, setGender] = useState('male'); // Default or fetch from user data

    // Contact state
    const [email, setEmail] = useState(user?.email || '');
    const [mobile, setMobile] = useState('+91 98765 43210'); // Mock default

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Personal Information */}
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Personal Information</h2>
                    <button
                        onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                        className="text-blue-600 font-medium hover:underline text-sm"
                    >
                        {isEditingPersonal ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-600">First Name</Label>
                            <Input
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={!isEditingPersonal}
                                className="bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-600">Last Name</Label>
                            <Input
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={!isEditingPersonal}
                                className="bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-gray-600">Your Gender</Label>
                        <RadioGroup
                            value={gender}
                            onValueChange={setGender}
                            disabled={!isEditingPersonal}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male" className={!isEditingPersonal ? "text-gray-500" : ""}>Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female" className={!isEditingPersonal ? "text-gray-500" : ""}>Female</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {isEditingPersonal && (
                        <div className="pt-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Save</Button>
                        </div>
                    )}
                </div>
            </Card>

            {/* Email Address */}
            <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-4 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Email Address</h2>
                            <button
                                onClick={() => setIsEditingEmail(!isEditingEmail)}
                                className="text-blue-600 font-medium hover:underline text-sm ml-4"
                            >
                                {isEditingEmail ? 'Cancel' : 'Edit'}
                            </button>
                        </div>

                        <div className="space-y-2">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditingEmail}
                                className="bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                            />
                        </div>
                        {isEditingEmail && (
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                        )}
                    </div>
                </div>
            </Card>

            {/* Mobile Number */}
            <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-4 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Mobile Number</h2>
                            <button
                                onClick={() => setIsEditingMobile(!isEditingMobile)}
                                className="text-blue-600 font-medium hover:underline text-sm ml-4"
                            >
                                {isEditingMobile ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        <div className="space-y-2">
                            <Input
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                disabled={!isEditingMobile}
                                className="bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                            />
                        </div>
                        {isEditingMobile && (
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                        )}
                    </div>
                </div>
            </Card>

            {/* FAQs */}
            <div className="py-4">
                <h3 className="font-bold text-lg mb-4">FAQs</h3>
                <div className="space-y-4 text-sm">
                    <div>
                        <h4 className="font-semibold mb-1">What happens when I update my email address (or mobile number)?</h4>
                        <p className="text-gray-600">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">When will my Kalavpp account be updated with the new email address (or mobile number)?</h4>
                        <p className="text-gray-600">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">What happens to my existing Kalavpp account when I update my email address (or mobile number)?</h4>
                        <p className="text-gray-600">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">Does my Seller account get affected when I update my email address?</h4>
                        <p className="text-gray-600">Kalavpp has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                    </div>
                </div>
            </div>

            {/* Account Actions */}
            <div className="space-y-4 py-4">
                <button className="block text-blue-600 font-medium hover:underline text-sm">
                    Deactivate Account
                </button>
                <button className="block text-red-600 font-medium hover:underline text-sm">
                    Delete Account
                </button>
            </div>
        </div>
    );
};
