import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import instance from '../../utils/axios';

export default function ContactUs({ setIsLoading }) {
  const [submitted, setSubmitted] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Address is required'),
    subject: Yup.string(),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .required('Message is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const res = await instance.post('/contacts/inquiry', values);
        if (res.data?.success) {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 5000);
          resetForm();
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      {/* Page Header */}
      <section className="page-header">
        <div className="container" data-aos="fade-up">
          <span className="section-label">Get in Touch</span>
          <h1>Send Us A Message</h1>
          <p>
            Have questions about catering, custom orders, or delivery zones? Reach out to our bakers and we'll reply shortly.
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="contact-wrap">
            {/* Left Column: Info & Hours */}
            <div className="contact-info-col" data-aos="fade-right">
              <span className="section-label">Connect</span>
              <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>How to Reach Us</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '.92rem' }}>
                Give us a call, drop an email, or stop by our storefront in Surat. We'd love to help you plan your next celebration.
              </p>

              <div className="contact-methods">
                <div className="contact-method-card">
                  <div className="contact-icon-wrap">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="contact-method-label">Call Us</div>
                    <a href="tel:+91XXXXXXXXXX" className="contact-method-value" style={{ color: 'var(--navy)', display: 'block' }}>
                      +91 XXXXXXXXXX
                    </a>
                  </div>
                </div>

                <div className="contact-method-card">
                  <div className="contact-icon-wrap">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="contact-method-label">Email Us</div>
                    <a href="mailto:info@cacaoncrumb.com" className="contact-method-value" style={{ color: 'var(--navy)', display: 'block' }}>
                      info@cacaoncrumb.com
                    </a>
                  </div>
                </div>

                <div className="contact-method-card">
                  <div className="contact-icon-wrap">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="contact-method-label">Visit Us</div>
                    <div className="contact-method-value">
                      Plot No. 45, XYZ, Surat - 666777
                    </div>
                  </div>
                </div>
              </div>

              <div className="working-hours-card">
                <div className="working-hours-header">
                  <Clock size={18} />
                  <h4>Working Hours</h4>
                </div>
                <div className="working-hours-row">
                  <span className="working-hours-day">Monday to Friday</span>
                  <span className="working-hours-time">9:00 AM - 6:00 PM</span>
                </div>
                <div className="working-hours-row no-border">
                  <span className="working-hours-day">Saturday</span>
                  <span className="working-hours-time">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form-card" data-aos="fade-left" data-aos-delay="200">
              <span className="section-label">Inquiry Form</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>Send us a Message</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '.85rem', marginBottom: '24px' }}>
                Fill out the details below and we will get back to you within 24 hours.
              </p>

              {submitted && (
                <div style={{ padding: '16px', background: '#e6f4ea', color: '#137333', borderRadius: 'var(--r-sm)', fontSize: '.88rem', fontWeight: '600', marginBottom: '20px', border: '1px solid #13733320', textAlign: 'center' }}>
                  Thank you! Your message has been sent successfully. We will contact you soon.
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="enquiry-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="form-input"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="form-input"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject of inquiry"
                    className="form-input"
                    {...formik.getFieldProps('subject')}
                  />
                  {formik.touched.subject && formik.errors.subject ? (
                    <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                      {formik.errors.subject}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    placeholder="Describe your inquiry or order details..."
                    className="form-input form-textarea"
                    {...formik.getFieldProps('message')}
                  ></textarea>
                  {formik.touched.message && formik.errors.message ? (
                    <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                      {formik.errors.message}
                    </div>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '10px' }}>
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
