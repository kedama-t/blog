'use client';

import { ReactNode, useContext } from 'react';
import { ThemeContext } from '@/components/Theme/Theme';

export default function Provider(props: {
  children: ReactNode;
  className?: string;
}) {
  const className = props.className ?? '';
  const { isDark } = useContext(ThemeContext);
  return (
    <div
      className={`${
        isDark ? 'dark' : 'light'
      } bg-primary-50 text-on-primary-50 ${className}`}
    >
      {props.children}
    </div>
  );
}
