# 令和ビジネスアイデア図鑑

新時代を生きるぜ。今すぐ挑戦できるビジネスアイデアを集めたメディア。

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 を開いてください。

## 記事の追加方法

`content/articles/` に Markdown ファイル（`.md`）を1つ追加するだけで記事が公開されます。ファイル名がそのまま記事のURL（スラッグ）になります。

例: `content/articles/my-new-idea.md`

```markdown
---
title: "記事タイトル"
date: "2026-08-24"
tags: ["AI", "マーケティング"]
excerpt: "一覧ページに表示される要約文。"
---

ここから本文をMarkdownで書きます。見出しやリスト、リンクなどが使えます。
```

- `tags` に指定した文字列は自動的にタグページ（`/tags/タグ名`）に紐づきます。
- ビルド時に `content/articles/` 内の全 `.md` ファイルが自動で読み込まれるため、コードの変更は不要です。

## 構成

- `content/articles/*.md` — 記事本体（frontmatter + Markdown）
- `src/lib/articles.ts` — 記事の読み込み・タグ集計・Markdown→HTML変換
- `src/app/` — ページ（トップ、記事詳細、タグ一覧、タグ別記事一覧）
- `src/components/Header.tsx` — レトロ調のテキストロゴ・ヘッダー
