"use client";

import { getAllWeeks, categoryLabels, Category, Article } from "@/lib/data";
import { fetchArticlesFromStatic } from "@/lib/feishu";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

// 获取文章数据（从静态 JSON 文件）
async function fetchArticles(): Promise<Article[]> {
  return await fetchArticlesFromStatic();
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          AI Weekly<span className="logo-dot" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="nav-link">
            首页
          </Link>
          <Link href="/archive" className="nav-link nav-link-active">
            存档
          </Link>
        </nav>
      </div>
    </header>
  );
}

function WeekCard({ week, articles, index, isExpanded, onToggle }: {
  week: string;
  articles: Article[];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const displayIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      className="article-card reveal-left cursor-pointer"
      data-index={displayIndex}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-cream mb-3">{week}</h3>
          <p className="text-dust">{articles.length} 篇文章</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-end max-w-sm">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => {
              const count = articles.filter((a) => a.category === cat).length;
              if (count === 0) return null;
              return (
                <span key={cat} className="tag tag-electric">
                  {categoryLabels[cat].split(' ')[0]} {count}
                </span>
              );
            })}
          </div>
          <span className={`text-ember transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {/* Expanded Articles */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-concrete space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="p-4 bg-charcoal border border-concrete">
              <div className="flex items-center gap-3 mb-2">
                <span className="tag tag-ember text-xs">
                  {categoryLabels[article.category].split(' ')[0]}
                </span>
                <span className="text-dust text-xs">{article.source}</span>
              </div>
              <h4 className="text-base font-semibold text-cream mb-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ember transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {article.title}
                </a>
              </h4>
              <p className="text-dust text-sm leading-relaxed">{article.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  label,
  articles,
  index,
  isSelected,
}: {
  category: Category;
  label: string;
  articles: Article[];
  index: number;
  isSelected: boolean;
}) {
  const parts = label.split(' ');
  const icon = parts[0];
  const name = parts.slice(1).join(' ');

  return (
    <Link href={`/archive?category=${category}`}>
      <div
        className={`category-tile reveal-scale ${isSelected ? 'border-ember' : ''}`}
        data-icon={icon}
        style={{ animationDelay: `${index * 0.1}s`, borderColor: isSelected ? 'var(--ember)' : undefined }}
      >
        <div className="category-name">{name}</div>
        <div className="category-count">{articles.length} 篇文章</div>
      </div>
    </Link>
  );
}

function ArchiveContent() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') as Category | null;
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const weeks = getAllWeeks(articles);
  const articlesByWeek = weeks.map((week) => ({
    week,
    articles: articles.filter((a) => a.week === week),
  }));

  const articlesByCategory = (Object.keys(categoryLabels) as Category[]).map(
    (cat) => ({
      category: cat,
      label: categoryLabels[cat],
      articles: articles.filter((a) => a.category === cat),
    })
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ember mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      {/* Flowing Background */}
      <div className="bg-flow" />

      <Header />

      {/* Hero */}
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <div className="hero-label reveal-up">
            Archive
          </div>

          <h1 className="hero-title reveal-up delay-1">
            <span className="gradient-text-alt">周报</span>
            <br />
            存档
          </h1>

          <p className="hero-subtitle reveal-up delay-2">
            浏览所有历史周报，按周或分类查看
          </p>

          <div className="hero-line line-grow delay-3" style={{ background: 'var(--gradient-electric)' }} />
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        {/* Selected Category Articles */}
        {selectedCategory && (
          <section className="mb-16">
            <div className="p-6 border border-ember bg-charcoal reveal-up">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-ember mb-1">
                    {categoryLabels[selectedCategory]}
                  </h3>
                  <p className="text-dust">
                    {articles.filter(a => a.category === selectedCategory).length} 篇文章
                  </p>
                </div>
                <Link href="/archive" className="btn btn-ghost">
                  清除筛选
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {articles
                  .filter(a => a.category === selectedCategory)
                  .map((article, index) => (
                    <div
                      key={article.id}
                      className="p-6 border border-concrete hover:border-dust transition-colors"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="tag tag-ember text-xs">
                          {article.source}
                        </span>
                        <span className="text-ember">·</span>
                        <span className="text-dust text-xs">{article.publishedAt}</span>
                      </div>
                      <h4 className="text-base font-bold text-cream mb-3">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-ember transition-colors"
                        >
                          {article.title}
                        </a>
                      </h4>
                      <p className="text-mist leading-relaxed text-sm">{article.summary}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* By Week */}
        <section className="mb-16">
          <div className="section-header reveal-up">
            <h2 className="section-title">
              <span>By Week</span>
              按周浏览
            </h2>
          </div>
          <div className="grid gap-4">
            {articlesByWeek.map(({ week, articles }, index) => (
              <WeekCard
                key={week}
                week={week}
                articles={articles}
                index={index}
                isExpanded={expandedWeek === week}
                onToggle={() => setExpandedWeek(expandedWeek === week ? null : week)}
              />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="divider" />

        {/* By Category */}
        <section className="mb-20">
          <div className="section-header reveal-up">
            <h2 className="section-title">
              <span>By Category</span>
              按分类浏览
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {articlesByCategory.map(({ category, label, articles }, index) => (
              <CategoryCard
                key={category}
                category={category}
                label={label}
                articles={articles}
                index={index}
                isSelected={selectedCategory === category}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 AI Weekly // Powered by AI & Tavily
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ArchivePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ember mono">Loading...</div>
      </div>
    }>
      <ArchiveContent />
    </Suspense>
  );
}
