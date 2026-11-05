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
  { id: 'all', name: 'All Credentials', icon: 'fa-solid fa-layer-group', color: 'var(--primary-blue)' },
  { id: 'algo', name: 'Algorithms & DSA', icon: 'fa-solid fa-diagram-project', color: '#2563EB' },
  { id: 'cyber', name: 'Cybersecurity', icon: 'fa-solid fa-shield-halved', color: '#059669' },
  { id: 'db', name: 'Databases & MongoDB', icon: 'fa-solid fa-database', color: '#0D9488' },
  { id: 'ml', name: 'Python & Machine Learning', icon: 'fa-solid fa-brain', color: '#D97706' },
  { id: 'web', name: 'Web Dev & Git', icon: 'fa-solid fa-globe', color: '#DC2626' },
  { id: 'ai', name: 'Artificial Intelligence', icon: 'fa-solid fa-microchip', color: '#7C3AED' },
  { id: 'prod', name: 'Productivity', icon: 'fa-solid fa-briefcase', color: '#475569' },
]

/* ─── Certificate Data ───────────────────────────────────── */
const certificates: Certificate[] = [
  // Algorithms & DSA
  {
    id: 'dsa-basics',
    title: 'Basics of Data Structures and Algorithms',
    issuer: 'Coursera',
    category: 'Algorithms & DSA',
    categoryId: 'algo',
    pdf: B + enc('Basics of Data structure and algorithms certificate.pdf'),
    color: '#2563EB',
    icon: 'fa-solid fa-sitemap',
    year: '2024',
    skills: ['Data Structures', 'Arrays & Linked Lists', 'Time Complexity'],
  },
  {
    id: 'daa',
    title: 'Design and Analysis of Algorithms',
    issuer: 'Coursera',
    category: 'Algorithms & DSA',
    categoryId: 'algo',
    pdf: B + enc('Design analysis and algorithms certificate.pdf'),
    color: '#2563EB',
    icon: 'fa-solid fa-code-branch',
    year: '2024',
    skills: ['Dynamic Programming', 'Greedy Algorithms', 'Graph Algorithms'],
  },
  {
    id: 'leetcode-75',
    title: 'LeetCode Data Structures 75 Badge',
    issuer: 'LeetCode',
    category: 'Algorithms & DSA',
    categoryId: 'algo',
    badge: B + enc('leet code data structures 75 badge.png'),
    color: '#D97706',
    icon: 'fa-solid fa-award',
    year: '2024',
    skills: ['75 Curated DSA Problems', 'Binary Trees', 'Heaps & Graphs'],
  },
  {
    id: 'leetcode-sql50',
    title: 'LeetCode SQL 50 Badge',
    issuer: 'LeetCode',
    category: 'Algorithms & DSA',
    categoryId: 'algo',
    badge: B + enc('leet code sql50 badge.png'),
    color: '#D97706',
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
    color: '#059669',
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
    color: '#059669',
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
    color: '#059669',
    icon: 'fa-solid fa-lock',
    year: '2024',
    skills: ['Identity & Access Management', 'Malware Analysis', 'Zero Trust'],
  },

  // Databases & MongoDB
  {
    id: 'db-fundamentals',
    title: 'Introduction to Fundamentals of Databases',
    issuer: 'Coursera',
    category: 'Databases & MongoDB',
    categoryId: 'db',
    pdf: B + enc('Introduction to the Fundamentals of Databases.pdf'),
    color: '#7C3AED',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#0D9488',
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
    color: '#D97706',
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
    color: '#D97706',
    icon: 'fa-solid fa-brain',
    year: '2024',
    skills: ['Regression & Classification', 'Scikit-Learn', 'Model Evaluation & Clustering'],
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
    color: '#DC2626',
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
    color: '#EA580C',
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
    color: '#7C3AED',
    icon: 'fa-solid fa-microchip',
    year: '2024',
    skills: ['Generative AI & LLMs', 'Neural Networks', 'AI Ethics & Applications'],
  },

  // Productivity
  {
    id: 'ms-word',
    title: 'Microsoft Word Specialist',
    issuer: 'Microsoft',
    category: 'Productivity',
    categoryId: 'prod',
    pdf: B + enc('Microsoft word certificate.pdf'),
    color: '#185ABD',
    icon: 'fa-brands fa-microsoft',
    year: '2024',
    skills: ['Document Formatting', 'Technical Reports', 'Collaboration Tools'],
  },
  {
    id: 'ms-powerpoint',
    title: 'Microsoft PowerPoint Specialist',
    issuer: 'Microsoft',
    category: 'Productivity',
    categoryId: 'prod',
    pdf: B + enc('Microsoft power point certificate.pdf'),
    color: '#D24726',
    icon: 'fa-brands fa-microsoft',
    year: '2024',
    skills: ['Visual Presentation Design', 'Infographics', 'Storytelling'],
  },
]

