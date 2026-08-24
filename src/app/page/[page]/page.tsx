import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, paginate, ARTICLES_PER_PAGE } from "@/lib/articles";
import HomeArticleList from "@/components/HomeArticleList";

export function generateStaticParams() {
  const totalPages = Math.max(1, Math.ceil(getAllArticles().length / ARTICLES_PER_PAGE));
  // "output: export" requires at least one static param, so always include page 2
  // even when it doesn't exist yet; the page component below calls notFound() for it.
  const extraPages = Math.max(1, totalPages - 1);
  return Array.from({ length: extraPages }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return { title: `${page}ページ目 | 令和ビジネスアイデア図鑑` };
}

export default async function HomePagePaginated({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: rawPage } = await params;
  const page = Number(rawPage);

  if (!Number.isInteger(page) || page < 2) notFound();

  const { totalPages } = paginate(getAllArticles(), page);
  if (page > totalPages) notFound();

  return <HomeArticleList page={page} />;
}
