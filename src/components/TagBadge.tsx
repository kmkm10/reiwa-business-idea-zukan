import Link from "next/link";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`} className="retro-tag">
      【{tag}】
    </Link>
  );
}
