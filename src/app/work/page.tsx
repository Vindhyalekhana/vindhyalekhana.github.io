'use client'

import { useEffect, useState, useCallback } from 'react'
import PageLayout from '@/components/PageLayout'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  homepage: string | null
  topics: string[]
}

/* ─── Curated Fallback Projects (Guarantees page never fails due to GitHub API rate limits) ─── */
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'Last-Mile-Delivery-with-Deadlines',
    description:
      'Last-Mile Delivery with Deadlines is an optimization system designed to plan delivery routes while considering strict deadlines, vehicle capacities, and heuristics.',
    html_url: 'https://github.com/Vindhyalekhana/Last-Mile-Delivery-with-Deadlines',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-11-06T12:00:00Z',
    homepage: null,
    topics: ['route-optimization', 'heuristics', 'python', 'algorithms'],
  },
  {
    id: 102,
    name: 'LibraX',
    description:
      'Enterprise Digital Library Management System with role-based access control, book catalog tracking, student memberships, and borrowing analytics.',
    html_url: 'https://github.com/Vindhyalekhana/LibraX',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-11-05T12:00:00Z',
    homepage: null,
    topics: ['library-management', 'nodejs', 'mysql', 'full-stack', 'system-design'],
  },
  {
    id: 103,
    name: 'vindhyalekhana.github.io',
    description:
      'Personal developer portfolio and interactive showcase built with Next.js App Router, modern UI engineering, and verified credentials.',
    html_url: 'https://github.com/Vindhyalekhana/vindhyalekhana.github.io',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-06T12:00:00Z',
    homepage: 'https://vindhyalekhana.github.io',
    topics: ['portfolio', 'nextjs', 'react', 'responsive-design'],
  },
  {
    id: 104,
    name: 'Encrypted-Chat-Application',
    description:
      'The Encrypted Chat Application is a client-server based secure messaging system developed using Python, socket programming, and cryptographic protocols.',
    html_url: 'https://github.com/Vindhyalekhana/Encrypted-Chat-Application',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-10T12:00:00Z',
    homepage: null,
    topics: ['cryptography', 'security', 'socket-programming', 'python'],
  },
  {
    id: 105,
    name: 'FixMyCampus',
    description:
      'Campus complaint management and communication platform enabling students to report, categorize, and track campus facility issues with automated routing.',
    html_url: 'https://github.com/Vindhyalekhana/FixMyCampus',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-01T12:00:00Z',
    homepage: null,
    topics: ['expressjs', 'mongodb', 'rest-api', 'campus-management'],
  },
  {
    id: 106,
    name: 'Restaurant-Management-System',
    description:
      'Web-based restaurant reservation, table scheduling, menu customization, and automated billing portal for dining establishments.',
    html_url: 'https://github.com/Vindhyalekhana/Restaurant-Management-System',
    language: 'PHP',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-15T12:00:00Z',
    homepage: null,
    topics: ['php', 'mysql', 'reservation-system', 'web-app'],
  },
]

