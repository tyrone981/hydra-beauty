
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import Link from 'next/link';

export const runtime = 'nodejs';

export default async function AdminProductsPage() {
  await connectDB();
  const docs = await Product.find({}).sort({ createdAt: -1 }).lean();
  const products = docs.map((p: any) => ({ ...p, id: p._id.toString() }));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin – Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          New product
        </Link>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">In stock</th>
            <th className="text-left py-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2">{p.name}</td>
              <td className="py-2">{p.category}</td>
              <td className="py-2">{p.price}</td>
              <td className="py-2">{p.inStock ? 'Yes' : 'No'}</td>
              <td className="py-2 text-right">
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="text-blue-600 hover:underline mr-3"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}