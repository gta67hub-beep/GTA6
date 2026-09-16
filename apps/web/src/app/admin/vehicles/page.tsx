import Link from "next/link";
import { prisma } from "@/database/client";

export default async function AdminVehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Vehicles Management</h1>
        <Link
          href="/admin/vehicles/new"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Vehicle
        </Link>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Name
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Class
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Availability
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-gray-400 text-center py-8">
                  No vehicles found
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-gray-800">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/vehicles/${vehicle.slug}`}
                      className="text-white hover:text-red-400"
                    >
                      {vehicle.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {vehicle.class || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {vehicle.availability || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {vehicle.price || "-"}
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