export default function WorkPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS)
  const [loading, setLoading] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [readme, setReadme] = useState<string | null>(null)
  const [readmeLoading, setReadmeLoading] = useState(false)

  const fetchRepos = useCallback(async () => {
    try {
      // Check localStorage cache first
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('vindhya_gh_repos')
        const cachedTime = localStorage.getItem('vindhya_gh_time')
        if (cached && cachedTime && Date.now() - Number(cachedTime) < 3600000) {
          try {
            const parsed = JSON.parse(cached)
            if (Array.isArray(parsed) && parsed.length > 0) {
              setRepos(parsed)
            }
          } catch {
            // ignore cache parse error
          }
        }
      }

      const res = await fetch('https://api.github.com/users/Vindhyalekhana/repos?sort=updated&per_page=100')
      if (!res.ok) {
        // If GitHub rate limit (403) or error occurs, smoothly retain fallback/cached repos
        return
      }

      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const formatted: GitHubRepo[] = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count || 0,
          forks_count: r.forks_count || 0,
          updated_at: r.updated_at,
          homepage: r.homepage,
          topics: Array.isArray(r.topics) ? r.topics : [],
        }))
        setRepos(formatted)
        if (typeof window !== 'undefined') {
          localStorage.setItem('vindhya_gh_repos', JSON.stringify(formatted))
          localStorage.setItem('vindhya_gh_time', String(Date.now()))
        }
      }
    } catch {
      // On network failure, fallback data remains active seamlessly
    }
  }, [])

  useEffect(() => {
    fetchRepos()
  }, [fetchRepos])

  const openModal = async (repo: GitHubRepo) => {
    setSelectedRepo(repo)
    setReadme(null)
    setReadmeLoading(true)
    document.body.style.overflow = 'hidden'

    try {
      const r = await fetch(`https://api.github.com/repos/Vindhyalekhana/${repo.name}/readme`, {
        headers: { Accept: 'application/vnd.github.v3.html' },
      })
      if (r.ok) {
        const html = await r.text()
        setReadme(html)
      } else {
        setReadme(null)
      }
    } catch {
      setReadme(null)
    } finally {
      setReadmeLoading(false)
    }
  }

  const closeModal = () => {
    setSelectedRepo(null)
    document.body.style.overflow = 'auto'
  }

  const featured = repos.filter(r => r.stargazers_count > 0)
  const regular = repos.filter(r => r.stargazers_count === 0)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

  const RepoCard = ({ repo, isFeatured }: { repo: GitHubRepo; isFeatured: boolean }) => (
    <div
      onClick={() => openModal(repo)}
      style={{
        background: isFeatured ? 'var(--blue-light)' : 'var(--white)',
        borderRadius: 24,
        padding: isFeatured ? 40 : 32,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isFeatured ? '0 20px 40px rgba(138,93,60,0.08)' : '0 10px 30px rgba(14,14,16,0.03)',
        border: isFeatured ? '1px solid rgba(138,93,60,0.3)' : '1px solid var(--gray-light)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 40px rgba(138,93,60,0.12)'
        el.style.borderColor = 'var(--primary-blue)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = isFeatured ? '0 20px 40px rgba(138,93,60,0.08)' : '0 10px 30px rgba(14,14,16,0.03)'
        el.style.borderColor = isFeatured ? 'rgba(138,93,60,0.3)' : 'var(--gray-light)'
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            marginBottom: 12,
            fontSize: isFeatured ? 32 : 22,
            fontWeight: 700,
            color: 'var(--black)',
            wordBreak: 'break-word',
            fontFamily: 'Georgia, serif',
          }}
        >
          <i className="fa-brands fa-github" style={{ marginRight: 10, color: 'var(--primary-blue)' }}></i>
          {repo.name}
        </h2>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
          <i className="fa-regular fa-clock" style={{ marginRight: 6 }}></i> Updated: {formatDate(repo.updated_at)}
        </span>
      </div>

      <p style={{ marginBottom: 28, fontSize: 16, lineHeight: 1.6, color: 'var(--text-dark)', flex: 1 }}>
        {repo.description || 'No description provided for this repository.'}
      </p>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, fontSize: 14, fontWeight: 600 }}>
        {repo.stargazers_count > 0 && (
          <span style={{ color: 'var(--primary-blue)' }}>
            <i className="fa-solid fa-star"></i> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span style={{ color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-code-fork"></i> {repo.forks_count}
          </span>
        )}
      </div>

      {(repo.language || repo.topics.length > 0) && (
        <div className="tags" style={{ marginBottom: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {repo.language && (
            <span
              className="tag"
              style={{
                background: 'var(--warm-ivory)',
                border: '1px solid var(--gray-light)',
                color: 'var(--black)',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: 100,
                fontSize: 13,
              }}
            >
              {repo.language}
            </span>
          )}
          {repo.topics.map(t => (
            <span
              key={t}
              className="tag"
              style={{
                background: 'rgba(14,14,16,0.03)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: 100,
                fontSize: 12,
                border: '1px solid var(--gray-light)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 'auto', flexWrap: 'wrap' }}>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={isFeatured ? 'btn btn-primary' : 'btn btn-dark'}
          style={{ padding: '12px 24px', fontSize: 14, borderRadius: 100 }}
        >
          Source Code <i className="fa-brands fa-github"></i>
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="btn btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: 14,
              borderRadius: 100,
              border: '2px solid var(--black)',
              color: 'var(--black)',
            }}
          >
            Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <PageLayout>
      {/* ── Separate Header Banner ── */}
      <div
        className="page-header"
        style={{
          padding: '100px 20px 60px',
          textAlign: 'center',
          background: 'var(--blue-light)',
          borderBottom: '1px solid var(--gray-light)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 16,
            color: 'var(--black)',
            fontFamily: 'Georgia, serif',
          }}
        >
          My Projects
        </h1>
        <p
          style={{
            fontSize: 20,
            color: 'var(--text-muted)',
            maxWidth: 800,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          A detailed look into the scalable applications, intelligent systems, and impactful digital experiences I&apos;ve built.
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <i className="fa-solid fa-spinner fa-spin fa-3x" style={{ color: 'var(--primary-blue)', marginBottom: 24 }}></i>
          <p style={{ fontSize: 18, color: 'var(--text-dark)' }}>Fetching repositories from GitHub...</p>
        </div>
      )}

      {/* Featured Projects Section */}
      {featured.length > 0 && (
        <section style={{ padding: '80px 24px', background: 'var(--white)', borderBottom: '1px solid var(--gray-light)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 32,
                marginBottom: 40,
                color: 'var(--black)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'Georgia, serif',
              }}
            >
              <i className="fa-solid fa-star" style={{ color: 'var(--primary-blue)' }}></i> Featured Projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
              {featured.map(repo => (
                <RepoCard key={repo.id} repo={repo} isFeatured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section style={{ padding: '80px 24px', background: 'var(--warm-ivory)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 32,
              marginBottom: 40,
              color: 'var(--black)',
              fontFamily: 'Georgia, serif',
            }}
          >
            {featured.length > 0 ? 'Other Projects' : 'All Projects'}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 32,
            }}
          >
            {regular.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: 18, padding: '40px', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
                No other projects found.
              </p>
            ) : (
              regular.map(repo => <RepoCard key={repo.id} repo={repo} isFeatured={false} />)
            )}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedRepo && (
        <div
          className="modal-overlay active"
          onClick={e => {
            if (e.target === e.currentTarget) closeModal()
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(14, 14, 16, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            className="modal-container"
            style={{
              width: '100%',
              maxWidth: 880,
              maxHeight: '90vh',
              backgroundColor: 'var(--white)',
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(14, 14, 16, 0.4)',
              border: '1px solid var(--gray-light)',
            }}
          >
            <div
              style={{
                padding: '24px 32px',
                borderBottom: '1px solid var(--gray-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div>
                <h2
                  id="modal-title"
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: 'var(--black)',
                    margin: '0 0 10px',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {selectedRepo.name}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {selectedRepo.language && (
                    <span
                      className="tag"
                      style={{
                        background: 'var(--warm-ivory)',
                        border: '1px solid var(--gray-light)',
                        color: 'var(--black)',
                        fontWeight: 600,
                        padding: '4px 12px',
                        borderRadius: 100,
                        fontSize: 13,
                      }}
                    >
                      {selectedRepo.language}
                    </span>
                  )}
                  {selectedRepo.topics.map(t => (
                    <span
                      key={t}
                      className="tag"
                      style={{
                        background: 'rgba(14,14,16,0.03)',
                        color: 'var(--text-muted)',
                        padding: '4px 10px',
                        borderRadius: 100,
                        fontSize: 12,
                        border: '1px solid var(--gray-light)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href={selectedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark"
                    style={{ padding: '10px 22px', fontSize: 14, borderRadius: 100 }}
                  >
                    View on GitHub <i className="fa-brands fa-github"></i>
                  </a>
                  {selectedRepo.homepage && (
                    <a
                      href={selectedRepo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        padding: '10px 22px',
                        fontSize: 14,
                        borderRadius: 100,
                        border: '2px solid var(--black)',
                        color: 'var(--black)',
                      }}
                    >
                      Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--gray-light)',
                  backgroundColor: 'var(--warm-ivory)',
                  color: 'var(--black)',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div
              className="modal-content-area"
              style={{ padding: '32px', overflowY: 'auto', flex: 1, backgroundColor: 'var(--warm-ivory)' }}
            >
              <div className="markdown-body">
                {readmeLoading ? (
                  <div style={{ textAlign: 'center', padding: 40 }}>
                    <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: 'var(--primary-blue)' }}></i>
                    <p style={{ marginTop: 16, color: 'var(--text-muted)' }}>Loading README from GitHub...</p>
                  </div>
                ) : readme ? (
                  <div dangerouslySetInnerHTML={{ __html: readme }} />
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: 48,
                      backgroundColor: 'var(--white)',
                      borderRadius: 20,
                      border: '1px solid var(--gray-light)',
                    }}
                  >
                    <i className="fa-brands fa-github fa-3x" style={{ marginBottom: 16, color: 'var(--primary-blue)' }}></i>
                    <h3 style={{ margin: '0 0 10px', color: 'var(--black)', fontFamily: 'Georgia, serif' }}>
                      {selectedRepo.name}
                    </h3>
                    <p style={{ color: 'var(--text-dark)', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.6, fontSize: 16 }}>
                      {selectedRepo.description || 'Architecture and implementation details available on GitHub.'}
                    </p>
                    <a
                      href={selectedRepo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-dark"
                      style={{ padding: '10px 24px', fontSize: 14, borderRadius: 100 }}
                    >
                      Explore Source Repository <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
