'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

const faqs = [
  {
    q: 'What technologies do you specialize in?',
    a: 'I specialize in full-stack development. My primary stack includes React, Node.js, Express, and databases like MySQL, PostgreSQL, and MongoDB. I also integrate AI APIs and work with cloud deployment tools like AWS and Docker.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most landing pages and starter projects take between 1 to 2 weeks. Complex full-stack applications with databases, authentication, and custom admin dashboards can take 4 to 8 weeks depending on the scope.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Yes, all my packages include a basic post-launch support window (usually 30 days) for bug fixes. I also offer ongoing monthly maintenance contracts for enterprise applications.',
  },
  {
    q: 'Do you provide UI/UX design services too?',
    a: 'Absolutely. As a full-stack developer with a passion for design, I can provide complete end-to-end services. I design intuitive wireframes and prototypes before writing any code to ensure we are aligned on the vision.',
  },
]

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <PageLayout>
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about working with me.</p>
      </div>

      <section className="faq-container">
        {faqs.map((faq, i) => (
          <div key={i} className="accordion-item animate-up">
            <button
              className={`accordion-header${openIndex === i ? ' active' : ''}`}
              onClick={() => toggle(i)}
            >
              {faq.q} <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div
              className="accordion-content"
              style={{ maxHeight: openIndex === i ? 300 : 0 }}
            >
              <p>{faq.a}</p>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ marginBottom: 24, fontWeight: 500 }}>Still have questions?</p>
          <Link href="/contact" className="btn btn-dark">Contact Me <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
      </section>
    </PageLayout>
  )
}

