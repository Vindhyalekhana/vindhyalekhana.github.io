'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import PageLayout from '@/components/PageLayout'

/* ─── Types ──────────────────────────────────────────────── */
interface Certificate {
  id: string
  title: string
  issuer: string
  category: string
  categoryId: string
  badge?: string
  pdf?: string
  pdfs?: { label: string; url: string }[]
  color: string
  icon: string
  year: string
  skills: string[]
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

/* ─── Helpers ────────────────────────────────────────────── */
const enc = (s: string) => s.split('/').map(encodeURIComponent).join('/')
const B = '/certificates/'

/* ─── Category Definitions ───────────────────────────────── */
const categories: Category[] = [
  { id: 'all', name: 'All Credentials', icon: 'fa-solid fa-layer-group', color: '#8A5D3C' },
  { id: 'algo', name: 'Algorithms & Data Structures', icon: 'fa-solid fa-diagram-project', color: '#8A5D3C' },
  { id: 'cyber', name: 'Cybersecurity', icon: 'fa-solid fa-shield-halved', color: '#8A5D3C' },
  { id: 'db', name: 'Databases & MongoDB', icon: 'fa-solid fa-database', color: '#8A5D3C' },
  { id: 'ml', name: 'Python & Machine Learning', icon: 'fa-solid fa-brain', color: '#8A5D3C' },
  { id: 'web', name: 'Web Dev & Git', icon: 'fa-solid fa-globe', color: '#8A5D3C' },
  { id: 'ai', name: 'Artificial Intelligence', icon: 'fa-solid fa-microchip', color: '#8A5D3C' },
  { id: 'prod', name: 'Productivity & Office', icon: 'fa-solid fa-briefcase', color: '#8A5D3C' },
]

/* ─── 4 Top Summary Domains (matches user layout) ────────── */
const topDomains = [
  {
    title: 'Frontend',
    icon: 'fa-solid fa-laptop-code',
    skills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: 'fa-solid fa-server',
    skills: ['Node.js', 'Express.js', 'Python', 'REST APIs'],
  },
  {
    title: 'Database',
    icon: 'fa-solid fa-database',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQL Optimization'],
  },
  {
    title: 'Tools & Others',
    icon: 'fa-solid fa-wrench',
    skills: ['Git & GitHub', 'Machine Learning', 'Cybersecurity', 'Figma'],
  },
]

/* ─── Certificate Data (Complete 23+ Credentials) ─────────── */
const certificates: Certificate[] = [
  // Algorithms & DSA
  {
    id: 'dsa-basics',
    title: 'Basics of Data Structures & Algorithms',
    issuer: 'Coursera',
    category: 'Algorithms & Data Structures',
    categoryId: 'algo',
    pdf: B + enc('Basics of Data structure and algorithms certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-sitemap',
    year: '2024',
    skills: ['Data Structures', 'Arrays & Linked Lists', 'Time Complexity'],
  },
  {
    id: 'daa',
    title: 'Design Analysis & Algorithms',
    issuer: 'Coursera',
    category: 'Algorithms & Data Structures',
    categoryId: 'algo',
    pdf: B + enc('Design analysis and algorithms certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-code-branch',
    year: '2024',
    skills: ['Dynamic Programming', 'Greedy Algorithms', 'Graph Theory'],
  },
  {
    id: 'leetcode-75',
    title: 'LeetCode Data Structures 75',
    issuer: 'LeetCode',
    category: 'Algorithms & Data Structures',
    categoryId: 'algo',
    badge: B + enc('leet code data structures 75 badge.png'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-award',
    year: '2024',
    skills: ['75 Curated DSA Problems', 'Binary Trees', 'Heaps & Graphs'],
  },
  {
    id: 'leetcode-sql50',
    title: 'LeetCode SQL 50',
    issuer: 'LeetCode',
    category: 'Algorithms & Data Structures',
    categoryId: 'algo',
    badge: B + enc('leet code sql50 badge.png'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-award',
    year: '2024',
    skills: ['50 Advanced SQL Queries', 'Aggregations', 'Subqueries & Joins'],
  },

  // Cybersecurity
  {
    id: 'foundation-cyber',
    title: 'Foundations of Cybersecurity',
    issuer: 'Google / Coursera',
    category: 'Cybersecurity',
    categoryId: 'cyber',
    pdf: B + enc('foundation of cyber security certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-shield-halved',
    year: '2024',
    skills: ['Security Frameworks', 'Threat Intelligence', 'CIA Triad'],
  },
  {
    id: 'network-sec',
    title: 'Network Security Fundamentals',
    issuer: 'Coursera',
    category: 'Cybersecurity',
    categoryId: 'cyber',
    pdf: B + enc('network security certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-network-wired',
    year: '2024',
    skills: ['TCP/IP & Firewalls', 'VPNs & Cryptography', 'Packet Analysis'],
  },
  {
    id: 'cyber-essentials',
    title: 'Introduction to Cybersecurity Essentials',
    issuer: 'IBM / Coursera',
    category: 'Cybersecurity',
    categoryId: 'cyber',
    badge: B + enc('Introduction to cybersecurity essentials/cybersecurity-essentials.png'),
    pdfs: [
      { label: 'IBM Credential', url: B + enc('Introduction to cybersecurity essentials/Cyber security essentials certificate.pdf') },
      { label: 'Coursera Certificate', url: B + enc('Introduction to cybersecurity essentials/introduction to cyber security essentials Coursera certificate.pdf') },
    ],
    color: '#8A5D3C',
    icon: 'fa-solid fa-lock',
    year: '2024',
    skills: ['IAM', 'Threat Modeling', 'Zero Trust Architecture'],
  },

  // Databases & MongoDB
  {
    id: 'db-fundamentals',
    title: 'Introduction to Fundamentals of Databases',
    issuer: 'Coursera',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    pdf: B + enc('Introduction to the Fundamentals of Databases.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-database',
    year: '2024',
    skills: ['Relational Modeling', 'Schema Normalization', 'SQL DDL / DML'],
  },
  {
    id: 'hackerrank-sql',
    title: 'HackerRank SQL (Intermediate) Skill Certificate',
    issuer: 'HackerRank',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    pdf: B + enc('HackerRank sql_intermediate certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-table',
    year: '2024',
    skills: ['Advanced Window Functions', 'Recursive CTEs', 'Optimized Queries'],
  },
  {
    id: 'mongo-1',
    title: 'CRUD Operations in MongoDB',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/1. CRUD Operations in MongoDB/CRUD Operations in MongoDB badge.png'),
    pdf: B + enc('MongoDB Data Modeling Path/1. CRUD Operations in MongoDB/CRUD Operations in MongoDB credly certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['Query Filters', 'Update Operators', 'Bulk Writes & Projection'],
  },
  {
    id: 'mongo-2',
    title: 'MongoDB Schema Design Patterns & Anti-patterns',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/2. MongoDB Schema Design Patterns and Anti-patterns/MongoDB Schema Design Patterns and Anti-patterns Skill Badge.png'),
    pdf: B + enc('MongoDB Data Modeling Path/2. MongoDB Schema Design Patterns and Anti-patterns/MongoDB Schema Design Patterns and Anti-patterns Skill Badge.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['Document Embedding', 'Referencing Models', 'Anti-Pattern Avoidance'],
  },
  {
    id: 'mongo-3',
    title: 'From Relational (SQL) to MongoDB Document Model',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/3. From Relational Model (SQL) to MongoDBs Document Model/From Relational Model (SQL) to MongoDBs Document Model.png'),
    pdf: B + enc('MongoDB Data Modeling Path/3. From Relational Model (SQL) to MongoDBs Document Model/From Relational Model (SQL) to MongoDBs Document Model crdly certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['SQL to NoSQL Migration', 'Denormalization', '1:N & N:M Relations'],
  },
  {
    id: 'mongo-4',
    title: 'MongoDB Advanced Schema Design Patterns',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/4. MongoDB Advanced Schema Design Patterns and Anti-patterns/MongoDB Advanced Schema Design Patterns and Anti-patterns Skill Badge.png'),
    pdf: B + enc('MongoDB Data Modeling Path/4. MongoDB Advanced Schema Design Patterns and Anti-patterns/MongoDB Advanced Schema Design Patterns and Anti-patterns Skill Badge credly certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['Bucket Pattern', 'Outlier Pattern', 'Polymorphic Pattern'],
  },
  {
    id: 'mongo-5',
    title: 'MongoDB Schema Design Optimization',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/5. MongoDB Schema Design Optimization/mongodb-schema-design-optimization.png'),
    pdf: B + enc('MongoDB Data Modeling Path/5. MongoDB Schema Design Optimization/MongoDB Schema Design Optimization certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['Workload Analysis', 'Schema Sizing', 'Performance Benchmarks'],
  },
  {
    id: 'mongo-6',
    title: 'Fundamentals of Data Transformation (Aggregation)',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/6. Fundamentals of Data Transformation Skill Check/mongodb-aggregation-fundamentals badge.png'),
    pdf: B + enc('MongoDB Data Modeling Path/6. Fundamentals of Data Transformation Skill Check/Mongodb aggression fundamentals.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['$match & $group', 'Pipeline Optimization', '$lookup Joins'],
  },
  {
    id: 'mongo-7',
    title: 'MongoDB Indexing Design Fundamentals',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/7. MongoDB Indexing Design Fundamentals/mongodb-indexing-design-fundamentals badge.png'),
    pdf: B + enc('MongoDB Data Modeling Path/7. MongoDB Indexing Design Fundamentals/MongoDB Indexing Design Fundamentals certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['Compound Indexes', 'ESR Rule', 'Covered Queries'],
  },
  {
    id: 'mongo-8',
    title: 'Optimizing MongoDB Performance with Tuning Tools',
    issuer: 'MongoDB University',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    badge: B + enc('MongoDB Data Modeling Path/8. Optimizing MongoDB Performance with Tuning Tools/optimizing-mongodb-performance-with-tuning-tools badge.png'),
    pdf: B + enc('MongoDB Data Modeling Path/8. Optimizing MongoDB Performance with Tuning Tools/Optimizing MongoDB Performance with Tuning Tools certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-leaf',
    year: '2024',
    skills: ['explain() Plans', 'Atlas Performance Advisor', 'Profiler & Diagnostics'],
  },

  // Python & Machine Learning
  {
    id: 'hackerrank-python',
    title: 'HackerRank Python (Basic) Skill Certificate',
    issuer: 'HackerRank',
    category: 'Python & Machine Learning',
    categoryId: 'ml',
    pdf: B + enc('Hacker Rank python_basic certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-brands fa-python',
    year: '2024',
    skills: ['Python 3 Idioms', 'OOP & Comprehensions', 'Problem Solving'],
  },
  {
    id: 'ml-python',
    title: 'Machine Learning with Python',
    issuer: 'IBM / Coursera',
    category: 'Python & Machine Learning',
    categoryId: 'ml',
    badge: B + enc('Mechine learning with python certificates/machine-learning-with-python-badge.png'),
    pdfs: [
      { label: 'IBM Credential', url: B + enc('Mechine learning with python certificates/machine learning with python certificate.pdf') },
      { label: 'Coursera Certificate', url: B + enc('Mechine learning with python certificates/mechine learning with python Coursera certificate.pdf') },
    ],
    color: '#8A5D3C',
    icon: 'fa-solid fa-brain',
    year: '2024',
    skills: ['Regression & Classification', 'Scikit-Learn', 'Model Evaluation'],
  },

  // Web Dev & Git
  {
    id: 'web-dev-fundamentals',
    title: 'Web Development Fundamentals',
    issuer: 'IBM / Coursera',
    category: 'Web Dev & Git',
    categoryId: 'web',
    badge: B + enc('Web Development Fundamentals/web-development-fundamentals badge.png'),
    pdf: B + enc('Web Development Fundamentals/Web Development Fundamentals certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-solid fa-globe',
    year: '2024',
    skills: ['Modern HTML5 & CSS3', 'DOM Manipulation', 'Responsive Web Design'],
  },
  {
    id: 'git-github',
    title: 'Git & GitHub Essentials',
    issuer: 'IBM / Coursera',
    category: 'Web Dev & Git',
    categoryId: 'web',
    badge: B + enc('Git and github/git-and-github-essentials.1 badge png.png'),
    pdfs: [
      { label: 'IBM Credential', url: B + enc('Git and github/git and github certificate.pdf') },
      { label: 'Coursera Certificate', url: B + enc('Git and github/git and github Coursera certificate.pdf') },
    ],
    color: '#8A5D3C',
    icon: 'fa-brands fa-git-alt',
    year: '2024',
    skills: ['Branching Strategies', 'Pull Requests & Merge Conflicts', 'CI/CD Basics'],
  },

  // Artificial Intelligence
  {
    id: 'ai-essentials',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'IBM / Coursera',
    category: 'Artificial Intelligence',
    categoryId: 'ai',
    badge: B + enc('Introduction to artificial intelligence/artificial-intelligence-essentials-v2 badge.png'),
    pdfs: [
      { label: 'IBM Credential', url: B + enc('Introduction to artificial intelligence/artificial intelligence essentials certificate.pdf') },
      { label: 'Coursera Certificate', url: B + enc('Introduction to artificial intelligence/introduction to artificial intelligence certificate.pdf') },
    ],
    color: '#8A5D3C',
    icon: 'fa-solid fa-microchip',
    year: '2024',
    skills: ['Generative AI & LLMs', 'Neural Networks', 'AI Ethics & Applications'],
  },

  // Productivity
  {
    id: 'ms-word',
    title: 'Microsoft Word Specialist',
    issuer: 'Microsoft',
    category: 'Productivity & Office',
    categoryId: 'prod',
    pdf: B + enc('Microsoft word certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-brands fa-microsoft',
    year: '2024',
    skills: ['Document Formatting', 'Technical Reports', 'Collaboration Tools'],
  },
  {
    id: 'ms-powerpoint',
    title: 'Microsoft PowerPoint Specialist',
    issuer: 'Microsoft',
    category: 'Productivity & Office',
    categoryId: 'prod',
    pdf: B + enc('Microsoft power point certificate.pdf'),
    color: '#8A5D3C',
    icon: 'fa-brands fa-microsoft',
    year: '2024',
    skills: ['Visual Presentation Design', 'Infographics', 'Storytelling'],
  },
]

/* ─── Preview Modal Component (Warm Palette) ─────────────── */
interface ModalState {
  type: 'pdf' | 'badge'
  title: string
  issuer: string
  color: string
  badgeUrl?: string
  pdfUrl?: string
  pdfs?: { label: string; url: string }[]
  activeTab?: number
}

function PreviewModal({ modal, onClose }: { modal: ModalState; onClose: () => void }) {
  const [activePdfIdx, setActivePdfIdx] = useState(modal.activeTab ?? 0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const currentPdfUrl = modal.pdfs ? modal.pdfs[activePdfIdx]?.url : modal.pdfUrl

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(14, 14, 16, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '92vh',
          backgroundColor: 'var(--soft-cream)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(14, 14, 16, 0.5), 0 0 30px rgba(138, 93, 60, 0.12)',
          border: '1px solid var(--gray-light)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--gray-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            backgroundColor: 'var(--soft-cream)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(138, 93, 60, 0.12)',
                border: '1px solid rgba(138, 93, 60, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--warm-brown)',
                fontSize: '18px',
                flexShrink: 0,
              }}
            >
              <i className={modal.type === 'pdf' ? 'fa-solid fa-certificate' : 'fa-solid fa-award'} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--deep-black)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {modal.title}
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--warm-brown)', fontWeight: 600 }}>
                {modal.issuer} • Verified Credential
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {modal.type === 'pdf' && currentPdfUrl && (
              <a
                href={currentPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  backgroundColor: 'var(--deep-black)',
                  color: 'var(--soft-cream)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '11px' }} />
                Open PDF
              </a>
            )}
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--gray-light)',
                backgroundColor: 'var(--warm-ivory)',
                color: 'var(--deep-black)',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab switcher for multi-certificate packages */}
        {modal.type === 'pdf' && modal.pdfs && modal.pdfs.length > 1 && (
          <div
            style={{
              padding: '10px 24px',
              backgroundColor: 'var(--warm-ivory)',
              borderBottom: '1px solid var(--gray-light)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Credential Variants:
            </span>
            {modal.pdfs.map((pdfItem, i) => (
              <button
                key={i}
                onClick={() => setActivePdfIdx(i)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '100px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activePdfIdx === i ? 'var(--deep-black)' : 'var(--soft-cream)',
                  color: activePdfIdx === i ? 'var(--soft-cream)' : 'var(--deep-black)',
                  boxShadow: activePdfIdx === i ? 'none' : '0 2px 6px rgba(14, 14, 16, 0.05)',
                  transition: 'all 0.2s',
                }}
              >
                {pdfItem.label}
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div
          style={{
            flex: 1,
            minHeight: '400px',
            maxHeight: '75vh',
            overflow: 'auto',
            backgroundColor: 'var(--warm-ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {modal.type === 'pdf' ? (
            currentPdfUrl ? (
              <iframe
                src={`${currentPdfUrl}#toolbar=0&navpanes=0`}
                title={modal.title}
                style={{
                  width: '100%',
                  height: '75vh',
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                }}
              />
            ) : (
              <div style={{ padding: '40px', color: 'var(--text-muted)', textAlign: 'center' }}>
                Certificate preview unavailable.
              </div>
            )
          ) : (
            <div
              style={{
                padding: '48px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                width: '100%',
              }}
            >
              {modal.badgeUrl && (
                <div
                  style={{
                    position: 'relative',
                    padding: '28px',
                    borderRadius: '24px',
                    backgroundColor: 'var(--soft-cream)',
                    boxShadow: '0 20px 40px rgba(138, 93, 60, 0.08)',
                    border: '1px solid var(--gray-light)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={modal.badgeUrl}
                    alt={modal.title}
                    style={{
                      maxWidth: '280px',
                      maxHeight: '280px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              )}
              <div style={{ textAlign: 'center', maxWidth: '440px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 14px',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(138, 93, 60, 0.1)',
                    color: 'var(--warm-brown)',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  <i className="fa-solid fa-circle-check" /> Verified Credential Badge
                </div>
                <h4 style={{ margin: '0 0 6px', color: 'var(--deep-black)', fontSize: '18px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
                  {modal.title}
                </h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
                  Digitally issued by {modal.issuer}. Confirms hands-on technical proficiency.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Skills Page ───────────────────────────────────── */
export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [modalState, setModalState] = useState<ModalState | null>(null)

  // Filtered certificates
  const filteredCerts = useMemo(() => {
    return certificates.filter((c) => {
      const matchesCategory = selectedCategory === 'all' || c.categoryId === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchesCategory

      const matchesSearch =
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Count helper
  const getCategoryCount = useCallback((catId: string) => {
    if (catId === 'all') return certificates.length
    return certificates.filter((c) => c.categoryId === catId).length
  }, [])

  // Grouped certificates by category for organized section presentation
  const groupedCategories = useMemo(() => {
    const activeCats = categories.filter((cat) => cat.id !== 'all')
    return activeCats
      .map((cat) => {
        const certs = filteredCerts.filter((c) => c.categoryId === cat.id)
        return { ...cat, certs }
      })
      .filter((group) => group.certs.length > 0)
  }, [filteredCerts])

  return (
    <PageLayout>
      {/* ── Page Header with plenty of top padding to never collide with fixed navbar ── */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '40px',
          backgroundColor: 'var(--warm-ivory)',
          textAlign: 'center',
          borderBottom: '1px solid var(--gray-light)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Section Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '100px',
              backgroundColor: 'rgba(138, 93, 60, 0.1)',
              color: 'var(--warm-brown)',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '20px',
              border: '1px solid rgba(138, 93, 60, 0.2)',
            }}
          >
            <i className="fa-solid fa-certificate" /> Verified Credentials &amp; Toolkit
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 54px)',
              fontWeight: 700,
              color: 'var(--deep-black)',
              margin: '0 0 16px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.02em',
            }}
          >
            Skills &amp; Certificates
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'var(--text-muted)',
              maxWidth: '680px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            An official showcase of technical proficiencies, university coursework, and industry
            certifications from MongoDB, IBM, Coursera, LeetCode, and HackerRank.
          </p>

          {/* ── Top 4 Domain Summary Cards (Frontend, Backend, Database, Tools & Others) ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              textAlign: 'left',
              marginTop: '20px',
            }}
          >
            {topDomains.map((domain, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--soft-cream)',
                  borderRadius: '20px',
                  border: '1px solid var(--gray-light)',
                  padding: '24px 22px',
                  boxShadow: '0 6px 20px rgba(14, 14, 16, 0.04)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'var(--warm-brown)'
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(138, 93, 60, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--gray-light)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 14, 16, 0.04)'
                }}
              >
                {/* Header with Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(138, 93, 60, 0.1)',
                      border: '1px solid rgba(138, 93, 60, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--warm-brown)',
                      fontSize: '18px',
                    }}
                  >
                    <i className={domain.icon} />
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--deep-black)',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {domain.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {domain.skills.map((skill, si) => (
                    <span
                      key={si}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '100px',
                        backgroundColor: 'var(--warm-ivory)',
                        border: '1px solid var(--gray-light)',
                        color: 'var(--deep-black)',
                        fontSize: '13px',
                        fontWeight: 500,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 100px' }}>
        
        {/* ── Filter Bar: Category Chips + Search Bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '32px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--gray-light)',
          }}
        >
          {/* Category Filter Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              flex: 1,
            }}
          >
            {categories.map((cat) => {
              const count = getCategoryCount(cat.id)
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    border: isSelected
                      ? '1px solid var(--deep-black)'
                      : '1px solid var(--gray-light)',
                    backgroundColor: isSelected ? 'var(--deep-black)' : 'var(--soft-cream)',
                    color: isSelected ? 'var(--soft-cream)' : 'var(--deep-black)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isSelected
                      ? '0 4px 14px rgba(14, 14, 16, 0.2)'
                      : '0 2px 6px rgba(14, 14, 16, 0.03)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i
                    className={cat.icon}
                    style={{
                      color: isSelected ? 'var(--soft-cream)' : 'var(--warm-brown)',
                      fontSize: '12px',
                    }}
                  />
                  <span>{cat.name}</span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '100px',
                      fontSize: '11px',
                      backgroundColor: isSelected ? 'rgba(255, 251, 242, 0.2)' : 'rgba(14, 14, 16, 0.06)',
                      color: isSelected ? 'var(--soft-cream)' : 'var(--text-muted)',
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                fontSize: '13px',
              }}
            />
            <input
              type="text"
              placeholder="Search certs (e.g. MongoDB, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 40px',
                borderRadius: '100px',
                backgroundColor: 'var(--soft-cream)',
                border: '1px solid var(--gray-light)',
                color: 'var(--deep-black)',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                boxShadow: '0 2px 8px rgba(14, 14, 16, 0.03)',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--warm-brown)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-light)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  padding: '4px',
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredCerts.length === 0 ? (
          <div
            style={{
              padding: '80px 24px',
              textAlign: 'center',
              backgroundColor: 'var(--soft-cream)',
              borderRadius: '24px',
              border: '1px dashed var(--gray-light)',
              boxShadow: '0 8px 24px rgba(14, 14, 16, 0.02)',
            }}
          >
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '36px', color: 'var(--warm-brown)', marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px', color: 'var(--deep-black)', fontSize: '20px', fontFamily: 'Georgia, serif' }}>
              No credentials found
            </h3>
            <p style={{ margin: '0 0 20px', color: 'var(--text-muted)', fontSize: '15px' }}>
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="btn btn-dark"
              style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '100px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* ── Categorized Sections (Matches user layout, styled in Warm Palette) ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {groupedCategories.map((group) => (
              <div key={group.id} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Category Section Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--gray-light)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(138, 93, 60, 0.1)',
                        border: '1px solid rgba(138, 93, 60, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--warm-brown)',
                        fontSize: '16px',
                      }}
                    >
                      <i className={group.icon} />
                    </div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'var(--deep-black)',
                        fontFamily: 'Georgia, serif',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {group.name}
                    </h2>
                  </div>

                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '100px',
                      backgroundColor: 'rgba(138, 93, 60, 0.1)',
                      color: 'var(--warm-brown)',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {group.certs.length} {group.certs.length === 1 ? 'cert' : 'certs'}
                  </span>
                </div>

                {/* Cards Grid for this category */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {group.certs.map((cert) => {
                    const hasBadge = !!cert.badge
                    const hasPdf = !!cert.pdf || (cert.pdfs && cert.pdfs.length > 0)

                    return (
                      <div
                        key={cert.id}
                        style={{
                          backgroundColor: 'var(--soft-cream)',
                          borderRadius: '20px',
                          border: '1px solid var(--gray-light)',
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '18px',
                          boxShadow: '0 6px 18px rgba(14, 14, 16, 0.03)',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)'
                          e.currentTarget.style.boxShadow = '0 14px 30px rgba(138, 93, 60, 0.12)'
                          e.currentTarget.style.borderColor = 'var(--warm-brown)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 6px 18px rgba(14, 14, 16, 0.03)'
                          e.currentTarget.style.borderColor = 'var(--gray-light)'
                        }}
                      >
                        {/* Top: Icon/Badge + Title + Issuer */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                          {hasBadge ? (
                            <div
                              onClick={() =>
                                setModalState({
                                  type: 'badge',
                                  title: cert.title,
                                  issuer: cert.issuer,
                                  color: cert.color,
                                  badgeUrl: cert.badge,
                                })
                              }
                              title="Click to inspect credential badge"
                              style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '14px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid var(--gray-light)',
                                boxShadow: '0 2px 8px rgba(14, 14, 16, 0.04)',
                                padding: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0,
                                transition: 'transform 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.06)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={cert.badge}
                                alt={cert.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '14px',
                                backgroundColor: 'rgba(138, 93, 60, 0.08)',
                                border: '1px solid rgba(138, 93, 60, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <i className={cert.icon} style={{ fontSize: '22px', color: 'var(--warm-brown)' }} />
                            </div>
                          )}

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginBottom: '4px',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  color: 'var(--warm-brown)',
                                }}
                              >
                                {cert.issuer}
                              </span>
                              <span style={{ color: 'var(--gray-light)', fontSize: '10px' }}>•</span>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                                {cert.year}
                              </span>
                            </div>

                            <h3
                              style={{
                                margin: 0,
                                fontSize: '16px',
                                fontWeight: 700,
                                color: 'var(--deep-black)',
                                lineHeight: 1.35,
                                fontFamily: 'Georgia, serif',
                              }}
                            >
                              {cert.title}
                            </h3>
                          </div>
                        </div>

                        {/* Skill Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {cert.skills.map((skill, si) => (
                            <span
                              key={si}
                              style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                padding: '4px 10px',
                                borderRadius: '6px',
                                backgroundColor: 'var(--warm-ivory)',
                                border: '1px solid var(--gray-light)',
                                color: 'var(--deep-black)',
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            paddingTop: '16px',
                            borderTop: '1px solid var(--gray-light)',
                          }}
                        >
                          {hasPdf && (
                            <button
                              onClick={() =>
                                setModalState({
                                  type: 'pdf',
                                  title: cert.title,
                                  issuer: cert.issuer,
                                  color: cert.color,
                                  pdfUrl: cert.pdf,
                                  pdfs: cert.pdfs,
                                })
                              }
                              className="btn btn-dark"
                              style={{
                                flex: 1,
                                padding: '9px 14px',
                                fontSize: '12px',
                                borderRadius: '100px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                              }}
                            >
                              <i className="fa-solid fa-file-pdf" style={{ color: 'var(--warm-brown)' }} />
                              {cert.pdfs ? `View Certs (${cert.pdfs.length})` : 'Certificate'}
                            </button>
                          )}

                          {hasBadge && (
                            <button
                              onClick={() =>
                                setModalState({
                                  type: 'badge',
                                  title: cert.title,
                                  issuer: cert.issuer,
                                  color: cert.color,
                                  badgeUrl: cert.badge,
                                })
                              }
                              style={{
                                padding: '9px 16px',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: '100px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: 'rgba(138, 93, 60, 0.1)',
                                color: 'var(--warm-brown)',
                                border: '1px solid rgba(138, 93, 60, 0.25)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--warm-brown)'
                                e.currentTarget.style.color = 'var(--soft-cream)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(138, 93, 60, 0.1)'
                                e.currentTarget.style.color = 'var(--warm-brown)'
                              }}
                            >
                              <i className="fa-solid fa-award" />
                              Badge
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Active Modal Lightbox ── */}
      {modalState && <PreviewModal modal={modalState} onClose={() => setModalState(null)} />}
    </PageLayout>
  )
}
