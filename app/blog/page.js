import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog | MailGoat',
  description: 'Building email for AI agents, in public.',
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1>MailGoat Blog</h1>
        <p className={styles.subtitle}>
          Building email for AI agents, in public. 🐐
        </p>
      </header>

      <div className={styles.posts}>
        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet. Check back soon!</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className={styles.post}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <h2>{post.title}</h2>
                {post.excerpt && (
                  <p className={styles.excerpt}>{post.excerpt}</p>
                )}
                <div className={styles.meta}>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.author && <span> • {post.author}</span>}
                  {post.readingTime && <span> • {post.readingTime}</span>}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
