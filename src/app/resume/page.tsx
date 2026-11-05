import type { Metadata } from 'next'
import PageLayout from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Resume — Vindhya Lekhana',
}

export default function ResumePage() {
  return (
    <PageLayout>
      <div className="page-header">
        <h1>Curriculum Vitae</h1>
        <p>My professional journey, academic background, and technical experience.</p>
        <div style={{ marginTop: 32 }}>
          <a href="#" className="btn btn-dark">Download PDF Resume <i className="fa-solid fa-download"></i></a>
        </div>
      </div>

      <section className="timeline">
        <div className="section-header">
          <h2>Experience</h2>
        </div>

        <div className="timeline-item animate-up">
          <span className="timeline-date">2024 - Present</span>
          <h3 className="timeline-title">Freelance Full Stack Developer</h3>
          <p className="timeline-subtitle">Independent Consultant</p>
          <p>Building scalable web applications and AI-powered solutions for clients. Handling end-to-end development from database architecture to UI/UX design.</p>
        </div>

        <div className="timeline-item animate-up">
          <span className="timeline-date">2023 - 2024</span>
          <h3 className="timeline-title">Software Engineering Intern</h3>
          <p className="timeline-subtitle">Tech Startup</p>
          <p>Contributed to the development of enterprise-grade applications. Improved API response times by 30% and implemented modern frontend designs using React.</p>
        </div>

        <div className="section-header" style={{ marginTop: 80 }}>
          <h2>Education</h2>
        </div>

        <div className="timeline-item animate-up">
          <span className="timeline-date">2025 - 2029</span>
          <h3 className="timeline-title">B.Tech in Computer Science</h3>
          <p className="timeline-subtitle">Woxsen University</p>
          <p>Specializing in Blockchain, IoT and Cybersecurity. Leading academic projects in web development and full-stack architecture.</p>
        </div>
      </section>
    </PageLayout>
  )
}

