import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'blog/posts');

/**
 * Get all post slugs from the posts directory
 */
export function getAllPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory not found: ${postsDirectory}`);
      return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get post data by slug
 * @param {string} slug - The post slug (filename without .md)
 * @returns {Promise<Object>} Post data including metadata and HTML content
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${fullPath}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse frontmatter
  const { data, content } = matter(fileContents);

  // Calculate reading time
  const stats = readingTime(content);

  // Process markdown to HTML with syntax highlighting
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);
  
  const contentHtml = String(processedContent);

  // Generate table of contents
  const toc = generateTableOfContents(content);

  return {
    slug,
    content: contentHtml,
    toc,
    readingTime: stats.text,
    ...data,
  };
}

/**
 * Get all posts sorted by date (most recent first)
 */
export async function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  // Sort posts by date
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Generate table of contents from markdown content
 * @param {string} markdown - Raw markdown content
 * @returns {Array} Array of heading objects with text, level, and id
 */
function generateTableOfContents(markdown) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({
      id,
      text,
      level,
    });
  }

  return toc;
}

/**
 * Get posts filtered by tag
 * @param {string} tag - Tag to filter by
 */
export async function getPostsByTag(tag) {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags() {
  const allPosts = await getAllPosts();
  const tags = new Set();
  
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}
