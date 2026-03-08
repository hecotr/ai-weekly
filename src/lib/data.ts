// AI Weekly Report - Data Types and Sample Data

export type Category = 'llm' | 'agent' | 'chip' | 'opensource' | 'funding' | 'research';

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: Category;
  week: string;
  publishedAt: string;
}

export interface WeeklyReport {
  week: string;
  articles: Article[];
  generatedAt: string;
}

export const categoryLabels: Record<Category, string> = {
  llm: '🤖 大模型',
  agent: '🛠️ AI Agent',
  chip: '⚛️ 半导体/AI芯片',
  opensource: '📦 开源项目',
  funding: '💰 融资&产品',
  research: '🔬 研究&论文',
};

// 示例数据（当 API 不可用时使用）
export const sampleArticles: Article[] = [];

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch('/api/articles');
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('获取文章失败:', error);
    return sampleArticles;
  }
}

export function getArticlesByWeek(articles: Article[], week: string): Article[] {
  return articles.filter(article => article.week === week);
}

export function getArticlesByCategory(articles: Article[], category: Category): Article[] {
  return articles.filter(article => article.category === category);
}

export function getLatestWeek(articles: Article[]): string {
  const weeks = [...new Set(articles.map(a => a.week))];
  return weeks.sort().reverse()[0] || '2026-W01';
}

export function getAllWeeks(articles: Article[]): string[] {
  const weeks = [...new Set(articles.map(a => a.week))];
  return weeks.sort().reverse();
}
