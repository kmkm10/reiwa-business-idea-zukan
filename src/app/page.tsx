import Link from "next/link";
import { getAllArticles, getAllTags } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import TagBadge from "@/components/TagBadge";

export default function Home() {
  const articles = getAllArticles();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {tags.length > 0 && (
        <section className="retro-window mb-8">
          <div className="retro-titlebar">
            <span>◆ タグ一覧 ◆</span>
          </div>
          <div className="retro-window-body flex flex-wrap gap-2">
            {tags.map(({ tag }) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </section>
      )}

      <section className="retro-window">
        <div className="retro-titlebar">
          <span>◆ 最新記事一覧 ◆</span>
        </div>
        <div className="retro-window-body grid gap-4 sm:grid-cols-2">
          {articles.length === 0 ? (
            <p className="col-span-full text-black/60">
              記事はまだありません。<code>content/articles/</code>
              にMarkdownファイルを追加してください。
            </p>
          ) : (
            articles.map((article) => <ArticleCard key={article.slug} article={article} />)
          )}
        </div>
      </section>

      {tags.length > 0 && (
        <div className="mt-8 text-center">
          <Link href="/tags" className="font-bold underline">
            ▶ すべてのタグを見る
          </Link>
        </div>
      )}
    </div>
  );
}
