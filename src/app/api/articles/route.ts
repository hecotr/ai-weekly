import { NextResponse } from 'next/server';

const APP_TOKEN = process.env.FEISHU_BITABLE_APP_TOKEN!;
const TABLE_ID = process.env.FEISHU_BITABLE_TABLE_ID!;

export async function GET() {
  try {
    // 从飞书多维表格获取数据
    const response = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records?page_size=500`,
      {
        headers: {
          'Authorization': `Bearer ${await getAccessToken()}`,
        },
      }
    );

    const data = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.msg || '获取数据失败');
    }

    // 转换数据格式
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

    return NextResponse.json({ articles });
  } catch (error: any) {
    console.error('获取文章失败:', error);
    return NextResponse.json(
      { error: error.message || '获取文章失败' },
      { status: 500 }
    );
  }
}

async function getAccessToken(): Promise<string> {
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET,
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
