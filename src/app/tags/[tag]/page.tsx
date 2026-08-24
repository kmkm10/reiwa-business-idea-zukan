import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTags, getArticlesByTag } from "@/lib/articles";
import TagArticleList from "@/components/TagArticleList";

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

  if (getArticlesByTag(tag).length === 0) notFound();

  return <TagArticleList tag={tag} page={1} />;
}
