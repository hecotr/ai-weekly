"use client";

import { categoryLabels, getLatestWeek, getAllWeeks, Category, Article } from "@/lib/data";
import { fetchArticlesFromStatic } from "@/lib/feishu";
import Link from "next/link";
import { useState, useEffect } from "react";

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
          <Link href="/" className="nav-link nav-link-active">
            首页
          </Link>
          <Link href="/archive" className="nav-link">
            存档
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const displayIndex = String(index + 1).padStart(2, '0');

  return (
    <article
      className="article-card reveal-left p-5"
      style={{ animationDelay: `${index * 0.08}s` }}
      data-index={displayIndex}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="tag tag-ember text-xs">
          {categoryLabels[article.category].split(' ')[0]}
        </span>
        <span className="text-dust text-xs">{article.source}</span>
        <span className="text-ember">·</span>
        <span className="text-dust text-xs">{article.publishedAt}</span>
      </div>

      <h3 className="text-base font-bold mb-3 text-cream leading-snug">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ember transition-colors"
        >
          {article.title}
        </a>
      </h3>

      <p className="text-sm text-mist mb-4 leading-relaxed line-clamp-3">
        {article.summary}
      </p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-arrow"
      >
        阅读原文
      </a>
    </article>
  );
}

function StatBlock({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="stat-block reveal-up">
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function CategoryTile({ category, count }: { category: Category; count: number }) {
  const parts = categoryLabels[category].split(' ');
  const icon = parts[0];
  const name = parts.slice(1).join(' ');

  return (
    <Link href={`/archive?category=${category}`}>
      <div className="category-tile reveal-scale" data-icon={icon}>
        <div className="category-name">{name}</div>
        <div className="category-count">{count} 篇文章</div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticlesFromStatic().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const latestWeek = getLatestWeek(articles);
  const allWeeks = getAllWeeks(articles);
  
  // 只显示本周（最新一周）的文章
  const latestWeekArticles = articles.filter(a => a.week === latestWeek);
  
  const filteredArticles = selectedCategory
    ? latestWeekArticles.filter(a => a.category === selectedCategory)
    : latestWeekArticles;

  return (
    <div className="relative z-10">
      {/* Flowing Background */}
      <div className="bg-flow" />

      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-label reveal-up">
            {latestWeek} 已发布
          </div>

          <h1 className="hero-title reveal-up delay-1">
            <span className="gradient-text">AI</span>
            <br />
            WEEKLY
          </h1>

          <p className="hero-subtitle reveal-up delay-2">
            每周为你精选 AI 领域最重要的资讯，助你紧跟技术前沿。
          </p>

          <div className="hero-line line-grow delay-3" />
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        {/* Articles Section */}
        <section className="mb-20">
          <div className="section-header reveal-up">
            <h2 className="section-title">
              <span>Latest</span>
              本周热门
            </h2>
            <Link href="/archive" className="link-arrow">
              查看全部
            </Link>
          </div>

          {/* Filter */}
          <div className="filter-bar reveal-up">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`tag ${!selectedCategory ? 'tag-active' : 'tag-ember'}`}
            >
              全部
            </button>
            {(Object.keys(categoryLabels) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`tag ${selectedCategory === cat ? 'tag-active' : 'tag-ember'}`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 text-center py-12 text-mist">
                加载中...
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-mist">
                暂无数据
              </div>
            ) : (
              filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBlock value={latestWeekArticles.length} label="本周文章" />
            <StatBlock value={allWeeks.length} label="历史周数" />
            <StatBlock value="6" label="内容分类" />
            <StatBlock value={new Set(latestWeekArticles.map(a => a.source)).size} label="资讯来源" />
          </div>
        </section>

        {/* Divider */}
        <div className="divider" />

        {/* Categories Section */}
        <section className="mb-20">
          <div className="section-header reveal-up">
            <h2 className="section-title">
              <span>Categories</span>
              内容分类
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(Object.keys(categoryLabels) as Category[]).map((cat, index) => {
              const count = latestWeekArticles.filter(a => a.category === cat).length;
              return (
                <div key={cat} style={{ animationDelay: `${index * 0.08}s` }}>
                  <CategoryTile category={cat} count={count} />
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <div className="footer-title">AI Weekly</div>
            <p className="footer-text">
              每周为你精选 AI 领域最重要的资讯，<br />助你紧跟技术前沿。
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-title">快速链接</div>
            <Link href="/" className="footer-link">首页</Link>
            <Link href="/archive" className="footer-link">存档</Link>
          </div>

          <div className="footer-col">
            <div className="footer-title">关于</div>
            <p className="footer-text">
              由 AI 自动收集、整理、生成的 AI 新闻周报。
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 AI Weekly // Powered by AI & Tavily
          </p>
        </div>
      </footer>
    </div>
  );
}
