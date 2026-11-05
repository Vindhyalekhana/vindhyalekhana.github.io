'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`}>
      <header className="navbar">
        <div className="logo">
          <Image
            src="/profile.jpg"
            alt="V"
            width={32}
            height={32}
            className="logo-icon-img"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span className="logo-text">Vindhya Lekhana</span>
        </div>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/work">Projects</Link>
          <Link href="/contact">Contact</Link>
          <div className="dropdown">
            <a href="#" style={{ cursor: 'default' }}>
              More <i className="fa-solid fa-chevron-down" style={{ fontSize: 12, marginLeft: 4 }}></i>
            </a>
            <div className="dropdown-content">
              <Link href="/resume">Resume</Link>
              <Link href="/skills">Skills &amp; Certificates</Link>
              <Link href="/awards">Awards</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>
        </nav>

        <div className="nav-cta">
          <Link href="/contact" className="btn btn-primary">
            Let&apos;s Work Together <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              left: 0,
              width: '100%',
              background: 'rgba(15, 23, 42, 0.98)',
              padding: '24px',
              borderRadius: '24px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              zIndex: 999,
            }}
          >
            <Link href="/" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/work" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>Projects</Link>
            <Link href="/contact" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/resume" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>Resume</Link>
            <Link href="/skills" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>Skills &amp; Certificates</Link>
            <Link href="/awards" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>Awards</Link>
            <Link href="/blog" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/faq" style={{ color: '#E1E2E5' }} onClick={() => setMobileOpen(false)}>FAQ</Link>
          </div>
        )}
      </header>
    </div>
  )
}

