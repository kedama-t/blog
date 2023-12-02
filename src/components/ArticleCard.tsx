import { CATEGORIES } from '@/lib/const';

export default function ArticleCard(props: {
  title: string;
  emoji: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
}) {
  const { title, emoji, date, description, category, tags } = props;
  return (
    <article className="card">
      <h3 className="border-b border-secondary text-xl font-extrabold text-on-secondary-50">
        <div className="flex flex-row justify-between">
          {emoji}&nbsp;{title}
          <div className="text-sm text-on-secondary-200">
            {category ? CATEGORIES.get(category) : ''}
          </div>
        </div>
      </h3>
      <time className="text-sm text-primary-600">{date.slice(0, 10)}</time>
      {description && (
        <p className="text-sm text-on-secondary-300">{description}</p>
      )}
    </article>
  );
}
