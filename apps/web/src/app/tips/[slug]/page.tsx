import Link from "next/link";

async function getTip(slug: string) {
  const res = await fetch(`http://localhost:3000/api/tips/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function TipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tip = await getTip(slug);

  if (!tip) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Not found</h1>
          <Link href="/" className="text-red-500 hover:text-red-400">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-white text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {tip.category}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded ${
                tip.difficulty === "beginner"
                  ? "bg-green-600"
                  : tip.difficulty === "intermediate"
                  ? "bg-yellow-600"
                  : "bg-red-600"
              } text-white`}
            >
              {tip.difficulty}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{tip.title}</h1>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>{tip.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{tip.likes.toLocaleString()} likes</span>
          </div>
        </header>

        {tip.image && (
          <div className="mb-8">
            <img
              src={tip.image}
              alt={tip.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-6">{tip.shortDescription}</p>

          <div
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: tip.fullExplanation }}
          />
        </div>

        <footer className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">
              Published on{" "}
              {new Date(tip.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </footer>
      </article>
    </div>
  );
}
