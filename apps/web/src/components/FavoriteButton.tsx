"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { useAnalytics } from "@/hooks/useAnalytics";

interface FavoriteButtonProps {
  id: string;
  name: string;
  slug: string;
  type: "vehicle" | "news" | "tip" | "character" | "location" | "weapon";
}

export default function FavoriteButton({
  id,
  name,
  slug,
  type,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { trackFavorite } = useAnalytics();
  const active = isFavorite(id, type);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({ id, name, slug, type });
    trackFavorite(type, name, active ? "remove" : "add");
  };

  return (
    <button
      onClick={handleClick}
      className={`p-1.5 rounded-full transition-colors ${
        active
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
      }`}
      title={active ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
