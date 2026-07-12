import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Cake, ShoppingBag, Users, Calendar, Award } from 'lucide-react';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <span className="section-label" data-aos="fade-up">Welcome to Cacao & Crumb</span>
          <h1 data-aos="fade-up" data-aos-delay="100">
            Love At <em>First Bite</em>
          </h1>
          <p className="hero-sub" data-aos="fade-up" data-aos-delay="200">
            Indulge in our exquisite selection of handcrafted cakes and custom orders. Baked fresh daily with only the finest organic ingredients.
          </p>
          <div className="hero-ctas" data-aos="fade-up" data-aos-delay="300">
            <RouterLink to="/our-cakes" className="btn btn-primary btn-large">
              Explore Our Cakes
            </RouterLink>
            <RouterLink to="/contact-us" className="btn btn-secondary btn-large">
              Contact Us
            </RouterLink>
          </div>

          <div className="hero-img-wrap" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1000">
            <img
              src="/hero_cake.png"
              alt="Handcrafted luxury cake with strawberry frosting"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Availability/Delivery Partners Ticker */}
      <section className="partners-ticker-section" style={{ padding: '36px 0', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }} data-aos="fade-up">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '16px' }}>
            We Are Available On
          </p>
          <div className="partners-slider-container">
            <div className="partners-slider-track">
              {/* Set 1 */}
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/swiggy/FC8019" alt="Swiggy Logo" className="partner-icon" />
                <span className="partner-brand-name">Swiggy</span>
              </div>
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/zomato/E23744" alt="Zomato Logo" className="partner-icon" />
                <span className="partner-brand-name">Zomato</span>
              </div>
              
              {/* Set 2 */}
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/swiggy/FC8019" alt="Swiggy Logo" className="partner-icon" />
                <span className="partner-brand-name">Swiggy</span>
              </div>
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/zomato/E23744" alt="Zomato Logo" className="partner-icon" />
                <span className="partner-brand-name">Zomato</span>
              </div>
              
              {/* Set 3 */}
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/swiggy/FC8019" alt="Swiggy Logo" className="partner-icon" />
                <span className="partner-brand-name">Swiggy</span>
              </div>
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/zomato/E23744" alt="Zomato Logo" className="partner-icon" />
                <span className="partner-brand-name">Zomato</span>
              </div>

              {/* Set 4 */}
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/swiggy/FC8019" alt="Swiggy Logo" className="partner-icon" />
                <span className="partner-brand-name">Swiggy</span>
              </div>
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/zomato/E23744" alt="Zomato Logo" className="partner-icon" />
                <span className="partner-brand-name">Zomato</span>
              </div>

              {/* Set 5 */}
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/swiggy/FC8019" alt="Swiggy Logo" className="partner-icon" />
                <span className="partner-brand-name">Swiggy</span>
              </div>
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/zomato/E23744" alt="Zomato Logo" className="partner-icon" />
                <span className="partner-brand-name">Zomato</span>
              </div>

              {/* Set 6 */}
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/swiggy/FC8019" alt="Swiggy Logo" className="partner-icon" />
                <span className="partner-brand-name">Swiggy</span>
              </div>
              <div className="partner-logo-item">
                <img src="https://cdn.simpleicons.org/zomato/E23744" alt="Zomato Logo" className="partner-icon" />
                <span className="partner-brand-name">Zomato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-pad" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header centered" data-aos="fade-up">
            <span className="section-label">Our Specialty</span>
            <h2 className="section-title">Our Area of Expertise</h2>
            <p className="section-sub">
              We specialize in creating unforgettable sweet experiences for every occasion. Discover our popular confectionery categories.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrap">
                <Cake size={20} />
              </div>
              <h3>Gourmet Cakes</h3>
              <p>
                Delicate, fluffy cakes with signature frosting. Baked with fresh berries, premium chocolates, and natural vanilla bean.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrap">
                <Award size={20} />
              </div>
              <h3>Artisanal Cakes</h3>
              <p>
                Perfectly layered cakes for birthdays and anniversaries. Customized styling, rich fillings, and custom flavor combinations.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon-wrap">
                <Calendar size={20} />
              </div>
              <h3>Events & Catering</h3>
              <p>
                Elevate your weddings, showers, or corporate events with our dessert stations, tailored boxes, and custom designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History and Callout Banner */}
      <section className="section-pad">
        <div className="container">
          <div className="banner-block" data-aos="zoom-in" data-aos-duration="1000">
            <span className="section-label" style={{ color: 'rgba(237, 226, 209, 0.7)' }}>Makers of Happiness Since 1991</span>
            <h2>We Accept Events And Party Orders!</h2>
            <p>
              Looking to add a touch of sweetness to your special occasion? Reach out to us for a custom quote or dessert tasting session.
            </p>
            <div className="hero-ctas" style={{ justifyContent: 'center' }}>
              <a href="tel:+91XXXXXXXXXX" className="btn btn-secondary">
                Call Us: +91 XXXXXXXXXX
              </a>
              <RouterLink
                to="/contact-us"
                className="btn btn-secondary"
                style={{
                  color: '#ede2d1',
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(237, 226, 209, 0.3)',
                  borderBottom: '4px solid rgba(237, 226, 209, 0.2)'
                }}
              >
                Send Inquiry
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header centered" data-aos="fade-up">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">Sweet Words from Our Clients</h2>
          </div>

          <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
            <blockquote className="testimonial-quote">
              “The cakes for our wedding were not only stunningly beautiful but absolutely delicious! Every guest commented on how light and flavorful they were. We could not be happier with the service and quality.”
            </blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar">MM</div>
              <div>
                <span className="testimonial-name">Mia Myers</span>
                <span className="testimonial-role" style={{ display: 'block' }}>Wedding Client</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
