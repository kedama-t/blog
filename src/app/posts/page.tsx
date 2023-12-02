import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';
import { ARTICLES_PER_PAGE } from '@/lib/const';
import ArticleCard from '@/components/ArticleCard';
import GridWithHeader from '@/components/GridWithHeader';
import { sortFunction } from '@/lib/utils';

export default function List() {
  const posts = allPosts
    .sort(sortFunction)
    //.slice(page * ARTICLES_PER_PAGE, ARTICLES_PER_PAGE);
  return (
    <GridWithHeader header="記事一覧">
      {posts.map((post, index) => (
        <Link key={index} href={post.url}>
          <ArticleCard
            title={post.title}
            emoji={post.emoji}
            date={post.date}
            category={post.category}
            description={post.description}
          />
        </Link>
      ))}
    </GridWithHeader>
  );
}
