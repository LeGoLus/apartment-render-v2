import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to ApartmentFinder</h1>
      <p className="text-xl mb-8">Find your perfect apartment with ease</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/apartments">Browse Apartments</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/upload-floorplan">Upload Floorplan</Link>
        </Button>
      </div>
    </div>
  );
}