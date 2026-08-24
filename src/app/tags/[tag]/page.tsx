import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTags, getArticlesByTag, getLatestArticleSlugs } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `【${decodeURIComponent(tag)}】の記事 | 令和ビジネスアイデア図鑑` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const articles = getArticlesByTag(tag);
  const latestSlugs = getLatestArticleSlugs(3);

  if (articles.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="font-bold underline">
        ◀ 記事一覧に戻る
      </Link>

      <section className="retro-window mt-4">
        <div className="retro-titlebar">
          <span>◆ 【{tag}】の記事 ◆</span>
        </div>
        <div className="retro-window-body grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              isNew={latestSlugs.has(article.slug)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
