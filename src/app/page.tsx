'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const testimonials = [
  {
    quote:
      'I am happy to recommend Vindhya Lekhana. She is a dedicated and enthusiastic individual with a genuine interest in technology and a strong willingness to learn. Her curiosity, commitment to developing her skills, and interest in applying her knowledge to practical projects are qualities I appreciate. I believe Vindhya has the potential to grow into a skilled and dependable professional. Her positive attitude towards learning and openness to new challenges will serve her well in her career. I wish her continued success in her academic and professional journey.',
    name: 'Rishvin Reddy',
    role: 'LinkedIn Recommendation',
    linkedin: 'https://www.linkedin.com/in/rishvinreddy',
  },
]

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

export default function HomePage() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [repos, setRepos] = useState<GitHubRepo[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/Vindhyalekhana/repos?sort=updated&per_page=6')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data)
      })
      .catch(() => {})
  }, [])

  const prev = () => setCurrentQuote(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrentQuote(c => (c + 1) % testimonials.length)
  const t = testimonials[currentQuote]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section id="home" className="hero">
          <div className="hero-content">
            <div className="hero-text" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p className="greeting" style={{ fontSize: 'clamp(48px, 6vw, 76px)', fontWeight: 700, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--black)' }}>
                  Hey, I&apos;m<br />Vindhya Lekhana.
                </p>
                <h1 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, margin: 0, lineHeight: 1.3, color: 'var(--text-dark)' }}>
                  Building Scalable Software<br />Solutions for the Modern World
                </h1>
              </div>
              <p style={{ maxWidth: 600, margin: 0, fontSize: 20, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                Full Stack Developer specializing in Web Applications, System Design, AI Solutions, and Enterprise Software Development.
              </p>
              <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
                <a href="#works" className="btn btn-dark" style={{ padding: '18px 36px', fontSize: 18 }}>
                  View Projects <i className="fa-solid fa-arrow-right" style={{ marginLeft: 8 }}></i>
                </a>
                <Link href="/contact" className="btn btn-primary" style={{ background: 'white', padding: '18px 36px', fontSize: 18 }}>
                  Contact Me
                </Link>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-shape">
                <Image src="/profile.jpg" alt="Vindhya Lekhana Portrait" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} priority />
              </div>
              <div className="floating-tag tag-left">Full Stack Dev</div>
              <div className="floating-tag tag-right">Software Eng</div>
              <div className="stats-card">
                <div className="stats-text">
                  <span className="stats-title">Years Experience</span>
                  <span className="stats-subtitle">Learning &amp; Dev</span>
                </div>
                <span className="stats-number">2+</span>
              </div>
              <div className="stats-card stats-card-bottom blur-card">
                <div className="stats-text">
                  <span className="stats-title">Academic &amp; Personal</span>
                  <span className="stats-subtitle">Projects Completed</span>
                </div>
                <span className="stats-number">15+</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="about-container">
            <div className="about-left">
              <div className="section-badge"><i className="fa-solid fa-user"></i> About Me</div>
              <Image src="/profile.jpg" alt="Vindhya - About Me" width={500} height={625} className="about-image" style={{ width: '100%', borderRadius: 'var(--radius-xl)', objectFit: 'cover', aspectRatio: '4/5' }} />
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="vindhyalekhana" data-version="v1">
                  <a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/vindhyalekhana?trk=profile-badge">Vindhya Lekhana</a>
                </div>
              </div>
            </div>
            <div className="about-right">
              <h2>
                I am <span style={{ color: 'var(--warm-brown)' }}>Vindhya Lekhana</span>, a Computer Science and Engineering undergraduate at Woxsen University, specializing in Blockchain, IoT, and Cybersecurity.
              </h2>
              <p style={{ marginBottom: 32, color: 'var(--text-muted)' }}>
                I am interested in software engineering, full-stack development, cybersecurity, and emerging technologies. I enjoy transforming ideas into practical software solutions through problem-solving, thoughtful architecture, and clean, maintainable code.
              </p>
              <Link href="/resume" className="btn btn-dark">View My Resume <i className="fa-solid fa-arrow-right"></i></Link>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-info">
                    <span className="stat-label">Technologies Worked With</span>
                    <span className="stat-sub">Tech Stack &amp; Tools</span>
                  </div>
                  <span className="stat-val">20+</span>
                </div>
                <div className="stat-box">
                  <div className="stat-info">
                    <span className="stat-label">GitHub Contributions</span>
                    <span className="stat-sub">Code Commits</span>
                  </div>
                  <span className="stat-val">500+</span>
                </div>
                <div className="stat-box">
                  <div className="stat-info">
                    <span className="stat-val-big">100%</span>
                    <span className="stat-sub">Project Completion Rate</span>
                  </div>
                  <div className="rating">
                    <i className="fa-solid fa-star text-yellow"></i> 5.0
                  </div>
                </div>
                <div className="stat-box no-bg">
                  <h3>Scalable Architecture,<br />Clean Code</h3>
                  <div className="tags">
                    <span className="tag">System Design</span>
                    <span className="tag">AI Solutions</span>
                    <span className="tag tag-vertical">Full Stack</span>
                    <span className="tag">Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="works" className="projects">
          <div className="section-header center">
            <div className="section-badge"><i className="fa-solid fa-folder-open"></i> Portfolio Projects</div>
            <h2>Projects That Delivered<br />Real Impact</h2>
          </div>
          <div
            id="github-projects-container"
            className="projects-list"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 32, maxWidth: 1200, margin: '0 auto' }}
          >
            {repos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', gridColumn: '1 / -1' }}>
                <i className="fa-solid fa-spinner fa-spin fa-3x" style={{ color: 'var(--primary-blue)', marginBottom: 24 }}></i>
                <p style={{ fontSize: 18 }}>Fetching repositories from GitHub...</p>
              </div>
            ) : (
              repos.map(repo => (
                <div
                  key={repo.id}
                  style={{
                    background: 'var(--white)',
                    borderRadius: 24,
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <h2 style={{ marginBottom: 12, fontSize: 22, fontWeight: 700, color: 'var(--black)' }}>
                    <i className="fa-brands fa-github" style={{ marginRight: 8 }}></i>{repo.name}
                  </h2>
                  <p style={{ marginBottom: 20, fontSize: 16, lineHeight: 1.6, color: 'var(--text-dark)', flex: 1 }}>
                    {repo.description || 'No description provided.'}
                  </p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 'auto', flexWrap: 'wrap' }}>
                    {repo.language && <span className="tag" style={{ background: 'var(--blue-light)', color: 'var(--primary-blue)', fontWeight: 600 }}>{repo.language}</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ padding: '10px 20px', fontSize: 14 }}>
                      Source <i className="fa-brands fa-github"></i>
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
                        Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <div className="section-header">
            <div className="section-badge"><i className="fa-solid fa-comment"></i> Client Feedback</div>
            <h2>Trusted by ambitious<br />teams &amp; founders</h2>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content" style={{ width: '100%' }}>
              <span className="pill">Recommendation</span>
              <div className="quote-slider">
                {testimonials.length > 1 && (
                  <div className="quote-nav">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        className={`dot${i === currentQuote ? ' active' : ''}`}
                        onClick={() => setCurrentQuote(i)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
                <div className="quote-text">
                  <p>&quot;{t.quote}&quot;</p>
                  <div className="author">
                    <strong>
                      {t.name}{' '}
                      {t.linkedin && (
                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--primary-blue)',
                            fontSize: 14,
                            marginLeft: 6,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                      )}
                    </strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="slider-controls">
                  <button className="control-btn" onClick={prev}><i className="fa-solid fa-arrow-left"></i></button>
                  <button className="control-btn" onClick={next}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="cta">
          <div className="cta-content">
            <h2>Have a project in mind?<br />Let&apos;s turn ideas into reality.</h2>
            <a href="mailto:vindhyalekhana@gmail.com" className="btn btn-white">
              Email Me: vindhyalekhana@gmail.com <i className="fa-solid fa-envelope"></i>
            </a>
            <div className="cta-links">
              <a href="https://github.com/Vindhyalekhana" target="_blank" rel="noopener noreferrer" className="cta-link-card">
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/vindhyalekhana/" target="_blank" rel="noopener noreferrer" className="cta-link-card">
                <i className="fa-brands fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
    </>
  )
}

