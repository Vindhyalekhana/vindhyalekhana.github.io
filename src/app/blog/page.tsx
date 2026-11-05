import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Blog & Articles — Vindhya Lekhana',
}

const posts = [
  {
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop',
    alt: 'Coding setup',
    date: 'March 15, 2026',
    title: 'The Future of AI in Software Engineering',
    excerpt: 'Exploring how artificial intelligence is shaping the way developers write, test, and deploy code in modern web applications.',
  },
  {
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop',
    alt: 'Laptop',
    date: 'February 28, 2026',
    title: 'Building Scalable Node.js APIs',
    excerpt: 'A comprehensive guide to structuring and optimizing your Express backend for enterprise-level traffic and performance.',
  },
  {
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop',
    alt: 'Design',
    date: 'January 10, 2026',
    title: 'Bridging the Gap: Developer to UI/UX',
    excerpt: 'Why full-stack engineers should learn fundamental design principles to build better user experiences.',
  },
]

export default function BlogPage() {
  return (
    <PageLayout>
      <div className="page-header">
        <h1>Blog &amp; Articles</h1>
        <p>Thoughts on full stack development, software architecture, and technology trends.</p>
      </div>

      <section className="blog-grid">
        {posts.map((post, i) => (
          <article key={i} className="blog-card animate-up">
            <Image
              src={post.img}
              alt={post.alt}
              width={600}
              height={200}
              className="blog-img"
              style={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
            <div className="blog-content">
              <span className="blog-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>{post.excerpt}</p>
              <Link href="#" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 14 }}>Read More</Link>
            </div>
          </article>
        ))}
      </section>
    </PageLayout>
  )
}

