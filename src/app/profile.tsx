import { AUTHOR, GITHUB_USERID } from '@/lib/const';
import Link from 'next/link';
import {
  SiCsharp,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiFirebase,
  SiStackblitz,
  SiMicrosoftsqlserver,
  SiSqlite,
  SiGit,
  SiVisualstudiocode,
  SiNeovim,
} from 'react-icons/si';

export default function Profile() {
  return (
    <div className="flex flex-row gap-4 rounded-xl bg-primary-200 p-4">
      <Link href={`https://github.com/${GITHUB_USERID}`}>
        <img src="./avatar.jpg" className="block h-20 w-20 rounded-xl" />
      </Link>
      <div className="flex flex-col justify-between">
        <p className="text-xl font-bold">{AUTHOR}</p>
        <p className="text-sm text-primary-700">Software Developer</p>
        <div className="flex flex-row flex-wrap gap-2 text-primary-700">
          <SiStackblitz title="Stackblitz" />
          <SiJavascript title="JavaScript" />
          <SiTypescript title="TypeScript" />
          <SiReact title="React" />
          <SiNextdotjs title="Next.js" />
          <SiTailwindcss title="Tailwind CSS" />
          <SiExpress title="Express.js" />
          <SiFirebase title="Firebase" />
          <SiCsharp title="C#" />
          <SiMicrosoftsqlserver title="SQL Server" />
          <SiSqlite title="SQLite" />
          <SiGit title="Git" />
          <SiVisualstudiocode title="VSCode" />
          <SiNeovim title="Neovim" />
        </div>
      </div>
    </div>
  );
}
