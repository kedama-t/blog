---
title: contentlayer
date: 2023-11-30
emoji: 🤔
---

# Contentlayer の色々

## 序

- [Next.js](https://nextjs.org/)と[Contentlayer](https://contentlayer.dev/)を使って、Markdown ブログを作っています。
- Contentlayer で Markdown を使うにあたって、 ToC を生成したかったのですが、既存のプラグインではイマイチだったので、`computedFields`にゴリ押しで実装した事例です。
- その他、いろいろなプラグインの事例も備忘録的に記載しています。

### Contentlayer

- Markdown または[MDX](https://mdxjs.com/) 形式のドキュメントを読み込み、型が付いたオブジェクト配列として扱えるようにしてくれるツールです。
  - [Notion]が試験的にサポートされていたり、[Contentful]ほかヘッドレス CMS のサポートを計画しているようです。

#### 例えば

これが

```markdown
---
title: 例えば
date: 2023-12-01
emoji: 📝
description: 第一というと、あなたの胸にはまた失われてしまうのだそうです。
tags: 
  - Lorem Ipsum
  - Next.js
  - Tailwind CSS
  - Contentlayer
---

## もっともその時の私の判断に縋り付こうとしたのです。

それは前後で丁度三、四日続いて出た。奥さんの名は静といったのです。私はその時自分の言葉使いの角張ったところに気が付くはずがなかった。

- 岩の上から見下す水は、また極めて簡単でした。
- しかも細君は夫が寝ている父を見た。
- それが解るくらいなら私だって同じ事であった。

## しかし……私はこの質問の裏にそっと置かれた。

もう何にもする事はありました。私はこの間中聞いたのです。そのくらいだから父の危険が眼の前に涙ぐんだ。

1. 人間を愛し得る人、愛せずにはいられませんでした。
2. 私は何とも思いませんでした。
3. するとＫは足が向かなくなります。
```

こんな感じになります。

```json
{
  "title": "例えば",
  "description": "第一というと、あなたの胸にはまた失われてしまうのだそうです。",
  "date": "2023-12-01T00:00:00.000Z",
  "emoji": "📝",
  "tags": [
    "Lorem Ipsum",
    "Next.js",
    "Tailwind CSS",
    "Contentlayer\r"
  ],
  "body": {
    "raw": "\r\n## もっともその時の私の判断に縋り付こうとしたのです。\r\n\r\nそれは前後で丁度三、四日続いて出た。奥さんの名は静といったのです。私はその時自分の言葉使いの角張ったところに気が付くはずがなかった。\r\n\r\n- 岩の上から見下す水は、また極めて簡単でした。\r\n- しかも細君は夫が寝ている父を見た。\r\n- それが解るくらいなら私だって同じ事であった。\r\n\r\n## しかし……私はこの質問の裏にそっと置かれた。\r\n\r\nもう何にもする事はありました。私はこの間中聞いたのです。そのくらいだから父の危険が眼の前に涙ぐんだ。\r\n\r\n1. 人間を愛し得る人、愛せずにはいられませんでした。\r\n2. 私は何とも思いませんでした。\r\n3. するとＫは足が向かなくなります。\r\n",
    "html": "<h2 id=\"もっともその時の私の判断に縋り付こうとしたのです\">もっともその時の私の判断に縋り付こうとしたのです。<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#もっともその時の私の判断に縋り付こうとしたのです\"><span class=\"icon icon-link\"></span></a></h2>\n<p>それは前後で丁度三、四日続いて出た。奥さんの名は静といったのです。私はその時自分の言葉使いの角張ったところに気が付くはずがなかった。</p>\n<ul>\n<li>岩の上から見下す水は、また極めて簡単でした。</li>\n<li>しかも細君は夫が寝ている父を見た。</li>\n<li>それが解るくらいなら私だって同じ事であった。</li>\n</ul>\n<h2 id=\"しかし私はこの質問の裏にそっと置かれた\">しかし……私はこの質問の裏にそっと置かれた。<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#しかし私はこの質問の裏にそっと置かれた\"><span class=\"icon icon-link\"></span></a></h2>\n<p>もう何にもする事はありました。私はこの間中聞いたのです。そのくらいだから父の危険が眼の前に涙ぐんだ。</p>\n<ol>\n<li>人間を愛し得る人、愛せずにはいられませんでした。</li>\n<li>私は何とも思いませんでした。</li>\n<li>するとＫは足が向かなくなります。</li>\n</ol>"
  },
  "_id": "idea/example.md",
  "_raw": {
    "sourceFilePath": "idea/example.md",
    "sourceFileName": "example.md",
    "sourceFileDir": "idea",
    "contentType": "markdown",
    "flattenedPath": "idea/example"
  },
  "type": "Post",
}
```

これに ToC をつけたいというのが今回の記事の主旨です。

```json
{
    "toc": "<div class=\"toc\"><div class=\"h2\">もっともその時の私の判断に縋り付こうとしたのです。<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#もっともその時の私の判断に縋り付こうとしたのです\"><span class=\"icon icon-link\"></span></a></div><div class=\"h2\">しかし……私はこの質問の裏にそっと置かれた。<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#しかし私はこの質問の裏にそっと置かれた\"><span class=\"icon icon-link\"></span></a></div></div>",
}
```

こういうこと

```html
<div class="toc">
  <div class="h2">もっともその時の私の判断に縋り付こうとしたのです。
    <a aria-hidden="true" tabindex="-1"
      href="#もっともその時の私の判断に縋り付こうとしたのです"
      >
      <span class="icon icon-link"></span>
    </a>
  </div>
  <div class="h2">しかし……私はこの質問の裏にそっと置かれた。
    <a aria-hidden="true" tabindex="-1"
      href="#しかし私はこの質問の裏にそっと置かれた">
      <span class="icon icon-link"></span>
    </a>
  </div>
</div>
```

## プラグインで何とかする

- Contentlayer は Markdown から AST への変換で[remark]を、AST から html への変換で[rehype]を使っており、それぞれのプラグインを使うことができます。

```typescript
export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [/*ここにremarkプラグインを刺す*/],
    rehypePlugins: [/*ここにrehypeプラグインを刺す*/],
  },
});
```

### `remark-toc` を使う

- [remark-toc](https://github.com/remarkjs/remark-toc)は、目次を生成するための **remark** プラグインです。
  - remark プラグインということは、Markdown から AST への変換時に作用することになりますね。
- これだけだと`a`タグが機能しないので、[rehype-slug](https://github.com/rehypejs/rehype-slug)も入れておきます。
  - rehype-slug は、各`h[1-6]`タグに`id`を割り当ててくれるプラグインです。

```bash
npm install remark-toc rehype-slug
```

- このように刺すと、`# 目次`の下に ToC を生成します。

```typescript
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [[ remarkToc, { heading: '目次' } ]],
    rehypePlugins: [ rehypeSlug ] },
});
```

- これが

```markdown
## 目次

## Content1

## Content2
```

- remark の処理中にこうなり

```markdown
## 目次

- [Content1](#content1)
- [Content2](#content2)

## Content1

## Content2
```

- 最終的にこうなります

```html
<h2>目次</h2>
<ul>
  <li><a href="#content1">Content1</a></li>
  <li><a href="#content2">Content2</a></li>
</ul>
<h2 id="content1">Content1</h2>
<h2 id="content2">Content2</h2>
```

#### 良し悪し

- 目次の位置を Markdown の記載で制御できるのは、よい。
- Markdown 側に`heading`で指定した文字列でヘッダーを書いておかないといけないのは、よくはない。
  - 目次をつけたりつけなかったりしたい場合には、よい。
- 本文と同じスタイルが当たるのは、どちらともいえない。

総じて、ToC を本文に紛れ込ませる用途にはよいですが、個人的には ToC をサイドバー的に表示したいので、ちょっと用途には合わないかなと。

### `rehype-toc` を使う

- [rehype-toc](https://github.com/JS-DevTools/rehype-toc)は、目次を生成するための **rehype** プラグインです。
  - rehype プラグインということは、AST から html (正確には、mdast から hast)への変換時に作用することになります。
- これも[rehype-slug](https://github.com/rehypejs/rehype-slug)と一緒に使います。

```bash
npm install remark-toc rehype-slug
```

- このように刺すと、`nav`タグで ToC を生成します。

```typescript
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeToc, { headings: 'h2'} ]
    ]
  },
});
```

- これが

```markdown
## 目次

## Content1

## Content2
```

- こうなります

```html
<nav class="toc">
  <ol class="toc-level toc-level-1">
    <li class="toc-item toc-item-h2">
      <a class="toc-link toc-link-h2" href="#目次">目次</a>
    </li>
    <li class="toc-item toc-item-h2">
      <a class="toc-link toc-link-h2" href="#content1">Content1</a>
    </li>
    <li class="toc-item toc-item-h2">
      <a class="toc-link toc-link-h2" href="#content2">Content2</a>
    </li>
  </ol>
</nav>
<h2 id="目次">目次</h2>
<h2 id="content1">Content1</h2>
<h2 id="content2">Content2</h2>
```

#### 良し悪し

- `nav`タグに`class`付きなのでスタイルを当てやすいのは、よい
- 本文側にはタグがないため、カラムレイアウトにする場合は、よくはない。
- かならず本文の前に挿入されるのは、どちらともいえない。

おおむねこれでいいと思うのですが、カラムレイアウトにしたかったし、本文とは切り離してレンダリングしたかったので、完全に用途にマッチしたとは言い難い。

### `computedFields`で何とかする

- Contentlayer はドキュメントの型を指定することができますが、その中に Markdown 本体から取得するものとは別に、計算列(?)を設けることができます。

- つまりこのようにして html からぶっこ抜くことができれば、`toc`に格納して本文とは完全に独立してレンダリングできます。

```typescript
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
  // これ
  computedFields: {
    toc: {
      type: 'string',
      resolve: (post) => generateTableOfContent(post.body.html),
    },
  },
}));
```

- こんな感じで、正規表現で強引に抜きます。

```typescript
const generateTableOfContent = (html: string) => {
  //extract heading
  const headings = html.matchAll(/<(h[1-6])\sid=\"(.*?)\">(.*?)<\/h/g);
  const table = [...headings].map(
    (heading) => `<div class="${heading[1]}">${heading[3]}</div>`
  );
  return `<div class="toc">${table.join('')}</div>`;
};
```

- すると、このように目次が生成されます。

```html
<div class="toc">
  <div class="h2">目次</div>
  <div class="h2">Content1</div>
  <div class="h2">Content2</div>
</div>
```

#### 良し悪し

- 本文の html とは完全に独立して取得できるのは、よい。
  - スタイルもどうにでもあてられるので、よい。
- `<h[1-6]>`タグの中身がそのまま抜けるのは、どちらともいえない。
  - 例えば、`## [Next.js](https://nextjs.org/)を使う`のような見出しは、以下のようになるので、外部リンク等すると目次からも飛んでしまう。

```html
<div class="h2"><a href="https://nextjs.org/">Next.js</a>を使う</div>
```

- 個人的には、リンクごと抜けることの懸念よりも、独立して取得できるほうがありがたいので、これを採用しています。

### `rehype-autolink-headings`でリンクをつける

- このままでは目次から本文に飛べないので、ヘッダーが自動でリンクになるようにします。
- [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings)は、見出しに自動でアンカーをつけてくれます。

```bash
npm install rehype-autolink-headings
```

```typescript
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ]
  },
});
```

- すると、本文はこうなります。
  - `behavior`に`append`を指定しているので、文字の後ろに`a`タグがきます。
    - デフォルトは`preppend`で、文字の前に`a`タグが来ます。
    - `wrap`にすると、文字列全体がリンクになります。
    - `after`、`before`にすると、`h`タグの外に、`a`タグが配置されます。

```html
<h2 id="目次">目次
  <a aria-hidden="true" tabindex="-1" href="#目次">
    <span class="icon icon-link"></span>
  </a>
</h2>
<h2 id="content1">Content1
  <a aria-hidden="true" tabindex="-1" href="#content1">
    <span class="icon icon-link"></span>
  </a>
</h2>
<h2 id="content2">Content2
  <a aria-hidden="true" tabindex="-1" href="#content2">
  <span class="icon icon-link"></span>
  </a>
</h2>
```

- ということは、`toc`も引きずられてこうなります。

```html
<div class="toc">
   <div class="h2">目次
    <a aria-hidden="true" tabindex="-1" href="#目次">
      <span class="icon icon-link"></span>
    </a>
   </div>
   <div class="h2">Content1
    <a aria-hidden="true" tabindex="-1" href="#content1">
      <span class="icon icon-link"></span>
    </a>
   </div>
   <div class="h2">Content2
    <a aria-hidden="true" tabindex="-1" href="#content2">
      <span class="icon icon-link"></span>
    </a>
   </div>
</div>
```

- `span`タグが空なので、別途スタイルで差し込みます。

```tailwindcss
  .icon {
    @apply inline-block before:content-['🔗'];
  }
```

- もしくは、`content`オプションで差し込む内容を指定することもできます。
  - 例えば以下のようにすると、`a`タグの子要素は`<span>🔗</span>`になります。

```typescript
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      content: {
        type: 'element',
        tagName: 'span',
        properties: {},
        children: [{ type: 'text', value: '🔗' }],
      },
    },
  ],
```

## カスタムタグを追加する

- Markdown では表現しきれない場合、html を書くことになりますが、Qiita でいうところの

:::note info
これとか
:::

:::note alert
これ
:::

が簡単に使えると、ブログとしての表現力がグッと増しますよね。

### `remark-directive`と`remark-directive-rehype`でカスタムタグを使う

- [remark-directive](https://github.com/remarkjs/remark-directive)はコロン(`:`)を使ったカスタムディレクティブを解釈できるようにする remark プラグインです。
- [remark-directive-rehype](https://github.com/IGassmann/remark-directive-rehype)は remark-directive が解釈したカスタムディレクティブを[remark-rehype](https://github.com/remarkjs/remark-rehype)に橋渡ししてくれるプラグインです。
  - `remark-rehype`は Contentlayer が中で使っています。

```bash
npm install remark-directive remark-directive-rehype
```

```typescript
import remarkDirective from 'remark-directive'; // 追加
import remarkDirectiveRehype from 'remark-directive-rehype'; // 追加
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [
      remarkDirective, // 追加
      remarkDirectiveRehype, // 追加
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ]
  },
});
```

- これが

```markdown
## Content1

:tag-warning[注意タグ]

## Content2

:note-error[エラーノート]
```

- こうなります

```html
<h2 id="content1">Content1
  <a aria-hidden="true" tabindex="-1" href="#content1">
    <span class="icon icon-link"></span>
  </a>
</h2>
<p><tag-warning>注意タグ</tag-warning></p>
<h2 id="content2">Content2
    <a aria-hidden="true" tabindex="-1" href="#content2">
    <span class="icon icon-link"></span>
  </a>
</h2>
<note-error>
	<p>error / エラー</p>
</note-error>
```

- これらは html タグではないのですが、ブラウザがいい感じに解釈して表示してくれます。
  - 甘えたくない場合は、カスタム要素を定義しておきましょう。

```javascript
class TagWaning extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'tag-warning');
    this.shadowRoot.append(wrapper);
  }
}
customElements.define('tag-warning', TagWaning);
```

```javascript
class NoteError extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<slot></slot>';
    wrapper.setAttribute('class', 'note-error');
    this.shadowRoot.append(wrapper);
  }
}
customElements.define('note-error', NoteError);
```

## GitHub Flavored Markdown

- 我々プログラマーは Markdown と称して息をするように GFM (**のようなもの**)を書いており、`~~`で打ち消し線が書けないと頭がおかしくなります。
  - 安心してください。[`remark-gfm`](https://github.com/remarkjs/remark-gfm)があります。

```bash
npm install remark-gfm
```

```typescript
import remarkGfm from 'remark-gfm'; // 追加
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkDirectiveRehype,
      remarkGfm, // 追加
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ]
  },
});
```

- めんどくさくなってきたので例は割愛しますが、これで`~~`が打ち消し線になり、表も書けるようになります。

## コードブロック

- プログラミングブログであるならば、コードブロックはきれいに表示したいですよね。
  - [`rehype-pretty-code`](https://github.com/atomiks/rehype-pretty-code)できれいにしましょう。
  - rehype-pretty-code は[Shiki](https://github.com/shikijs/shiki)を使ってコードブロックを装飾してくれます。

```bash
npm install rehype-pretty-code shiki
```

```typescript
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code'; // 追加

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkDirectiveRehype,
      remarkGfm,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, { theme: 'rose-pine-moon' }],// 追加
    ]
  },
});
```

- これでコードブロックにスタイルが当たるようになります。
  - テーマは Shiki のプリセットから選べます。[参考](https://unpkg.com/browse/shiki@0.14.2/themes/)

## 終わりに

- ずいぶん長い記事になってしまいました。
  - Contentlayer は自由度が高くて扱いやすいので、Next.js + Markdown でブログを作るならおすすめです。
