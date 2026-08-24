import Link from "next/link";
import { getArticlesByTag, getLatestArticleSlugs, paginate } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";

export default function TagArticleList({ tag, page }: { tag: string; page: number }) {
  const allArticles = getArticlesByTag(tag);
  const latestSlugs = getLatestArticleSlugs(3);
  const { items: articles, currentPage, totalPages } = paginate(allArticles, page);

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

      <Pagination
        basePath={`/tags/${encodeURIComponent(tag)}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
