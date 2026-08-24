import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  image?: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
};

function readArticleFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith(".md"));
}

function parseArticleFile(fileName: string): Article {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(ARTICLES_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? "",
    image: data.image,
    content,
  };
}

export function getAllArticles(): Article[] {
  return readArticleFiles()
    .map(parseArticleFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const fileName = `${slug}.md`;
  if (!fs.existsSync(path.join(ARTICLES_DIR, fileName))) return null;
  return parseArticleFile(fileName);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const article of getAllArticles()) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

export function getLatestArticleSlugs(count = 3): Set<string> {
  return new Set(getAllArticles().slice(0, count).map((article) => article.slug));
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
