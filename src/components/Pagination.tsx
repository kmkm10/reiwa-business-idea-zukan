import Link from "next/link";

function pageHref(basePath: string, page: number): string {
  if (page === 1) return basePath === "" ? "/" : basePath;
  return `${basePath}/page/${page}`;
}

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={pageHref(basePath, currentPage - 1)} className="retro-tag">
          ◀ 前へ
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={pageHref(basePath, page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={page === currentPage ? "retro-tag retro-tag-active" : "retro-tag"}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={pageHref(basePath, currentPage + 1)} className="retro-tag">
          次へ ▶
        </Link>
      )}
    </nav>
  );
}
