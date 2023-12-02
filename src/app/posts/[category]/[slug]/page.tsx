import { allPosts } from 'contentlayer/generated';

export const generateStaticParams = async () => {
  return allPosts.map((post) => {
    const [category, slug] = post._raw.flattenedPath.split('/');
    return {
      category,
      slug,
    };
  });
};

export const generateMetadata = ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
  const { category, slug } = params;
  const post = allPosts.find((post) => {
    return post._raw.flattenedPath === `${category}/${slug}`;
  });
  if (!post) throw new Error(`Post not found for slug: ${params}`);
  return { title: post.title };
};

export default function PostLayout({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { category, slug } = params;
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `${category}/${slug}`
  );
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article className="py-8">
      <div className="flex flex-row gap-2 px-8">
        <div className="w-full">
          <h2 className="mb-6 border-b-2 border-secondary text-4xl font-extrabold text-on-secondary-50">
            {post.emoji}&nbsp;{post.title}
          </h2>
          <div
            className="markdown lg:px-8"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
        </div>
        <div
          className="hidden w-80 text-sm lg:block"
          dangerouslySetInnerHTML={{ __html: post.toc }}
        />
      </div>
    </article>
  );
}
