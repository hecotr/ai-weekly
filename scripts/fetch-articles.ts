// 构建时获取飞书数据的脚本
// 运行: npx ts-node --esm scripts/fetch-articles.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FEISHU_CONFIG = {
  appId: process.env.NEXT_PUBLIC_FEISHU_APP_ID || '',
  appSecret: process.env.NEXT_PUBLIC_FEISHU_APP_SECRET || '',
  appToken: process.env.NEXT_PUBLIC_FEISHU_BITABLE_APP_TOKEN || '',
  tableId: process.env.NEXT_PUBLIC_FEISHU_BITABLE_TABLE_ID || '',
};

async function getFeishuAccessToken(): Promise<string> {
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: FEISHU_CONFIG.appId,
      app_secret: FEISHU_CONFIG.appSecret,
    }),
  });

  const data = await response.json();
  
  if (data.code !== 0) {
    throw new Error(data.msg || '获取 access token 失败');
  }

  return data.tenant_access_token;
}

function formatDate(timestamp: number): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
}

async function fetchArticles() {
  if (!FEISHU_CONFIG.appId || !FEISHU_CONFIG.appSecret) {
    console.warn('飞书 API 未配置，请设置环境变量');
    return [];
  }

  console.log('开始获取飞书数据...');
  
  const accessToken = await getFeishuAccessToken();
  console.log('获取 access token 成功');
  
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_CONFIG.appToken}/tables/${FEISHU_CONFIG.tableId}/records?page_size=500`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  
  if (data.code !== 0) {
    console.error('获取数据失败:', data.msg);
    return [];
  }

  const articles = data.data.items.map((item: any) => ({
    id: item.record_id,
    title: item.fields['标题'] || '',
    summary: item.fields['摘要'] || '',
    source: item.fields['来源'] || 'Web',
    url: item.fields['链接']?.link || '',
    category: item.fields['分类'] || 'llm',
    week: item.fields['周次'] || '',
    publishedAt: formatDate(item.fields['发布日期']),
  }));

  return articles;
}

async function main() {
  const articles = await fetchArticles();
  console.log(`获取到 ${articles.length} 篇文章`);
  
  // 写入 public/data/articles.json
  const dataDir = path.join(__dirname, '..', 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = path.join(dataDir, 'articles.json');
  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`数据已保存到: ${outputPath}`);
}

main().catch(console.error);
