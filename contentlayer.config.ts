import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: 'rose-pine-moon',
};

const generateTableOfContent = (html: string) => {
  //extract heading
  const headings = html.matchAll(/<(h[1-6])\sid=\".*?\">(.*?)<\/h/g);
  const table = [...headings].map(
    (heading) => `<div class="${heading[1]}">${heading[2]}</div>`
  );
  return `<div class="toc">${table.join('')}</div>`;
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/!(*_draft).md`,
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
    emoji: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    toc: {
      type: 'string',
      resolve: (post) => generateTableOfContent(post.body.html),
    },
    category: {
      type: 'string',
      resolve: (post) => post._id.split('/')[0],
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    //@ts-expect-error
    remarkPlugins: [remarkDirective, remarkDirectiveRehype, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, { ...prettyCodeOptions }],
    ],
  },
});
