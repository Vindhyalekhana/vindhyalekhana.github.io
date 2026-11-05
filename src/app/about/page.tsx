import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'About Me — Vindhya Lekhana',
}

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <div className="page-header" style={{ padding: '100px 20px 60px', textAlign: 'center', background: 'var(--blue-light)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--black)' }}>About Me</h1>
        <p style={{ fontSize: 20, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>Learn more about my background, passions, and what drives me to build great software.</p>
      </div>

      <section className="about" style={{ padding: '100px 0' }}>
        <div className="about-container" style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'flex-start', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="about-left" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image
              src="/profile.jpg"
              alt="Vindhya - About Me"
              width={420}
              height={525}
              style={{ width: '100%', maxWidth: 420, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover' }}
            />
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="vindhyalekhana" data-version="v1">
                <a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/vindhyalekhana?trk=profile-badge">Vindhya Lekhana</a>
              </div>
            </div>
          </div>
          <div className="about-right" style={{ flex: '1.5 1 500px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0, color: 'var(--black)' }}>
              I am a Computer Science and Engineering undergraduate at <span style={{ color: 'var(--primary-blue)' }}>Woxsen University</span>, specializing in Blockchain, IoT, and Cybersecurity.
            </h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.8, color: 'var(--text-muted)' }}>
              I enjoy designing and developing scalable, user-focused software solutions while continuously expanding my knowledge of full-stack development, artificial intelligence, and secure systems. Through hands-on projects, I strive to bridge theoretical concepts with practical applications, focusing on clean architecture, maintainable code, and impactful user experiences.
            </p>
            <div style={{ marginTop: 8 }}>
              <Link href="/resume" className="btn btn-dark" style={{ padding: '18px 36px', fontSize: 18, display: 'inline-flex', alignItems: 'center', gap: 12, borderRadius: 100 }}>
                View My Resume <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, marginTop: 24 }}>
              {[
                { label: 'Technologies', sub: 'Tech Stack & Tools', val: '20+' },
                { label: 'GitHub Commits', sub: 'Open Source', val: '500+' },
                { label: '100%', sub: 'Completion Rate', val: null, star: true },
              ].map((s, i) => (
                <div key={i} className="stat-box" style={{ background: 'var(--white)', padding: 24, borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="stat-info" style={{ display: 'flex', flexDirection: 'column' }}>
                    {s.val ? (
                      <>
                        <span className="stat-label" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</span>
                        <span className="stat-sub" style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.sub}</span>
                      </>
                    ) : (
                      <>
                        <span className="stat-val-big" style={{ fontSize: 40, fontWeight: 700, color: 'var(--primary-blue)', lineHeight: 1 }}>{s.label}</span>
                        <span className="stat-sub" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', marginTop: 8 }}>{s.sub}</span>
                      </>
                    )}
                  </div>
                  {s.val && <span className="stat-val" style={{ fontSize: 40, fontWeight: 700, color: 'var(--primary-blue)', lineHeight: 1 }}>{s.val}</span>}
                  {s.star && (
                    <div className="rating" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 14 }}>
                      <i className="fa-solid fa-star" style={{ color: '#fbbf24' }}></i> 5.0
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" style={{ padding: '100px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 48, textAlign: 'center', color: 'var(--black)' }}>My Journey</h2>
        <div className="timeline" style={{ position: 'relative', paddingLeft: 32, borderLeft: '2px solid rgba(0,0,0,0.1)' }}>
          {[
            {
              year: '2025',
              title: 'Began My Engineering Journey',
              desc: 'Started pursuing a Bachelor of Technology in Computer Science and Engineering at Woxsen University, specializing in Blockchain, Internet of Things (IoT), and Cybersecurity (BIC). Built a strong foundation in programming, software engineering, data structures, and web development.',
            },
            {
              year: '2025',
              title: 'Started Building Real-World Projects',
              desc: 'Developed multiple end-to-end projects including Enterprise Digital Library Management System, SkillSwap Platform, AI-Powered Personal Finance & Expense Intelligence System, and Safe Route Finder for Women. Focused on scalable architecture, responsive UI/UX, authentication, and full-stack application design.',
            },
            {
              year: '2026',
              title: 'Building a Professional Developer Portfolio',
              desc: 'Began creating production-quality GitHub repositories with comprehensive documentation, architecture diagrams, and deployment workflows. Emphasized clean code, maintainability, and professional project presentation.',
            },
            {
              year: '2026',
              title: 'Exploring Advanced Technologies',
              desc: 'Expanding expertise in Artificial Intelligence, Cybersecurity, Blockchain, IoT, System Design, and Full-Stack Development while continuously building projects that solve real-world problems.',
            },
          ].map((item, i) => (
            <div key={i} className="timeline-item" style={{ position: 'relative', marginBottom: 48 }}>
              <div style={{ position: 'absolute', left: -41, top: 0, width: 16, height: 16, borderRadius: '50%', background: 'var(--primary-blue)', border: '4px solid var(--white)' }}></div>
              <span style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>{item.year}</span>
              <h3 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0', color: 'var(--black)' }}>{item.title}</h3>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{ padding: '100px 24px', backgroundColor: 'var(--bg-light)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 48, textAlign: 'center', color: 'var(--black)' }}>Education &amp; Background</h2>
          <div style={{ background: 'var(--white)', borderRadius: 24, padding: 48, boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 24, marginBottom: 32, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 32 }}>
              <div>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: 'var(--black)', marginBottom: 8 }}>Bachelor of Technology (B.Tech)</h3>
                <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--primary-blue)', margin: 0 }}>Computer Science and Engineering</p>
                <p style={{ fontSize: 18, color: 'var(--text-muted)', marginTop: 8 }}>Specialization: Blockchain, Internet of Things (IoT) &amp; Cybersecurity (BIC)</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ fontSize: 22, fontWeight: 700, color: 'var(--black)', marginBottom: 8 }}>Woxsen University</h4>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0, display: 'inline-block', padding: '6px 16px', background: 'rgba(0,0,0,0.05)', borderRadius: 100, fontWeight: 600 }}>2025 – 2029 (Expected)</p>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--black)', marginBottom: 16 }}>Relevant Coursework</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management Systems', 'Software Engineering', 'Web Development', 'Operating Systems', 'Computer Networks', 'Blockchain Fundamentals', 'IoT Systems', 'Cybersecurity Fundamentals'].map(c => (
                  <span key={c} style={{ padding: '8px 16px', background: '#f0f4f8', color: 'var(--text-dark)', borderRadius: 8, fontSize: 15, fontWeight: 500 }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Skills Section */}
      <section id="skills" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 64, textAlign: 'center', color: 'var(--black)' }}>Core Skills &amp; Arsenal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {[
            { icon: 'fa-code', title: 'Programming', items: ['Java', 'JavaScript', 'Python', 'C'] },
            { icon: 'fa-laptop-code', title: 'Frontend', items: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'Responsive Design', 'UI/UX'] },
            { icon: 'fa-server', title: 'Backend & DB', items: ['Node.js', 'Express.js', 'REST APIs', 'MySQL', 'SQL', 'MongoDB', 'Auth'] },
            { icon: 'fa-microchip', title: 'Computer Science', items: ['Data Structures & Algorithms', 'OOP', 'MVC Architecture', 'System Design'] },
            { icon: 'fa-wrench', title: 'Tools & Platforms', items: ['Git & GitHub', 'VS Code', 'Postman', 'Figma'] },
            { icon: 'fa-rocket', title: 'Areas of Interest', items: ['Artificial Intelligence', 'Blockchain', 'IoT', 'Cybersecurity', 'Full-Stack'] },
          ].map((s, i) => (
            <div key={i} style={{ padding: 32, background: 'var(--white)', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--black)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <i className={`fa-solid ${s.icon}`} style={{ color: 'var(--primary-blue)' }}></i> {s.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.items.map(item => (
                  <span key={item} style={{ padding: '6px 14px', background: 'rgba(0,0,0,0.04)', borderRadius: 100, fontSize: 14, fontWeight: 500 }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <script src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
    </PageLayout>
  )
}

