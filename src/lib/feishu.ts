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
