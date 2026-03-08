import { fetchArticles } from '@/lib/actions';
import ArchivePage from '../ArchivePage';

export default async function Page() {
  const articles = await fetchArticles();
  return <ArchivePage initialArticles={articles} />;
}
