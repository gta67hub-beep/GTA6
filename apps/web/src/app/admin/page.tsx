import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total News" value="0" href="/admin/news" />
        <StatCard title="Total Tips" value="0" href="/admin/tips" />
        <StatCard title="Total Vehicles" value="0" href="/admin/vehicles" />
        <StatCard title="Total Users" value="0" href="/admin/users" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/news/new"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm text-center"
            >
              Create News
            </Link>
            <Link
              href="/admin/tips/new"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm text-center"
            >
              Create Tip
            </Link>
            <Link
              href="/admin/vehicles/new"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm text-center"
            >
              Add Vehicle
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <p className="text-gray-400 text-sm">No recent activity</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </Link>
  );
}
