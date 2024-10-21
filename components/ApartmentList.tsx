"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for apartments
const mockApartments = [
  { id: 1, name: 'Sunny Side Apartment', price: 1200, bedrooms: 2, bathrooms: 1 },
  { id: 2, name: 'Downtown Loft', price: 1500, bedrooms: 1, bathrooms: 1 },
  { id: 3, name: 'Riverside Condo', price: 1800, bedrooms: 3, bathrooms: 2 },
];

export default function ApartmentList() {
  const [apartments] = useState(mockApartments);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apartments.map((apartment) => (
        <Card key={apartment.id}>
          <CardHeader>
            <CardTitle>{apartment.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Price: ${apartment.price}/month</p>
            <p>Bedrooms: {apartment.bedrooms}</p>
            <p>Bathrooms: {apartment.bathrooms}</p>
            <Button asChild className="mt-4">
              <Link href={`/apartments/${apartment.id}`}>View Details</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}