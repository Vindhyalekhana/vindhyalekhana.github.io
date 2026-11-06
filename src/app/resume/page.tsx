'use client'

import PageLayout from '@/components/PageLayout'
import Link from 'next/link'

export default function ResumePage() {
  const selectedProjects = [
    {
      title: 'LibraX',
      subtitle: 'Enterprise Digital Library Management System',
      desc: 'Robust library portal handling book tracking, student memberships, fines, and granular borrowing logs.',
      tags: ['Full Stack', 'Node.js', 'MySQL', 'System Design'],
    },
    {
      title: 'FixMyCampus',
      subtitle: 'Campus Complaint Management & Communication Platform',
      desc: 'Real-time issue ticketing, categorical escalation, and resolution tracking for university students.',
      tags: ['Web App', 'Express.js', 'MongoDB', 'REST APIs'],
    },
    {
      title: 'Encrypted Chat Application',
      subtitle: 'Secure Messaging Application',
      desc: 'Client-server communications leveraging socket programming and end-to-end cryptographic encryption.',
      tags: ['Python', 'Cryptography', 'Socket Programming', 'Security'],
    },
    {
      title: 'Restaurant Management System',
      subtitle: 'Web-Based Restaurant Reservation & Food Service Application',
      desc: 'Interactive table reservations, real-time order workflows, menu customization, and billing automation.',
      tags: ['PHP', 'MySQL', 'Responsive UI', 'Authentication'],
    },
  ]

  const technicalSkills = [
    { category: 'Programming', icon: 'fa-solid fa-code', items: ['Java', 'JavaScript', 'Python', 'C'] },
    { category: 'Frontend', icon: 'fa-solid fa-laptop-code', items: ['HTML', 'CSS', 'JavaScript'] },
    { category: 'Backend', icon: 'fa-solid fa-server', items: ['Node.js', 'Express.js', 'PHP'] },
    { category: 'Databases', icon: 'fa-solid fa-database', items: ['MySQL', 'MongoDB', 'SQLite'] },
    { category: 'Tools', icon: 'fa-solid fa-wrench', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma'] },
  ]

  const professionalInterests = [
    'Software Engineering',
    'Full-Stack Development',
    'Artificial Intelligence',
    'Cybersecurity',
    'Blockchain',
    'IoT',
    'System Design',
  ]

  const coursework = [
    'Data Structures and Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Software Engineering',
    'Web Technologies',
    'Operating Systems',
    'Computer Networks',
    'Cryptography',
  ]

  return (
    <PageLayout>
      {/* ── 1. Page Header (Matches Projects & About) ── */}
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
          Curriculum Vitae
        </h1>
        <p
          style={{
            fontSize: 20,
            color: 'var(--text-muted)',
            maxWidth: 760,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          An overview of my academic background, technical capabilities, project experience, and professional development.
        </p>

        {/* ── 2. Resume Download Link ── */}
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button
            onClick={() => window.print()}
            className="btn btn-dark"
            style={{
              padding: '14px 32px',
              fontSize: '15px',
              borderRadius: '100px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <i className="fa-solid fa-download" /> Download PDF Resume
          </button>
          <Link
            href="/contact"
            style={{
              padding: '14px 28px',
              fontSize: '15px',
              borderRadius: '100px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--white)',
              color: 'var(--black)',
              border: '1px solid var(--gray-light)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Contact Directly <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '70px 24px 100px' }}>
        {/* ── 3. Experience ── */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: 'rgba(138, 93, 60, 0.1)',
                border: '1px solid rgba(138, 93, 60, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)',
                fontSize: 16,
              }}
            >
              <i className="fa-solid fa-briefcase" />
            </div>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 32px)',
                fontWeight: 700,
                color: 'var(--black)',
                margin: 0,
                fontFamily: 'Georgia, serif',
              }}
            >
              Experience
            </h2>
          </div>

          <div
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: 24,
              padding: '36px',
              border: '1px solid var(--gray-light)',
              boxShadow: '0 10px 30px rgba(14, 14, 16, 0.03)',
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 16,
                marginBottom: 20,
                borderBottom: '1px solid var(--gray-light)',
                paddingBottom: 20,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--black)',
                    margin: '0 0 6px',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Software Development &amp; Technical Projects
                </h3>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--primary-blue)' }}>
                  Independent Project Development
                </p>
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--primary-blue)',
                  backgroundColor: 'var(--warm-ivory)',
                  padding: '6px 16px',
                  borderRadius: 100,
                  border: '1px solid var(--gray-light)',
                }}
              >
                2025 – Present
              </span>
            </div>

            <ul style={{ margin: 0, paddingLeft: 22, color: 'var(--text-dark)', fontSize: 16, lineHeight: 1.8 }}>
              <li style={{ marginBottom: 10 }}>
                Design and develop software applications using modern programming languages, web technologies, and database systems.
              </li>
              <li style={{ marginBottom: 10 }}>
                Work on full-stack applications involving frontend development, backend logic, database integration, and authentication.
              </li>
              <li style={{ marginBottom: 10 }}>
                Apply software engineering principles, including modular architecture, maintainable code, and version control.
              </li>
              <li>
                Explore application security, system design, and practical technology integration through hands-on projects.
              </li>
            </ul>
          </div>

          {/* Selected Technical Projects Subsection */}
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--black)',
              margin: '36px 0 20px',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-blue)', fontSize: 16 }} />
            Selected Technical Projects
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {selectedProjects.map((p, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--white)',
                  borderRadius: 20,
                  padding: '24px',
                  border: '1px solid var(--gray-light)',
                  boxShadow: '0 6px 20px rgba(14, 14, 16, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--black)',
                      margin: '0 0 6px',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {p.title}
                  </h4>
                  <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--primary-blue)', fontWeight: 600 }}>
                    {p.subtitle}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-dark)', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 12, borderTop: '1px solid var(--gray-light)' }}>
                  {p.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        padding: '4px 10px',
                        fontSize: 12,
                        fontWeight: 500,
                        borderRadius: 100,
                        backgroundColor: 'var(--warm-ivory)',
                        color: 'var(--text-dark)',
                        border: '1px solid var(--gray-light)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Education ── */}
        <section style={{ marginBottom: 64, borderTop: '1px solid var(--gray-light)', paddingTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: 'rgba(138, 93, 60, 0.1)',
                border: '1px solid rgba(138, 93, 60, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)',
                fontSize: 16,
              }}
            >
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 32px)',
                fontWeight: 700,
                color: 'var(--black)',
                margin: 0,
                fontFamily: 'Georgia, serif',
              }}
            >
              Education
            </h2>
          </div>

          <div
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: 24,
              padding: '36px',
              border: '1px solid var(--gray-light)',
              boxShadow: '0 10px 30px rgba(14, 14, 16, 0.03)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 16,
                marginBottom: 24,
                borderBottom: '1px solid var(--gray-light)',
                paddingBottom: 24,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--black)',
                    margin: '0 0 6px',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Woxsen University
                </h3>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'var(--primary-blue)' }}>
                  Bachelor of Technology (B.Tech) — Computer Science and Engineering
                </p>
                <p style={{ margin: '8px 0 0', fontSize: 15, color: 'var(--text-dark)' }}>
                  <strong>Specialization:</strong> Blockchain, Internet of Things (IoT) &amp; Cybersecurity (BIC)
                </p>
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--primary-blue)',
                  backgroundColor: 'var(--warm-ivory)',
                  padding: '6px 16px',
                  borderRadius: 100,
                  border: '1px solid var(--gray-light)',
                }}
              >
                2025 – 2029 (Expected)
              </span>
            </div>

            <div>
              <h4
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--black)',
                  margin: '0 0 14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Relevant Coursework
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {coursework.map(c => (
                  <span
                    key={c}
                    style={{
                      padding: '7px 14px',
                      backgroundColor: 'var(--warm-ivory)',
                      color: 'var(--text-dark)',
                      borderRadius: 100,
                      fontSize: 13,
                      fontWeight: 500,
                      border: '1px solid var(--gray-light)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Technical Skills ── */}
        <section style={{ marginBottom: 64, borderTop: '1px solid var(--gray-light)', paddingTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: 'rgba(138, 93, 60, 0.1)',
                border: '1px solid rgba(138, 93, 60, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)',
                fontSize: 16,
              }}
            >
              <i className="fa-solid fa-code" />
            </div>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 32px)',
                fontWeight: 700,
                color: 'var(--black)',
                margin: 0,
                fontFamily: 'Georgia, serif',
              }}
            >
              Technical Skills
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {technicalSkills.map((s, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--white)',
                  borderRadius: 20,
                  padding: '24px',
                  border: '1px solid var(--gray-light)',
                  boxShadow: '0 6px 20px rgba(14, 14, 16, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: 'rgba(138, 93, 60, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-blue)',
                      fontSize: 14,
                    }}
                  >
                    <i className={s.icon} />
                  </div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: 'var(--black)',
                      margin: 0,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {s.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.items.map(item => (
                    <span
                      key={item}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'var(--warm-ivory)',
                        borderRadius: 100,
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'var(--text-dark)',
                        border: '1px solid var(--gray-light)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Professional Interests ── */}
        <section style={{ borderTop: '1px solid var(--gray-light)', paddingTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: 'rgba(138, 93, 60, 0.1)',
                border: '1px solid rgba(138, 93, 60, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)',
                fontSize: 16,
              }}
            >
              <i className="fa-solid fa-compass" />
            </div>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 32px)',
                fontWeight: 700,
                color: 'var(--black)',
                margin: 0,
                fontFamily: 'Georgia, serif',
              }}
            >
              Professional Interests
            </h2>
          </div>

          <div
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: 24,
              padding: '32px 36px',
              border: '1px solid var(--gray-light)',
              boxShadow: '0 8px 24px rgba(14, 14, 16, 0.03)',
            }}
          >
            <p style={{ margin: '0 0 20px', fontSize: 16, color: 'var(--text-dark)', lineHeight: 1.6 }}>
              Key focus areas and domains I am actively exploring through coursework, system architecture research, and hands-on software development:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {professionalInterests.map(interest => (
                <span
                  key={interest}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 100,
                    backgroundColor: 'var(--warm-ivory)',
                    color: 'var(--text-dark)',
                    border: '1px solid var(--gray-light)',
                    fontSize: 14,
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <i className="fa-solid fa-check" style={{ color: 'var(--primary-blue)', fontSize: 11 }} />
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
