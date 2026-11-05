import type { Metadata } from 'next'
import PageLayout from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Contact — Vindhya Lekhana',
}

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="page-header" style={{ padding: '100px 20px 60px', textAlign: 'center', background: 'var(--blue-light)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--black)' }}>Contact Me</h1>
        <p style={{ fontSize: 20, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>Have a project in mind or just want to say hi? I&apos;d love to hear from you.</p>
      </div>

      <section className="contact-section">
        <div className="contact-info">
          <h2>Let&apos;s build something amazing together.</h2>
          <p>I&apos;m currently available for freelance projects, open-source collaborations, and exciting full-time opportunities. Reach out via email or connect with me on LinkedIn.</p>

          <div className="info-card">
            <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
            <div className="info-content">
              <h3>Email</h3>
              <a href="mailto:vindhyalekhana@gmail.com">vindhyalekhana@gmail.com</a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
            <div className="info-content">
              <h3>Phone</h3>
              <a href="tel:+919032023235">+91 9032023235</a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><i className="fa-brands fa-linkedin-in"></i></div>
            <div className="info-content">
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/vindhyalekhana/" target="_blank" rel="noopener noreferrer">linkedin.com/in/vindhyalekhana</a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form action="https://formspree.io/f/xvgzvpyq" method="POST" className="contact-form">
            <div className="form-group">
              <input type="text" id="name" name="name" className="form-control" placeholder=" " required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" className="form-control" placeholder=" " required />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className="form-group">
              <input type="text" id="subject" name="subject" className="form-control" placeholder=" " required />
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="form-group">
              <textarea id="message" name="message" className="form-control" placeholder=" " required></textarea>
              <label htmlFor="message">Message</label>
            </div>
            <button type="submit" className="btn-submit">
              Send Message <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  )
}

