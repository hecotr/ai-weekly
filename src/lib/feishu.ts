// 从静态 JSON 文件获取文章数据（构建时生成）
export async function fetchArticlesFromStatic(): Promise<any[]> {
  // 确保只在客户端运行
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    // 使用绝对路径（包含 basePath）
    const response = await fetch('/ai-weekly/data/articles.json');
    if (!response.ok) {
      console.error('获取静态数据失败:', response.status);
      return [];
    }
    const data = await response.json();
    console.log('获取到文章数据:', data.length, '篇');
    return data;
  } catch (error) {
    console.error('获取静态数据失败:', error);
    return [];
  }
}
