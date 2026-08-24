import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, markdownToHtml } from "@/lib/articles";
import TagBadge from "@/components/TagBadge";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | 令和ビジネスアイデア図鑑`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const html = await markdownToHtml(article.content);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link href="/" className="font-bold underline">
        ◀ 記事一覧に戻る
      </Link>

      <article className="retro-window mt-4">
        <div className="retro-titlebar">
          <span>◆ {article.title} ◆</span>
        </div>
        <div className="retro-window-body">
          <div className="mb-3 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          {article.date && (
            <time className="mb-4 block text-xs text-black/50">更新日: {article.date}</time>
          )}

          <div
            className="retro-article"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>
    </div>
  );
}
