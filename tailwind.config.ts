import type { Config } from 'tailwindcss';
import { createThemes } from 'tw-colors';
import generateColorScales from './generateColorScales';

const commonColors = {
  notice: '#99cc33',
  warning: '#ffcc00',
  error: '#cc3300',
};

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [
    createThemes({
      light: {
        ...generateColorScales({
          primary: '#D69E02',
          secondary: '#994D1C',
          tertiary: '#9ED0E6',
          ...commonColors,
        }),
      },
      dark: {
        ...generateColorScales(
          {
            primary: '#FEC260',
            secondary: '#994D1C',
            tertiary: '#2C698D',
            ...commonColors,
          },
          true
        ),
      },
    }),
  ],
};
export default config;
