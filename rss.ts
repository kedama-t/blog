import fs from 'fs';
import type { Post } from './.contentlayer/generated';
import { sortFunction } from './src/lib/utils';
import { DESCRIPTION, TITLE, URL_BASE } from './src/lib/const';

const generateRss = (allPosts: Post[]) => {
  const path = './public/rss.xml'
  const items = allPosts.sort(sortFunction).splice(0, 10).map(post => {
    return `<item>
<guid>${URL_BASE}${post.url}</guid>
<title>${post.title}</title>
<description>${post.description}</description>
<link>${URL_BASE}${post.url}</link>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`
  })

  const rss = `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${TITLE}</title>
<link>${URL_BASE}</link>
<description>${DESCRIPTION}</description>
<atom:link href="${URL_BASE}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('')}
</channel>
</rss>`
  fs.writeFileSync(path, rss)
}

export default generateRss;
