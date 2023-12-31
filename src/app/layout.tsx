import './globals.css';
import Theme from '@/components/Theme/index';
import {
  TITLE,
  DESCRIPTION,
  CATEGORIES,
  AUTHOR,
  GITHUB_USERID,
  QIITA_USERID,
} from '@/lib/const';
import Link from 'next/link';
import { getRandomBreadEmoji } from '@/lib/utils';
import { SiQiita, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';

import { Roboto_Mono, Noto_Sans_JP, Poppins } from 'next/font/google';

const bodyFont = Noto_Sans_JP({
  display: 'swap',
  weight: ['400', '500', '700', '800'],
  variable: '--font-body',
  preload: false,
});
const asciiFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-ascii',
  preload: false,
});
const codeFont = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  preload: false,
});

import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: `${getRandomBreadEmoji()} ${TITLE} | ${DESCRIPTION}`,
  description: '毛玉Tのブログ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bread = getRandomBreadEmoji();
  return (
    <html lang="ja">
      <Script src="/scripts/tagDirectives.js" />
      <Script src="/scripts/noteDirectives.js" />
      <body
        className={`${asciiFont.variable} ${bodyFont.variable} ${codeFont.variable}`}
      >
        <Theme>
          <Theme.Provider className="min-h-screen overflow-hidden">
            <nav
              className="nav-bg fixed inset-x-0 top-0 flex h-12 flex-row
            justify-between border-b-2 border-primary-300 p-2 px-4 shadow-2xl"
            >
              <Link href="/">
                <h1 className="nav-button hidden h-8 w-80 text-2xl font-bold lg:block">
                  {bread}&nbsp;{TITLE}
                </h1>
                <div className="nav-button block h-8 w-16 text-xl font-bold lg:hidden">
                  {bread}
                </div>
              </Link>
              <div className="flex flex-row gap-6">
                {Array.from(CATEGORIES).map((pair) => (
                  <div
                    key={pair[0]}
                    className="mt-1 font-bold text-on-primary-200"
                  >
                    <Link href={`/posts/${pair[0]}`}>
                      {CATEGORIES.get(pair[0])}
                    </Link>
                  </div>
                ))}
              </div>
              <Theme.Switcher
                className="nav-button block h-8 w-16 text-lg font-normal lg:hidden"
                nameOnLight="🌆"
                nameOnDark="🌅"
              />
              <Theme.Switcher
                className="nav-button hidden h-8 w-64 text-lg font-normal lg:block"
                nameOnLight="🌆Dark mode"
                nameOnDark="🌅Light mode"
              />
            </nav>

            <main className="mx-auto max-w-xl px-8 py-16 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
              {children}
            </main>

            <nav
              className="nav-bg fixed inset-x-0 bottom-0 flex h-12 flex-row
            justify-center gap-8 border-t-2 border-primary-300 px-4 pt-2 text-on-primary-200"
            >
              <p className="mt-1.5 text-sm">&copy; {AUTHOR}</p>
              <div className="flex flex-row gap-2">
                <p className="mt-1.5 hidden text-sm md:block">Visit me on </p>
                <Link href={`https://github.com/${GITHUB_USERID}`}>
                  <FaGithub size="2em" />
                </Link>
                <Link href={`https://qiita.com/${QIITA_USERID}`}>
                  <SiQiita size="2em" />
                </Link>
              </div>
              <div className="flex flex-row gap-2">
                <p className="mt-1.5 hidden text-sm md:block">Powered by </p>
                <Link href="https://nextjs.org/">
                  <SiNextdotjs size="2em" />
                </Link>
                <Link href="https://tailwindcss.com/">
                  <SiTailwindcss size="2em" />
                </Link>
              </div>
            </nav>
          </Theme.Provider>
        </Theme>
      </body>
    </html>
  );
}
