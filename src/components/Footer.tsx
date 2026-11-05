import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">
            <Image
              src="/profile.jpg"
              alt="V"
              width={32}
              height={32}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span className="logo-text" style={{ color: 'var(--white)' }}>Vindhya Lekhana</span>
          </div>
          <p>Building scalable web applications, modern user experiences, and real-world software solutions.</p>
          <div className="social-links" style={{ justifyContent: 'flex-start', gap: 16 }}>
            <a href="https://github.com/Vindhyalekhana" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/vindhyalekhana/" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Navigation</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About Me</Link>
            <Link href="/work">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <Link href="/resume">Resume</Link>
            <Link href="/skills">Skills &amp; Certs</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:vindhyalekhana@gmail.com">vindhyalekhana@gmail.com</a>
            <a href="tel:+919032023235">+91 9032023235</a>
            <Link href="/contact">Send a Message</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Vindhya Lekhana. All Rights Reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

