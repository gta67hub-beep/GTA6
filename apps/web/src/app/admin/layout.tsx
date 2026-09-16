import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-white font-bold text-lg">
                GTA 6 Hub Admin
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/admin/news"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  News
                </Link>
                <Link
                  href="/admin/tips"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Tips
                </Link>
                <Link
                  href="/admin/vehicles"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Vehicles
                </Link>
                <Link
                  href="/admin/users"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Users
                </Link>
              </div>
            </div>
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-sm"
            >
              Back to App
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