/* ─── Technical Skill Categories ─────────────────────────── */
const technicalSkills = [
  {
    category: 'Frontend Development',
    icon: 'fa-solid fa-code',
    color: '#2563EB',
    skills: [
      { name: 'HTML5 & CSS3', level: 'Advanced', percent: 92 },
      { name: 'JavaScript (ES6+)', level: 'Advanced', percent: 88 },
      { name: 'React.js & Next.js', level: 'Proficient', percent: 84 },
      { name: 'Tailwind CSS & Responsive UI', level: 'Advanced', percent: 90 },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: 'fa-solid fa-server',
    color: '#059669',
    skills: [
      { name: 'Node.js & Express.js', level: 'Proficient', percent: 82 },
      { name: 'Python', level: 'Proficient', percent: 85 },
      { name: 'RESTful API Architecture', level: 'Proficient', percent: 86 },
      { name: 'Authentication & Security', level: 'Intermediate', percent: 78 },
    ],
  },
  {
    category: 'Databases & Storage',
    icon: 'fa-solid fa-database',
    color: '#0D9488',
    skills: [
      { name: 'MongoDB & Aggregation', level: 'Certified Expert', percent: 92 },
      { name: 'SQL & Relational Design', level: 'Certified', percent: 86 },
      { name: 'Schema Optimization & Indexing', level: 'Certified', percent: 88 },
      { name: 'MySQL & PostgreSQL', level: 'Proficient', percent: 80 },
    ],
  },
  {
    category: 'DevOps, AI & Security',
    icon: 'fa-solid fa-shield-halved',
    color: '#7C3AED',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Certified', percent: 90 },
      { name: 'Machine Learning (Scikit-Learn)', level: 'Certified', percent: 76 },
      { name: 'Cybersecurity Principles', level: 'Certified', percent: 80 },
      { name: 'Cloud & Vercel Deployment', level: 'Proficient', percent: 82 },
    ],
  },
]

