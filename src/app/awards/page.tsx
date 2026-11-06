import type { Metadata } from 'next'
import PageLayout from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Awards — Vindhya Lekhana',
}

export default function AwardsPage() {
  return (
    <PageLayout>
      <div className="page-header">
        <h1>Awards &amp; Recognitions</h1>
        <p>Milestones and achievements in software engineering and design.</p>
      </div>

      <section className="awards-grid">
        <div className="award-card animate-up">
          <i className="fa-solid fa-trophy award-icon"></i>
          <h3>Hackathon Winner - Smart India Hackathon</h3>
          <p className="timeline-subtitle">2023</p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>First place for developing an innovative AI-driven educational tool.</p>
        </div>

        <div className="award-card animate-up">
          <i className="fa-solid fa-medal award-icon" style={{ color: 'var(--warm-brown)' }}></i>
          <h3>Best Capstone Project</h3>
          <p className="timeline-subtitle">2024</p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Awarded by the university for the &apos;Safe Route Finder&apos; platform.</p>
        </div>

        <div className="award-card animate-up">
          <i className="fa-solid fa-star award-icon" style={{ color: 'var(--warm-brown)' }}></i>
          <h3>Top Contributor - Open Source</h3>
          <p className="timeline-subtitle">2024</p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Recognized for 500+ commits to various developer community projects.</p>
        </div>
      </section>
    </PageLayout>
  )
}

