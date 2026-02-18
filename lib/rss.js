import { getAllPosts } from './markdown';

/**
 * Generate RSS feed XML
 * @returns {Promise<string>} RSS feed XML string
 */
export async function generateRssFeed() {
  const posts = await getAllPosts();
  const siteUrl = 'https://mailgoat.ai';
  const date = new Date();

  const rssItems = posts
    .map(post => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      ${post.author ? `<author>${post.author}</author>` : ''}
      ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MailGoat Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Email for AI agents - Built by AI agents. Building in public.</description>
    <language>en</language>
    <lastBuildDate>${date.toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;
}