/* ─── Preview Modal Component (Clean Light / Dark Hybrid) ─ */
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
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(33, 94, 253, 0.08)',
                border: '1px solid rgba(33, 94, 253, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <i
                className={modal.type === 'badge' ? 'fa-solid fa-award' : 'fa-solid fa-file-pdf'}
                style={{ color: 'var(--primary-blue)', fontSize: '18px' }}
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--black)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  letterSpacing: '-0.01em',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {modal.title}
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                Issued by <strong style={{ color: 'var(--text-dark)' }}>{modal.issuer}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {modal.type === 'pdf' && currentPdfUrl && (
              <a
                href={currentPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  borderRadius: '100px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                }}
              >
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '11px' }} />
                Open Fullscreen
              </a>
            )}
            {modal.type === 'badge' && modal.badgeUrl && (
              <a
                href={modal.badgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  borderRadius: '100px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                }}
              >
                <i className="fa-solid fa-download" style={{ fontSize: '12px' }} />
                Original Badge
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                color: 'var(--text-dark)',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                e.currentTarget.style.color = '#EF4444'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
                e.currentTarget.style.color = 'var(--text-dark)'
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
              backgroundColor: '#F8F9FA',
              borderBottom: '1px solid #E2E8F0',
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
                  backgroundColor: activePdfIdx === i ? 'var(--black)' : '#FFFFFF',
                  color: activePdfIdx === i ? '#FFFFFF' : 'var(--text-dark)',
                  boxShadow: activePdfIdx === i ? 'none' : '0 2px 6px rgba(0,0,0,0.05)',
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
            backgroundColor: '#F8F9FA',
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
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
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
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#059669',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  <i className="fa-solid fa-circle-check" /> Verified Credential Badge
                </div>
                <h4 style={{ margin: '0 0 6px', color: 'var(--black)', fontSize: '18px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
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
  const [viewMode, setViewMode] = useState<'certificates' | 'skills'>('certificates')

  // Filter certificates based on search query and category
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

  return (
    <PageLayout>
      {/* ── Standard Light Page Header (Matches About, Resume, Work, etc.) ── */}
      <div className="page-header">
        <div className="section-badge" style={{ marginBottom: 16 }}>
          <i className="fa-solid fa-certificate"></i> Verified Credentials &amp; Toolkit
        </div>
        <h1>Skills &amp; Certificates</h1>
        <p>
          An official showcase of my technical proficiencies, university coursework,
          and industry certifications from MongoDB, IBM, Coursera, LeetCode, and HackerRank.
        </p>

        {/* Quick Metrics Strip */}
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            marginTop: '36px',
            padding: '16px 40px',
            borderRadius: '100px',
            backgroundColor: 'var(--white)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--primary-blue)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
              23+
            </span>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
              Certifications
            </div>
          </div>
          <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--gray-light)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#059669', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
              8+
            </span>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
              MongoDB Badges
            </div>
          </div>
          <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--gray-light)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#D97706', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
              100%
            </span>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
              Verifiable
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Container (Light Theme) ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 100px' }}>
        
        {/* ── View Switcher & Live Search Row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '36px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--gray-light)',
          }}
        >
          {/* Mode Switcher */}
          <div
            style={{
              display: 'inline-flex',
              padding: '6px',
              borderRadius: '100px',
              backgroundColor: 'var(--white)',
              border: '1px solid var(--gray-light)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            }}
          >
            <button
              onClick={() => setViewMode('certificates')}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: viewMode === 'certificates' ? 'var(--black)' : 'transparent',
                color: viewMode === 'certificates' ? 'var(--white)' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fa-solid fa-stamp" />
              Certificates &amp; Badges ({certificates.length})
            </button>
            <button
              onClick={() => setViewMode('skills')}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: viewMode === 'skills' ? 'var(--black)' : 'transparent',
                color: viewMode === 'skills' ? 'var(--white)' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              <i className="fa-solid fa-layer-group" />
              Core Tech Stack
            </button>
          </div>

          {/* Search Box */}
          {viewMode === 'certificates' && (
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '14px',
                }}
              />
              <input
                type="text"
                placeholder="Search certs (e.g. MongoDB, Python, LeetCode)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 18px 12px 44px',
                  borderRadius: '100px',
                  backgroundColor: 'var(--white)',
                  border: '1px solid var(--gray-light)',
                  color: 'var(--black)',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-blue)'
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
                    right: '14px',
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
          )}
        </div>

        {/* ── Mode 1: CERTIFICATES & BADGES ── */}
        {viewMode === 'certificates' && (
          <div>
            {/* Category Filter Chips */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '32px',
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
                      padding: '8px 18px',
                      borderRadius: '100px',
                      border: isSelected
                        ? '1px solid var(--primary-blue)'
                        : '1px solid var(--gray-light)',
                      backgroundColor: isSelected ? 'var(--primary-blue)' : 'var(--white)',
                      color: isSelected ? 'var(--white)' : 'var(--text-dark)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: isSelected
                        ? '0 6px 18px rgba(33, 94, 253, 0.25)'
                        : '0 2px 8px rgba(0, 0, 0, 0.02)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <i
                      className={cat.icon}
                      style={{
                        color: isSelected ? 'var(--white)' : cat.color,
                        fontSize: '12px',
                      }}
                    />
                    <span>{cat.name}</span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '100px',
                        fontSize: '11px',
                        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.06)',
                        color: isSelected ? 'var(--white)' : 'var(--text-muted)',
                        fontWeight: 700,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Filter Counter / Reset Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
              }}
            >
              <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-muted)' }}>
                Showing <strong style={{ color: 'var(--black)' }}>{filteredCerts.length}</strong> verified{' '}
                {filteredCerts.length === 1 ? 'credential' : 'credentials'}
                {searchQuery && (
                  <span>
                    {' '}
                    matching &ldquo;<span style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>{searchQuery}</span>&rdquo;
                  </span>
                )}
              </p>
              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-blue)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa-solid fa-rotate-left" style={{ fontSize: '11px' }} />
                  Reset all filters
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredCerts.length === 0 ? (
              <div
                style={{
                  padding: '80px 24px',
                  textAlign: 'center',
                  backgroundColor: 'var(--white)',
                  borderRadius: '24px',
                  border: '1px dashed var(--gray-light)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
                }}
              >
                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '36px', color: 'var(--text-muted)', marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px', color: 'var(--black)', fontSize: '20px', fontFamily: 'Georgia, serif' }}>
                  No credentials found
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '15px' }}>
                  Try adjusting your search query or selecting a different category.
                </p>
              </div>
            ) : (
              /* Certificate Cards Grid */
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '24px',
                }}
              >
                {filteredCerts.map((cert) => {
                  const hasBadge = !!cert.badge
                  const hasPdf = !!cert.pdf || (cert.pdfs && cert.pdfs.length > 0)

                  return (
                    <div
                      key={cert.id}
                      style={{
                        backgroundColor: 'var(--white)',
                        borderRadius: '24px',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        padding: '28px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '20px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)'
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)'
                        e.currentTarget.style.borderColor = 'rgba(33, 94, 253, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.04)'
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      {/* Top Row: Thumbnail/Icon + Title & Issuer */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
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
                            title="Click to inspect badge"
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '16px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid rgba(0, 0, 0, 0.08)',
                              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
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
                              width: '64px',
                              height: '64px',
                              borderRadius: '16px',
                              backgroundColor: 'rgba(33, 94, 253, 0.08)',
                              border: '1px solid rgba(33, 94, 253, 0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <i className={cert.icon} style={{ fontSize: '26px', color: 'var(--primary-blue)' }} />
                          </div>
                        )}

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '6px',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                color: 'var(--primary-blue)',
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
                              fontSize: '17px',
                              fontWeight: 700,
                              color: 'var(--black)',
                              lineHeight: 1.35,
                              fontFamily: 'Georgia, serif',
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {cert.title}
                          </h3>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {cert.skills.map((skill, si) => (
                          <span
                            key={si}
                            style={{
                              fontSize: '12px',
                              fontWeight: 500,
                              padding: '4px 10px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(0, 0, 0, 0.03)',
                              border: '1px solid rgba(0, 0, 0, 0.04)',
                              color: 'var(--text-dark)',
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
                          paddingTop: '18px',
                          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
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
                              padding: '10px 16px',
                              fontSize: '13px',
                              borderRadius: '100px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                            }}
                          >
                            <i className="fa-solid fa-file-pdf" style={{ color: '#EF4444' }} />
                            {cert.pdfs ? `View Certs (${cert.pdfs.length})` : 'View Certificate'}
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
                            className="btn btn-primary"
                            style={{
                              padding: '10px 16px',
                              fontSize: '13px',
                              borderRadius: '100px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <i className="fa-solid fa-award" style={{ color: '#D97706' }} />
                            Badge
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Mode 2: CORE TECH STACK ── */}
        {viewMode === 'skills' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {technicalSkills.map((domain, di) => (
                <div
                  key={di}
                  style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: '24px',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    padding: '32px 28px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '28px',
                  }}
                >
                  {/* Domain Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(33, 94, 253, 0.08)',
                        border: '1px solid rgba(33, 94, 253, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <i className={domain.icon} style={{ fontSize: '20px', color: 'var(--primary-blue)' }} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--black)', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
                        {domain.category}
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                        Production Tested
                      </p>
                    </div>
                  </div>

                  {/* Skills Progress List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {domain.skills.map((skill, si) => (
                      <div key={si}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px',
                          }}
                        >
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>
                            {skill.name}
                          </span>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: 'var(--primary-blue)',
                              padding: '2px 10px',
                              borderRadius: '100px',
                              backgroundColor: 'rgba(33, 94, 253, 0.08)',
                            }}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: '7px',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '100px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${skill.percent}%`,
                              height: '100%',
                              borderRadius: '100px',
                              backgroundColor: 'var(--primary-blue)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Link back to certificates */}
            <div
              style={{
                marginTop: '48px',
                padding: '32px 36px',
                borderRadius: '24px',
                backgroundColor: 'var(--blue-light)',
                border: '1px solid rgba(33, 94, 253, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 6px', color: 'var(--black)', fontSize: '18px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
                  Ready to inspect credentials?
                </h4>
                <p style={{ margin: 0, color: 'var(--text-dark)', fontSize: '15px' }}>
                  Explore 23+ individual course certificates and official badges with live PDF preview.
                </p>
              </div>
              <button
                onClick={() => setViewMode('certificates')}
                className="btn btn-dark"
                style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '100px' }}
              >
                Browse All Certificates <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Active Modal Lightbox ── */}
      {modalState && <PreviewModal modal={modalState} onClose={() => setModalState(null)} />}
    </PageLayout>
  )
}
