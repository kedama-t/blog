'use client';

import { getRandomBreadEmoji } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BreadCrumbs() {
  const pathName = usePathname().split('/').slice(1);
  return (
    <nav className="flex flex-row flex-wrap gap-2">
      <Link href="/">
        <p suppressHydrationWarning={true}>{getRandomBreadEmoji()}</p>
      </Link>
      {pathName.map((path, index) => (
        <p key={index}>
          &#47;&nbsp;
          <Link
            suppressHydrationWarning={true}
            href={`/${pathName.slice(0, index + 1).join('/')}`}
          >
            {getRandomBreadEmoji()}&nbsp;{path}
          </Link>
        </p>
      ))}
    </nav>
  );
}
