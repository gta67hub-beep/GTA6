import { prisma } from "@/database/client";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      _count: {
        select: {
          favorites: true,
          progress: true,
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Users Management</h1>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Username
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Email
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Role
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Favorites
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Progress
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-gray-400 text-center py-8">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="px-6 py-4 text-white">
                    {user.username || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {user.email || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {user._count.favorites}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {user._count.progress}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
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
