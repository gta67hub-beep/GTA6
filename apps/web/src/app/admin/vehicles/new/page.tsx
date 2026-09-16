"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    type: "car",
    manufacturer: "",
    class: "",
    speed: "",
    acceleration: "",
    braking: "",
    handling: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/database/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          speed: form.speed ? parseFloat(form.speed as string) : null,
          acceleration: form.acceleration ? parseFloat(form.acceleration as string) : null,
          braking: form.braking ? parseFloat(form.braking as string) : null,
          handling: form.handling ? parseFloat(form.handling as string) : null,
        }),
      });

      if (res.ok) {
        router.push("/admin/vehicles");
      }
    } catch (error) {
      console.error("Failed to create vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Add Vehicle</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => {
              const name = e.target.value;
              setForm({ ...form, name, slug: generateSlug(name) });
            }}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="boat">Boat</option>
              <option value="aircraft">Aircraft</option>
              <option value="helicopter">Helicopter</option>
              <option value="bicycle">Bicycle</option>
              <option value="truck">Truck</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Class</label>
            <input
              type="text"
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
              placeholder="e.g. Sports, Muscle, SUV"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Manufacturer</label>
          <input
            type="text"
            value={form.manufacturer}
            onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Speed</label>
            <input
              type="number"
              value={form.speed}
              onChange={(e) => setForm({ ...form, speed: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Acceleration</label>
            <input
              type="number"
              value={form.acceleration}
              onChange={(e) => setForm({ ...form, acceleration: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Braking</label>
            <input
              type="number"
              value={form.braking}
              onChange={(e) => setForm({ ...form, braking: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Handling</label>
            <input
              type="number"
              value={form.handling}
              onChange={(e) => setForm({ ...form, handling: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 h-32"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Image URL</label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Vehicle"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
