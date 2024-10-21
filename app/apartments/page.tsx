import ApartmentList from '@/components/ApartmentList';

export default function ApartmentsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Apartments</h1>
      <ApartmentList />
    </div>
  );
}