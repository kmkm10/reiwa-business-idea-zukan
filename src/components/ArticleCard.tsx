import Link from "next/link";
import type { Article } from "@/lib/articles";
import TagBadge from "./TagBadge";

export default function ArticleCard({
  article,
  isNew = false,
}: {
  article: Article;
  isNew?: boolean;
}) {
  return (
    <article className="retro-card">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {isNew && <span className="retro-badge-new blink">NEW!</span>}
        {article.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <h2 className="text-lg font-bold">
        <Link href={`/articles/${article.slug}`} className="text-[var(--link)] hover:text-[var(--link-active)]">
          ▼ {article.title}
        </Link>
      </h2>
      {article.excerpt && <p className="mt-2 text-sm text-black">{article.excerpt}</p>}
      {article.date && (
        <time className="mt-3 block text-xs text-black/50">更新日: {article.date}</time>
      )}
    </article>
  );
}
