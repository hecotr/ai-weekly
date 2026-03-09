// 飞书 API 配置（从环境变量读取）
export const FEISHU_CONFIG = {
  appId: process.env.NEXT_PUBLIC_FEISHU_APP_ID || '',
  appSecret: process.env.NEXT_PUBLIC_FEISHU_APP_SECRET || '',
  appToken: process.env.NEXT_PUBLIC_FEISHU_BITABLE_APP_TOKEN || '',
  tableId: process.env.NEXT_PUBLIC_FEISHU_BITABLE_TABLE_ID || '',
};

// 格式化日期
export function formatDate(timestamp: number): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
}

// 从静态 JSON 文件获取文章数据（构建时生成）
export async function fetchArticlesFromStatic(): Promise<any[]> {
  try {
    const response = await fetch('/data/articles.json');
    if (!response.ok) {
      console.error('获取静态数据失败');
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('获取静态数据失败:', error);
    return [];
  }
}
