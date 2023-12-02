'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/Theme/Theme';

export default function Switcher(props?: {
  className?: string;
  nameOnLight?: string;
  nameOnDark?: string;
}) {
  const className =
    props?.className ??
    'mx-auto rounded-xl bg-primary px-4 py-2 font-bold uppercase text-on-primary shadow-xl';
  const nameOnLight = props?.nameOnLight ?? 'Switch to dark theme.';
  const nameOnDark = props?.nameOnDark ?? 'Switch to light theme.';

  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <button
      className={className}
      onClick={() => {
        setIsDark(!isDark);
      }}
    >
      {isDark ? nameOnDark : nameOnLight}
    </button>
  );
}
