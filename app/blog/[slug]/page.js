import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown';
import styles from './post.module.css';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  return {
    title: `${post.title} | MailGoat Blog`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPost(props) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
        <h1>{post.title}</h1>
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
      </header>

      {post.toc && post.toc.length > 0 && (
        <aside className={styles.toc}>
          <h3>Table of Contents</h3>
          <ul>
            {post.toc.map((item) => (
              <li key={item.id} className={styles[`toc-level-${item.level}`]}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <article className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
