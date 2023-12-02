'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type ThemeComponents = {
  (props: { children: ReactNode }): JSX.Element;
  Provider: (props: { children: ReactNode; className?: string }) => JSX.Element;
  Switcher: (props?: {
    className?: string;
    nameOnLight?: string;
    nameOnDark?: string;
  }) => JSX.Element;
};

export const ThemeContext = createContext({
  isDark: false,
  setIsDark: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

const Theme = (props: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(useContext(ThemeContext).isDark);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default Theme as ThemeComponents;
