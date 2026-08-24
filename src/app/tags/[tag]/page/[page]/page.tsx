import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTags, getArticlesByTag, paginate, ARTICLES_PER_PAGE } from "@/lib/articles";
import TagArticleList from "@/components/TagArticleList";

export function generateStaticParams() {
  const params = getAllTags().flatMap(({ tag, count }) => {
    const totalPages = Math.max(1, Math.ceil(count / ARTICLES_PER_PAGE));
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      tag,
      page: String(i + 2),
    }));
  });

  if (params.length > 0) return params;

  // "output: export" requires at least one static param. When no tag has a
  // second page yet, fall back to a single dummy entry that the page
  // component below rejects via notFound().
  const [firstTag] = getAllTags();
  return [{ tag: firstTag?.tag ?? "_", page: "2" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string; page: string }>;
}): Promise<Metadata> {
  const { tag: rawTag, page } = await params;
  const tag = decodeURIComponent(rawTag);
  return { title: `【${tag}】の記事 ${page}ページ目 | 令和ビジネスアイデア図鑑` };
}

export default async function TagPagePaginated({
  params,
}: {
  params: Promise<{ tag: string; page: string }>;
}) {
  const { tag: rawTag, page: rawPage } = await params;
  const tag = decodeURIComponent(rawTag);
  const page = Number(rawPage);

  if (!Number.isInteger(page) || page < 2) notFound();

  const articles = getArticlesByTag(tag);
  if (articles.length === 0) notFound();

  const { totalPages } = paginate(articles, page);
  if (page > totalPages) notFound();

  return <TagArticleList tag={tag} page={page} />;
}
