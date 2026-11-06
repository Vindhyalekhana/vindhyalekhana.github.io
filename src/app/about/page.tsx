import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'About Me — Vindhya Lekhana',
  description:
    'Vindhya Lekhana — Computer Science and Engineering undergraduate at Woxsen University specializing in Blockchain, IoT, and Cybersecurity.',
}

export default function AboutPage() {
  const journey = [
    {
      year: '2025',
      title: 'The Beginning',
      desc: 'Started my B.Tech in Computer Science and Engineering at Woxsen University, building foundations in programming, algorithms, and software development.',
    },
    {
      year: '2025',
      title: 'Practical Development',
      desc: 'Began developing real-world projects, exploring full-stack development, databases, authentication, and application design.',
    },
    {
      year: '2026',
      title: 'Engineering & Innovation',
      desc: 'Focused on clean architecture, maintainable code, documentation, and exploring AI, cybersecurity, blockchain, and system design.',
    },
  ]

  const skillsData = [
    { category: 'Programming', icon: 'fa-solid fa-code', items: ['Java', 'JavaScript', 'Python', 'C'] },
    { category: 'Frontend', icon: 'fa-solid fa-laptop-code', items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'] },
    { category: 'Backend', icon: 'fa-solid fa-server', items: ['Node.js', 'Express.js', 'PHP', 'REST APIs'] },
    { category: 'Databases', icon: 'fa-solid fa-database', items: ['MySQL', 'MongoDB', 'SQLite'] },
    { category: 'Computer Science', icon: 'fa-solid fa-network-wired', items: ['DSA', 'OOP', 'MVC', 'System Design'] },
    { category: 'Tools', icon: 'fa-solid fa-wrench', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma'] },
    { category: 'Interests', icon: 'fa-solid fa-compass', items: ['AI', 'Blockchain', 'IoT', 'Cybersecurity', 'Full-Stack Development'] },
  ]

  const coursework = [
    'Data Structures & Algorithms',
    'OOP',
    'DBMS',
    'Software Engineering',
    'Web Technologies',
    'Operating Systems',
    'Computer Networks',
    'Cryptography',
  ]

  return (
    <PageLayout>
      {/* ── Separate Header Banner (Matches Projects / Work Section) ── */}
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
          About Me
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
          An overview of my academic background, technical capabilities, journey, and development philosophy.
        </p>
      </div>

      {/* ── Section 1: Profile & Background ── */}
      <section style={{ padding: '80px 24px 90px', maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.5vw, 36px)',
            fontWeight: 700,
            marginBottom: 44,
            color: 'var(--black)',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.01em',
          }}
        >
          Profile &amp; Background
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '56px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left: Profile Portrait */}
          <div
            style={{
              flex: '1 1 360px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(14, 14, 16, 0.1), 0 0 0 1px var(--gray-light)',
                backgroundColor: 'var(--white)',
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Vindhya Lekhana"
                width={380}
                height={475}
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* LinkedIn Badge Embed */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
              <div
                className="badge-base LI-profile-badge"
                data-locale="en_US"
                data-size="medium"
                data-theme="light"
                data-type="VERTICAL"
                data-vanity="vindhyalekhana"
                data-version="v1"
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://in.linkedin.com/in/vindhyalekhana?trk=profile-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vindhya Lekhana
                </a>
              </div>
            </div>
          </div>

          {/* Right: Bio Content */}
          <div style={{ flex: '1.4 1 480px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3
              style={{
                fontSize: 'clamp(24px, 3.2vw, 32px)',
                fontWeight: 700,
                lineHeight: 1.35,
                color: 'var(--black)',
                margin: 0,
                fontFamily: 'Georgia, serif',
                letterSpacing: '-0.01em',
              }}
            >
              I am <span style={{ color: 'var(--primary-blue)' }}>Vindhya Lekhana</span>, a Computer Science and
              Engineering undergraduate at{' '}
              <span style={{ color: 'var(--black)', borderBottom: '2px solid var(--primary-blue)' }}>
                Woxsen University
              </span>
              , specializing in Blockchain, Internet of Things (IoT), and Cybersecurity (BIC).
            </h3>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.75,
                color: 'var(--text-dark)',
                margin: 0,
              }}
            >
              I am interested in software engineering, full-stack development, cybersecurity, and emerging
              technologies. I enjoy transforming ideas into practical software solutions through
              problem-solving, thoughtful architecture, and clean, maintainable code.
            </p>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.75,
                color: 'var(--text-dark)',
                margin: 0,
              }}
            >
              Through hands-on projects, I continuously explore new technologies while strengthening my
              foundations in programming, databases, application development, and system design. My goal is to
              build secure, scalable, and user-focused software that addresses real-world problems.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
              <Link
                href="/resume"
                className="btn btn-dark"
                style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '100px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                View My Resume <i className="fa-solid fa-arrow-right" />
              </Link>
              <Link
                href="/contact"
                style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  borderRadius: '100px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--white)',
                  color: 'var(--black)',
                  border: '1px solid var(--gray-light)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                Let&apos;s Connect <i className="fa-solid fa-paper-plane" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: My Journey ── */}
      <section
        id="journey"
        style={{
          padding: '80px 24px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderTop: '1px solid var(--gray-light)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 38px)',
            fontWeight: 700,
            color: 'var(--black)',
            marginBottom: '44px',
            textAlign: 'center',
            fontFamily: 'Georgia, serif',
          }}
        >
          My Journey
        </h2>

        <div
          style={{
            position: 'relative',
            paddingLeft: '32px',
            borderLeft: '2px solid var(--gray-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {journey.map((item, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '-41px',
                  top: '4px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-blue)',
                  border: '3px solid var(--warm-ivory)',
                  boxShadow: '0 0 0 2px var(--primary-blue)',
                }}
              />
              <span
                style={{
                  fontWeight: 700,
                  color: 'var(--primary-blue)',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {item.year}
              </span>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  margin: '6px 0 10px',
                  color: 'var(--black)',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {item.year} — {item.title}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--text-dark)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Education ── */}
      <section
        id="education"
        style={{
          padding: '80px 24px',
          backgroundColor: 'var(--warm-ivory)',
          borderTop: '1px solid var(--gray-light)',
          borderBottom: '1px solid var(--gray-light)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 700,
              color: 'var(--black)',
              marginBottom: '40px',
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
            }}
          >
            Education
          </h2>

          <div
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 10px 30px rgba(14, 14, 16, 0.04)',
              border: '1px solid var(--gray-light)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '24px',
                marginBottom: '28px',
                borderBottom: '1px solid var(--gray-light)',
                paddingBottom: '28px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--black)',
                    marginBottom: '6px',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Bachelor of Technology (B.Tech)
                </h3>
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--primary-blue)',
                    margin: 0,
                  }}
                >
                  Computer Science and Engineering
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: 0 }}>
                  <strong>Specialization:</strong> Blockchain, Internet of Things (IoT) &amp; Cybersecurity (BIC)
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <h4
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--black)',
                    marginBottom: '8px',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Woxsen University
                </h4>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--primary-blue)',
                    display: 'inline-block',
                    padding: '6px 16px',
                    backgroundColor: 'var(--warm-ivory)',
                    borderRadius: '100px',
                    fontWeight: 600,
                    border: '1px solid var(--gray-light)',
                  }}
                >
                  2025 – 2029 (Expected)
                </span>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--black)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Relevant Coursework
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {coursework.map((c) => (
                  <span
                    key={c}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--warm-ivory)',
                      color: 'var(--text-dark)',
                      borderRadius: '100px',
                      fontSize: '14px',
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
        </div>
      </section>

      {/* ── Section 4: Technical Skills ── */}
      <section
        id="skills"
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 38px)',
            fontWeight: 700,
            color: 'var(--black)',
            marginBottom: '44px',
            textAlign: 'center',
            fontFamily: 'Georgia, serif',
          }}
        >
          Technical Skills
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {skillsData.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '28px 24px',
                backgroundColor: 'var(--white)',
                borderRadius: '20px',
                boxShadow: '0 6px 20px rgba(14, 14, 16, 0.03)',
                border: '1px solid var(--gray-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(138, 93, 60, 0.1)',
                    border: '1px solid rgba(138, 93, 60, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-blue)',
                    fontSize: '16px',
                  }}
                >
                  <i className={s.icon} />
                </div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--black)',
                    margin: 0,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {s.category}
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: 'var(--warm-ivory)',
                      borderRadius: '100px',
                      fontSize: '13px',
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

      {/* ── Section 5: Let's Connect ── */}
      <section
        id="connect"
        style={{
          padding: '80px 24px',
          backgroundColor: 'var(--warm-ivory)',
          borderTop: '1px solid var(--gray-light)',
        }}
      >
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: 'var(--white)',
            borderRadius: '28px',
            padding: '56px 36px',
            border: '1px solid var(--gray-light)',
            boxShadow: '0 16px 40px rgba(14, 14, 16, 0.04)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '100px',
              backgroundColor: 'rgba(138, 93, 60, 0.1)',
              color: 'var(--primary-blue)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            <i className="fa-solid fa-comments" /> Collaboration
          </div>

          <h2
            style={{
              fontSize: 'clamp(30px, 4.5vw, 42px)',
              fontWeight: 700,
              color: 'var(--black)',
              margin: '0 0 16px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.02em',
            }}
          >
            Let&apos;s Connect
          </h2>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'var(--text-dark)',
              maxWidth: '680px',
              margin: '0 auto 12px',
            }}
          >
            I am always interested in exploring new technologies, exchanging ideas, and collaborating on
            meaningful projects.
          </p>

          <p
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--primary-blue)',
              fontFamily: 'Georgia, serif',
              margin: '0 auto 36px',
            }}
          >
            Let&apos;s connect and build something meaningful.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/contact"
              className="btn btn-dark"
              style={{
                padding: '14px 32px',
                fontSize: '15px',
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              Get In Touch <i className="fa-solid fa-arrow-right" />
            </Link>
            <a
              href="https://in.linkedin.com/in/vindhyalekhana"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 32px',
                fontSize: '15px',
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'var(--warm-ivory)',
                color: 'var(--black)',
                border: '1px solid var(--gray-light)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <i className="fa-brands fa-linkedin" style={{ color: 'var(--primary-blue)' }} /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* LinkedIn Profile Script */}
      <script src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
    </PageLayout>
  )
}
