import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="retro-titlebar">
        <span>令和ビジネスアイデア図鑑 - 新時代を生きるぜ</span>
        <span className="retro-btn-dots">
          <span>_</span>
          <span>□</span>
          <span>×</span>
        </span>
      </div>

      <div className="bg-white px-6 py-6 text-center">
        <Link href="/" className="inline-block">
          <div className="retro-logo-title">
            <span className="blink retro-logo-star">☆</span>
            <span className="retro-logo-spark">令和</span>{" "}
            <span className="retro-logo-next">ビジネスアイデア図鑑</span>
            <span className="blink retro-logo-star">☆</span>
          </div>
          <div className="retro-logo-sub">～ 新時代を生きるぜ ～</div>
        </Link>
      </div>

      <div className="marquee-track bg-black py-1">
        <span className="text-sm font-bold text-yellow-300">
          ようこそ！令和ビジネスアイデア図鑑へ★★★ 新時代を生きるぜ！今すぐ挑戦できるビジネスアイデアが満載！
          相互リンク＆情報提供、いつでも大募集中です☆
        </span>
      </div>

      <hr className="rainbow-rule" />
    </header>
  );
}
