"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloorplanCanvas from '@/components/FloorplanCanvas';
import { useToast } from '@/components/ui/use-toast';

interface Room {
  x: number;
  y: number;
}

interface FloorplanData {
  id: string;
  fileName: string;
  roomCount: number;
  imageUrl: string;
  rooms: Room[];
  totalArea: number;
  pricePerSqft: number;
}

export default function EditFloorplanPage() {
  const [floorplanData, setFloorplanData] = useState<FloorplanData | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [totalArea, setTotalArea] = useState<number>(0);
  const [pricePerSqft, setPricePerSqft] = useState<number>(0);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setFloorplanData(parsedData);
        setRooms(parsedData.rooms);
        setTotalArea(parsedData.totalArea);
        setPricePerSqft(parsedData.pricePerSqft);
      } catch (err) {
        console.error('Error parsing floorplan data:', err);
        toast({
          title: "Error",
          description: "Failed to load floorplan data",
          variant: "destructive",
        });
      }
    }
  }, [searchParams, toast]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!floorplanData) return;

    const updatedData = {
      ...floorplanData,
      rooms,
      totalArea,
      pricePerSqft,
      roomCount: rooms.length,
    };

    // In a real application, you would send this data to your server
    // For now, we'll just update the local state and redirect

    toast({
      title: "Floorplan Updated",
      description: "Your changes have been saved.",
    });

    router.push(`/dashboard?floorplanId=${updatedData.id}&data=${encodeURIComponent(JSON.stringify(updatedData))}`);
  };

  if (!floorplanData) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Floorplan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Edit Room Markers</h2>
          <FloorplanCanvas
            imageUrl={floorplanData.imageUrl}
            rooms={rooms}
            onRoomsChange={setRooms}
            editable={true}
          />
        </div>
        <div>
          <Label htmlFor="totalArea">Total Area (sq ft)</Label>
          <Input
            id="totalArea"
            type="number"
            value={totalArea}
            onChange={(e) => setTotalArea(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="pricePerSqft">Price per sq ft ($)</Label>
          <Input
            id="pricePerSqft"
            type="number"
            step="0.01"
            value={pricePerSqft}
            onChange={(e) => setPricePerSqft(Number(e.target.value))}
            required
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}