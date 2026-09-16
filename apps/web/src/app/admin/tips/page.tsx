import Link from "next/link";
import { prisma } from "@/database/client";

export default async function AdminTipsPage() {
  const tips = await prisma.tip.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Tips Management</h1>
        <Link
          href="/admin/tips/new"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Create Tip
        </Link>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Title
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Category
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Difficulty
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            {tips.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-gray-400 text-center py-8">
                  No tips found
                </td>
              </tr>
            ) : (
              tips.map((tip) => (
                <tr key={tip.id} className="border-b border-gray-800">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/tips/${tip.slug}`}
                      className="text-white hover:text-red-400"
                    >
                      {tip.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {tip.category}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {tip.difficulty}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{tip.views}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
