import Link from "next/link";
import { prisma } from "@/database/client";

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">News Management</h1>
        <Link
          href="/admin/news/new"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Create News
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
                Status
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Views
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {news.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-gray-400 text-center py-8">
                  No news found
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/news/${item.slug}`}
                      className="text-white hover:text-red-400"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "draft"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {item.views}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
