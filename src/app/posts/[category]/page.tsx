import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';
import { CATEGORIES, ARTICLES_PER_PAGE } from '@/lib/const';
import ArticleCard from '@/components/ArticleCard';
import GridWithHeader from '@/components/GridWithHeader';
import { sortFunction } from '@/lib/utils';

export const generateStaticParams = async () => {
  return Array.from(CATEGORIES).map((category) => ({
    category: category[0],
  }));
};

export const generateMetadata = ({
  params,
}: {
  params: { category: string };
}) => {
  const { category } = params;
  return { title: CATEGORIES.get(category) };
};

export default function List(params: {
  params: { category: string };
  searchParams: { page?: string };
}) {
  const { category } = params.params;
  const page = params.searchParams.page
    ? parseInt(params.searchParams.page)
    : 0;
  const posts = allPosts
    .filter((post) => post.category === category)
    .sort(sortFunction)
    .slice(page * ARTICLES_PER_PAGE, ARTICLES_PER_PAGE);
  return (
    <GridWithHeader header={CATEGORIES.get(category)}>
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
