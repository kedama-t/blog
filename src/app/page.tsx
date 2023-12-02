import { allPosts, Post } from 'contentlayer/generated';
import Link from 'next/link';
import { CATEGORIES, QIITA_USERID } from '@/lib/const';
import ArticleCard from '@/components/ArticleCard';
import { getQiitaDocs, sortFunction } from '@/lib/utils';
import QiitaArticleCard from '@/components/QiitaArticleCard';
import GridWithHeader from '@/components/GridWithHeader';
import Profile from './profile';

export default async function Top() {
  const postsWithCategories = allPosts
    .sort(sortFunction)
    .reduce((prev, post) => {
      if (!Object.keys(prev).includes(post.category)) {
        return { ...prev, [post.category]: [post] };
      }
      return {
        ...prev,
        [post.category]: [...(prev[post.category] ?? []), post],
      };
    }, {} as { [category: string]: Post[] });

  const getQiitaContent = await getQiitaDocs();

  return (
    <>
      <Profile />
      <GridWithHeader
        header={<Link href={`https://qiita.com/${QIITA_USERID}`}>Qiita</Link>}
      >
        {getQiitaContent.map((post, index) => (
          <Link key={index} href={post.url}>
            <QiitaArticleCard
              title={post.title}
              date={post.date}
              pageViews={post.pageViews}
              likes={post.likes}
              stocks={post.stocks}
            />
          </Link>
        ))}
      </GridWithHeader>
      {/* markdown */}
      {Object.keys(postsWithCategories).map((category) => {
        const postsWithCategory = postsWithCategories[category];
        return (
          <GridWithHeader
            key={category}
            header={
              <Link href={`/${category}`}>{CATEGORIES.get(category)}</Link>
            }
          >
            {postsWithCategory.map((post, index) => (
              <Link key={`${category}${index}`} href={post.url}>
                <ArticleCard
                  title={post.title}
                  emoji={post.emoji}
                  date={post.date}
                  description={post.description}
                  category={post.category}
                />
              </Link>
            ))}
          </GridWithHeader>
        );
      })}
    </>
  );
}
