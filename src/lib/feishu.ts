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
