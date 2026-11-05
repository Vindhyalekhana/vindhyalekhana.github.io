'use client'

import { useEffect, useState } from 'react'
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

export default function WorkPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [readme, setReadme] = useState<string | null>(null)
  const [readmeLoading, setReadmeLoading] = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/users/Vindhyalekhana/repos?sort=updated&per_page=100')
      .then(r => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then(data => {
        if (Array.isArray(data)) setRepos(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const openModal = (repo: GitHubRepo) => {
    setSelectedRepo(repo)
    setReadme(null)
    setReadmeLoading(true)
    document.body.style.overflow = 'hidden'

    fetch(`https://api.github.com/repos/Vindhyalekhana/${repo.name}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.html' },
    })
      .then(r => {
        if (!r.ok) return null
        return r.text()
      })
      .then(html => {
        setReadme(html)
        setReadmeLoading(false)
      })
      .catch(() => {
        setReadmeLoading(false)
      })
  }

  const closeModal = () => {
    setSelectedRepo(null)
    document.body.style.overflow = 'auto'
  }

  const featured = repos.filter(r => r.stargazers_count > 0)
  const regular = repos.filter(r => r.stargazers_count === 0)

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

  const RepoCard = ({ repo, isFeatured }: { repo: GitHubRepo; isFeatured: boolean }) => (
    <div
      onClick={() => openModal(repo)}
      style={{
        background: isFeatured ? 'var(--blue-light)' : 'var(--white)',
        borderRadius: 24,
        padding: isFeatured ? 40 : 32,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isFeatured ? '0 20px 40px rgba(0,0,0,0.06)' : '0 10px 30px rgba(0,0,0,0.04)',
        border: isFeatured ? '1px solid rgba(37,99,235,0.1)' : '1px solid rgba(0,0,0,0.05)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = isFeatured ? '0 20px 40px rgba(0,0,0,0.06)' : '0 10px 30px rgba(0,0,0,0.04)' }}
    >
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ marginBottom: 12, fontSize: isFeatured ? 32 : 22, fontWeight: 700, color: 'var(--black)', wordBreak: 'break-word' }}>
          <i className="fa-brands fa-github" style={{ marginRight: 8 }}></i>{repo.name}
        </h2>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
          <i className="fa-regular fa-clock"></i> Updated: {formatDate(repo.updated_at)}
        </span>
      </div>

      <p style={{ marginBottom: 28, fontSize: 16, lineHeight: 1.6, color: 'var(--text-dark)', flex: 1 }}>
        {repo.description || 'No description provided for this repository.'}
      </p>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, fontSize: 14, fontWeight: 600 }}>
        {repo.stargazers_count > 0 && <span style={{ color: '#f59e0b' }}><i className="fa-solid fa-star"></i> {repo.stargazers_count}</span>}
        {repo.forks_count > 0 && <span style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-code-fork"></i> {repo.forks_count}</span>}
      </div>

      {(repo.language || repo.topics.length > 0) && (
        <div className="tags" style={{ marginBottom: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {repo.language && <span className="tag" style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,0.05)', color: 'var(--black)', fontWeight: 600 }}>{repo.language}</span>}
          {repo.topics.map(t => <span key={t} className="tag" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--text-muted)' }}>{t}</span>)}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 'auto', flexWrap: 'wrap' }}>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={isFeatured ? 'btn btn-primary' : 'btn btn-dark'}
          style={{ padding: '12px 24px', fontSize: 15, borderRadius: 100 }}
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
            style={{ padding: '12px 24px', fontSize: 15, borderRadius: 100, border: '2px solid var(--black)', color: 'var(--black)' }}
          >
            Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <PageLayout>
      <div className="page-header" style={{ padding: '100px 20px 60px', textAlign: 'center', background: 'var(--blue-light)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--black)' }}>My Projects</h1>
        <p style={{ fontSize: 20, color: 'var(--text-muted)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
          A detailed look into the scalable applications, intelligent systems, and impactful digital experiences I&apos;ve built.
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <i className="fa-solid fa-spinner fa-spin fa-3x" style={{ color: 'var(--primary-blue)', marginBottom: 24 }}></i>
          <p style={{ fontSize: 18 }}>Fetching repositories from GitHub...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: '#dc2626' }}>
          <i className="fa-solid fa-circle-exclamation fa-2x" style={{ marginBottom: 16 }}></i>
          <p>Failed to load repositories from GitHub.</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {featured.length > 0 && (
            <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
              <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontSize: 32, marginBottom: 40, color: 'var(--black)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fa-solid fa-star" style={{ color: '#f59e0b' }}></i> Featured Projects
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
                  {featured.map(repo => <RepoCard key={repo.id} repo={repo} isFeatured={true} />)}
                </div>
              </div>
            </section>
          )}

          <section style={{ padding: '80px 24px', background: 'var(--gray-light)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h2 style={{ fontSize: 32, marginBottom: 40, color: 'var(--black)' }}>
                {featured.length > 0 ? 'Other Projects' : 'All Projects'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 32 }}>
                {regular.length === 0
                  ? <p style={{ textAlign: 'center', fontSize: 18, padding: '40px', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>No other projects found.</p>
                  : regular.map(repo => <RepoCard key={repo.id} repo={repo} isFeatured={false} />)
                }
              </div>
            </div>
          </section>
        </>
      )}

      {/* Modal */}
      {selectedRepo && (
        <div
          className="modal-overlay active"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="modal-container">
            <button className="modal-close" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
            <div className="modal-header">
              <h2 id="modal-title" style={{ fontSize: 32, fontWeight: 700, color: 'var(--black)', marginBottom: 8 }}>{selectedRepo.name}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {selectedRepo.language && <span className="tag" style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,0.05)', color: 'var(--black)', fontWeight: 600 }}>{selectedRepo.language}</span>}
                {selectedRepo.topics.map(t => <span key={t} className="tag" style={{ background: 'rgba(0,0,0,0.03)', color: 'var(--text-muted)' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href={selectedRepo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ padding: '10px 20px', fontSize: 14, borderRadius: 100 }}>
                  Source Code <i className="fa-brands fa-github"></i>
                </a>
                {selectedRepo.homepage && (
                  <a href={selectedRepo.homepage} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14, borderRadius: 100, border: '2px solid var(--black)', color: 'var(--black)' }}>
                    Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                )}
              </div>
            </div>
            <div className="modal-content-area">
              <div className="markdown-body">
                {readmeLoading ? (
                  <div style={{ textAlign: 'center', padding: 40 }}>
                    <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: 'var(--primary-blue)' }}></i>
                    <p style={{ marginTop: 16, color: 'var(--text-muted)' }}>Loading README from GitHub...</p>
                  </div>
                ) : readme ? (
                  <div dangerouslySetInnerHTML={{ __html: readme }} />
                ) : (
                  <div style={{ textAlign: 'center', padding: 60 }}>
                    <i className="fa-brands fa-github fa-3x" style={{ marginBottom: 16 }}></i>
                    <h3 style={{ marginBottom: 8 }}>No README found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>This repository doesn&apos;t have a README.md file.</p>
                    {selectedRepo.description && <p style={{ marginTop: 24 }}>{selectedRepo.description}</p>}
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

