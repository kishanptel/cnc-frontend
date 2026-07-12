import React from 'react';
import { ChefHat, Milestone, Sparkles, Truck } from 'lucide-react';

export default function About() {
  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1>Few Words About Sweet Shop</h1>
          <p>
            Established in 1991, we have been baking delicious memories for decades. Discover our passion and dedication to sweetness.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="about-story">
            <div data-aos="fade-right">
              <span className="section-label">Since 1991</span>
              <h2 className="section-title">A Tradition of Sweetness</h2>
              <p style={{ marginBottom: '16px', color: 'var(--text-dim)' }}>
                For over three decades, we have remained committed to one simple idea: baking high-quality, delicious confections that bring smiles to our community.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '28px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent)', marginTop: '4px' }}>
                    <ChefHat size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>Traditional Way of Baking</h4>
                    <p style={{ fontSize: '.88rem', color: 'var(--text-muted)' }}>
                      We refuse to cut corners. Our doughs are kneaded by hand, our batters are whisked to perfection, and we bake in small batches.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent)', marginTop: '4px' }}>
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>Recipes & Taste is Unchanged</h4>
                    <p style={{ fontSize: '.88rem', color: 'var(--text-muted)' }}>
                      Many of our signature cake recipes are original creations from 1991, passed down and preserved exactly as they were first loved.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-img-wrap" data-aos="fade-left" data-aos-delay="200">
              <img
                src="/bakery_interior.png"
                alt="Cozy modern bakery interior and display"
                className="about-img"
                style={{ contentVisibility: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="section-pad-sm" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" data-aos="fade-up" data-aos-delay="50">
              <div className="stat-num">338+</div>
              <div className="stat-label">Cakes Daily</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="150">
              <div className="stat-num">885+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="250">
              <div className="stat-num">3</div>
              <div className="stat-label">Chef Bakers</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="350">
              <div className="stat-num">18+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values / Expertise */}
      <section className="section-pad">
        <div className="container">
          <div className="section-header centered" data-aos="fade-up">
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title">Our Pillars of Excellence</h2>
            <p className="section-sub">
              We stand by our commitment to quality, timeliness, and customer delight in every single order we ship.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrap">
                <Sparkles size={20} />
              </div>
              <h3>Quality Products</h3>
              <p>
                We source local organic butter, real Madagascar vanilla beans, and premium Belgian chocolate. Only the absolute best goes into our ovens.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrap">
                <Milestone size={20} />
              </div>
              <h3>In Time Delivery</h3>
              <p>
                We understand that timing is everything for celebrations. Our dispatch logistics guarantee your orders arrive exactly when scheduled.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon-wrap">
                <Truck size={20} />
              </div>
              <h3>Doorstep Delivery</h3>
              <p>
                We specialize in cake-delivery vehicles keeping desserts cool and secure, ensuring they arrive at your door in pristine display condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="section-pad" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-label">Order Inquiry</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '14px', fontWeight: '800' }}>For Orders & Inquiries Call On</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent)', marginBottom: '24px', letterSpacing: '-0.03em' }}>
            +91 XXXXXXXXXX
          </div>
          <a href="tel:+91XXXXXXXXXX" className="btn btn-primary btn-large">
            Place Your Call Now
          </a>
        </div>
      </section>
    </main>
  );
}
