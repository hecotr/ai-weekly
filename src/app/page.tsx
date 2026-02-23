import { sampleArticles, categoryLabels, getLatestWeek, getAllWeeks, Category } from "@/lib/data";
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
            <Link href="/archive" className="link-hover text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              存档
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function CategoryFilter({ 
  selected, 
  onSelect 
}: { 
  selected: Category | "all"; 
  onSelect: (cat: Category | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelect("all")}
        className={`badge badge-primary ${selected === "all" ? "bg-blue-500 text-white" : ""}`}
      >
        全部
      </button>
      {(Object.keys(categoryLabels) as Category[]).map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`badge ${selected === cat ? "bg-blue-500 text-white border-blue-500" : "badge-primary"}`}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}

function ArticleCard({ article, index }: { article: typeof sampleArticles[0]; index: number }) {
  return (
    <article 
      className="group card-hover bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge badge-primary text-xs">
            {categoryLabels[article.category]}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{article.source}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{article.publishedAt}</span>
        </div>
        <h2 className="text-lg font-semibold mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {article.title}
          </a>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
          {article.summary}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            阅读原文
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function StatsCard({ value, label, icon }: { value: string | number; label: string; icon: string }) {
  return (
    <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 card-hover">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
    </div>
  );
}

export default function Home() {
  const latestWeek = getLatestWeek();
  const allWeeks = getAllWeeks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {latestWeek} 已发布
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">AI Weekly</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              每周 AI 领域精选资讯
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              大模型 · AI Agent · 半导体 · 开源项目 · 融资动态
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>🔥</span>
            <span>本周热门</span>
          </h2>
          <Link href="/archive" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1">
            查看全部
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sampleArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">📊 本周数据</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard value={sampleArticles.length} label="本周文章" icon="📝" />
            <StatsCard value={allWeeks.length} label="周数" icon="📅" />
            <StatsCard value="6" label="分类" icon="🏷️" />
            <StatsCard value={new Set(sampleArticles.map(a => a.source)).size} label="来源" icon="🌐" />
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">📑 内容分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => {
              const count = sampleArticles.filter(a => a.category === cat).length;
              return (
                <div key={cat} className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-center card-hover cursor-pointer">
                  <div className="text-2xl mb-2">{categoryLabels[cat].split(' ')[0]}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{categoryLabels[cat].split(' ').slice(1).join(' ')}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{count} 篇</div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📰</span>
                <span className="text-lg font-bold gradient-text">AI Weekly</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                每周为你精选 AI 领域最重要的资讯，助你紧跟技术前沿。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/" className="hover:text-blue-500 transition-colors">首页</Link></li>
                <li><Link href="/archive" className="hover:text-blue-500 transition-colors">存档</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">关于</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                由 AI 自动收集、整理、生成的 AI 新闻周报。
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500 text-sm">
            <p>© 2026 AI Weekly. Powered by AI & Tavily.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
