"use client";
import React from 'react';

const BookmarkedProperties = () => {
  const properties = [
    {
      id: 1,
      address: "123 Ocean Drive, Malibu, CA 90265",
      owner: "Sarah Johnson",
      selected: false
    },
    {
      id: 2,
      address: "456 Mountain View Rd, Aspen, CO 81611",
      owner: "Michael Chen",
      selected: false
    },
    {
      id: 3,
      address: "789 Urban Plaza, New York, NY 10001",
      owner: "David Wilson",
      selected: false
    },
    {
      id: 4,
      address: "101 Forest Lane, Portland, OR 97201",
      owner: "Emily Rodriguez",
      selected: false
    },
    {
      id: 5,
      address: "202 Desert Trail, Scottsdale, AZ 85255",
      owner: "James Taylor",
      selected: false
    }
  ];

  const toggleSelection = (id: number) => {
    console.log(`Toggled selection for property ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookmarked Properties</h1>
        
        <div className="space-y-3 mb-8">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className={`p-4 border rounded-lg cursor-pointer ${property.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
              onClick={() => toggleSelection(property.id)}
            >
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={property.selected}
                  onChange={() => toggleSelection(property.id)}
                  className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">{property.address}</p>
                  <p className="text-gray-600">{property.owner}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Create Report
        </button>
      </div>
    </div>
  );
};

export default BookmarkedProperties;