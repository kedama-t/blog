import { SiQiita } from 'react-icons/si';
import { FaHeart, FaGetPocket, FaEye, FaExternalLinkAlt } from 'react-icons/fa';

export default function QiitaArticleCard(props: {
  title: string;
  date: string;
  pageViews: number;
  likes: number;
  stocks: number;
}) {
  const { title, date, pageViews, likes, stocks } = props;
  return (
    <article className="card">
      <h3 className="border-b border-secondary text-xl font-extrabold text-on-secondary-50">
        <SiQiita />
        {title}
        <FaExternalLinkAlt className="inline-block pl-2" />
      </h3>
      <div className="flex flex-row justify-between">
        <time className="mt-1 text-sm text-primary-600">
          {date.slice(0, 10)}
        </time>
        <div className="flex flex-row gap-2 text-primary-600">
          <FaEye className="mt-1" />
          <div>{pageViews}</div>
          <FaHeart className="mt-1" />
          <div>{likes}</div>
          <FaGetPocket className="mt-1" />
          <div>{stocks}</div>
        </div>
      </div>
    </article>
  );
}
