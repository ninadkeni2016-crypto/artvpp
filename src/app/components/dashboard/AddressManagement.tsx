import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MapPin, MoreVertical, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Address {
  id: string;
  type: 'HOME' | 'WORK';
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'HOME',
    name: 'User Name',
    phone: '+91 98765 43210',
    address: '123, Street Name, Locality, City, State - 123456',
    isDefault: true,
  },
  {
    id: '2',
    type: 'WORK',
    name: 'User Name',
    phone: '+91 98765 43210',
    address: '456, Office Building, Tech Park, City, State - 123456',
  },
];

export const AddressManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Addresses</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add a New Address
        </Button>
      </div>

      <div className="grid gap-4">
        {mockAddresses.map((addr) => (
          <Card key={addr.id} className="p-6 relative">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-gray-500 bg-gray-100 uppercase text-xs"
                  >
                    {addr.type}
                  </Badge>
                  {addr.isDefault && (
                    <span className="text-xs text-gray-500 font-medium">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  <span className="font-bold">{addr.name}</span>
                  <span className="font-medium text-gray-900">
                    {addr.phone}
                  </span>
                </div>
                <p className="text-gray-600 max-w-lg">{addr.address}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
