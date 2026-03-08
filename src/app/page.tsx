import { fetchArticles } from '@/lib/actions';
import HomePage from './HomePage';

export default async function Page() {
  const articles = await fetchArticles();
  return <HomePage initialArticles={articles} />;
}
