import { allPosts, Post } from 'contentlayer/generated';
import { ICONS, QIITA_USERID } from './const';

export const sortFunction = (a: Post, b: Post) => {
  if (a.date == null && b.date != null) {
    return -1;
  }
  if (a.date != null && b.date == null) {
    return 1;
  }
  if (a.date == null && b.date == null) {
    return a._id > b._id ? -1 : 1;
  }
  if (a.date != null && b.date != null) {
    return a.date > b.date ? -1 : 1;
  }
  return 0;
};

export const getCategories = () => {
  return allPosts.reduce(
    (prev, post) => Array.from(new Set([...prev, post.category])),
    [] as string[]
  );
};

export const getRandomBreadEmoji = () => {
  return ICONS[Math.floor(Math.random() * 7)];
};

export const getQiitaDocs = async (pages = 4) => {
  const response = await fetch(
    `https://qiita.com/api/v2/users/${QIITA_USERID}/items?per_page=${pages}`,
    {
      headers: { Authorization: `Bearer ${process.env.QIITA_TOKEN}` },
    }
  );
  const data: {
    title: string;
    updated_at: string;
    url: string;
    page_views_count: number;
    likes_count: number;
    stocks_count: number;
  }[] = await response.json();

  if (!data) {
    return [];
  }

  return data.map((article) => {
    return {
      title: article.title,
      date: article.updated_at.slice(0, 10),
      url: article.url,
      pageViews: article.page_views_count,
      likes: article.likes_count,
      stocks: article.stocks_count,
    };
  });
};
