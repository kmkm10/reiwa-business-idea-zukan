import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "令和ビジネスアイデア図鑑 | 新時代を生きるぜ",
  description:
    "令和ビジネスアイデア図鑑は、新時代を生きるための今すぐ挑戦できるビジネスアイデアを集めたメディアです。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <hr className="rainbow-rule" />
        <footer className="bg-[#ece9d8] py-6 text-center text-xs text-black">
          <p className="mb-2">
            <span className="retro-counter">あなたは 000128 人目の訪問者です</span>
          </p>
          <p>本サイトは 800×600 表示を推奨しています。相互リンク募集中！</p>
          <p>© {new Date().getFullYear()} 令和ビジネスアイデア図鑑 All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
