import type { Metadata } from "next";
import { getAllTags } from "@/lib/articles";
import TagBadge from "@/components/TagBadge";

export const metadata: Metadata = {
  title: "タグ一覧 | 令和ビジネスアイデア図鑑",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <section className="retro-window">
        <div className="retro-titlebar">
          <span>◆ タグ一覧 ◆</span>
        </div>
        <div className="retro-window-body">
          {tags.length === 0 ? (
            <p className="text-black/60">タグがまだありません。</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {tags.map(({ tag, count }) => (
                <span key={tag} className="flex items-center gap-1">
                  <TagBadge tag={tag} />
                  <span className="text-xs text-black/50">({count})</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
