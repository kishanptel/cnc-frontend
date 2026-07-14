import React from 'react';
import { Link } from 'react-router-dom';
import { Cake } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img
                src="/cacaoncrumb_logo.png"
                alt="Cacao & Crumb Logo"
                style={{ height: '38px', width: '38px', borderRadius: '50%', objectFit: 'cover', background: '#fff', border: '1px solid var(--border-mid)', padding: '2px' }}
              />
              <span className="logo-wordmark">Cacao & Crumb</span>
            </Link>
            <p style={{ marginTop: '16px' }}>
              Baked with love and premium ingredients since 1991. Delivering joy to your doorstep, one slice at a time.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/our-cakes">Our Cakes</Link>
              <Link to="/contact-us">Contact Us</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Visit Us</h4>
            <div className="footer-links">
              <span style={{ fontSize: '.85rem', display: 'block', marginBottom: '8px' }}>
                Plot No. 45, XYZ, Surat - 666777
              </span>
              <a href="tel:+91XXXXXXXXXX">Tel: +91 XXXXXXXXXX</a>
              <a href="mailto:info@cacaoncrumb.com">info@cacaoncrumb.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {currentYear} Cacao & Crumb. All rights reserved.</span>
          <span style={{ opacity: 0.6 }}>Designed by kishan.</span>
        </div>
      </div>
    </footer>
  );
}
