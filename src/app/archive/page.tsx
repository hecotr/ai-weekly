import { getAllWeeks, sampleArticles, categoryLabels } from "@/lib/data";
import { Category } from "@/lib/data";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">📰</span>
            <span className="text-xl font-bold gradient-text">AI Weekly</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="link-hover text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              首页
            </Link>
            <Link href="/archive" className="link-hover text-blue-500 dark:text-blue-400">
              存档
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function ArchivePage() {
  const weeks = getAllWeeks();
  const articlesByWeek = weeks.map((week) => ({
    week,
    articles: sampleArticles.filter((a) => a.week === week),
  }));

  const articlesByCategory = (Object.keys(categoryLabels) as Category[]).map(
    (cat) => ({
      category: cat,
      label: categoryLabels[cat],
      articles: sampleArticles.filter((a) => a.category === cat),
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10 animate-gradient"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">📚 周报存档</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              浏览所有历史周报，按周或分类查看
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* By Week */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span>📅</span>
            <span>按周浏览</span>
          </h2>
          <div className="grid gap-4">
            {articlesByWeek.map(({ week, articles }) => (
              <div
                key={week}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 card-hover"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {week}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {articles.length} 篇文章
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(categoryLabels) as Category[]).map((cat) => {
                      const count = articles.filter((a) => a.category === cat).length;
                      if (count === 0) return null;
                      return (
                        <span
                          key={cat}
                          className="badge badge-primary text-xs"
                        >
                          {categoryLabels[cat].split(' ')[0]} {count}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* By Category */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span>🏷️</span>
            <span>按分类浏览</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articlesByCategory.map(({ category, label, articles }) => (
              <div
                key={category}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 card-hover cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{label.split(' ')[0]}</div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {label.split(' ').slice(1).join(' ')}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                      {articles.length} 篇文章
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2026 AI Weekly. Powered by AI & Tavily.</p>
        </div>
      </footer>
    </div>
  );
}
