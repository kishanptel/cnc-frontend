import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Key, Camera, Trash2 } from 'lucide-react';
import instance from '../../utils/axios';

export default function Register({ setIsLoading }) {
  const navigate = useNavigate();

  const [File, setFile] = useState(null)

  const [profilePic, setProfilePic] = useState(null);
  const [picError, setPicError] = useState('');
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile((prev) => ({
      ...prev,
      file,
    }))

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setPicError('Image file must be less than 2MB.');
        return;
      }
      setPicError('');
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setPicError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Address is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      if (File && File.file) {
        formData.append("file", File.file);
      }
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);

      setIsLoading(true);
      try {
        const res = await instance.post("/users/register", formData);
        if (res) {
          handleRemoveImage();
          resetForm();
          navigate('/our-cakes');
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <main style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', padding: '120px 20px 80px' }}>
      <div className="contact-form-card" style={{ maxWidth: '460px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(61, 35, 20, 0.08)', color: 'var(--accent)', marginBottom: '16px' }}>
            <User size={22} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '6px' }}>Create Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Join Cacao & Crumb and upload your profile picture</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="enquiry-form">

          {/* Profile Picture Upload Widget */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <label htmlFor='profile' className="form-label" style={{ alignSelf: 'flex-start' }}>Profile Picture</label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', marginTop: '8px' }}>
              {/* 3D Circular Avatar Frame */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '2px solid var(--border-dark)',
                borderBottom: '5px solid var(--border-dark)',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--ease)'
              }}>
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <User size={32} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>

              {/* Upload controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="file"
                  id='profile'
                  name="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '8px 14px 10px' }}
                  >
                    <Camera size={14} />
                    <span>Choose Photo</span>
                  </button>

                  {profilePic && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="btn btn-secondary btn-sm"
                      style={{
                        borderColor: 'rgba(193, 18, 31, 0.3)',
                        color: 'var(--red)',
                        padding: '8px 14px 10px'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <span style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>
                  Supports JPG, PNG (Max 2MB)
                </span>
              </div>
            </div>
            {picError && (
              <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600', alignSelf: 'flex-start' }}>
                {picError}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <User size={16} />
              </span>
              <input
                type="text"
                id="name"
                name='name'
                placeholder="Enter your full name"
                className="form-input"
                style={{ paddingLeft: '44px' }}
                {...formik.getFieldProps('name')}
                autoComplete='true'
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                id="email"
                name='email'
                placeholder="Enter your email"
                className="form-input"
                style={{ paddingLeft: '44px' }}
                {...formik.getFieldProps('email')}
                autoComplete='true'
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="form-group" style={{ marginBottom: '28px' }}>
            <label htmlFor="password" className="form-label">Password *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Key size={16} />
              </span>
              <input
                type="password"
                id="password"
                name='password'
                placeholder="Create a password"
                className="form-input"
                style={{ paddingLeft: '44px' }}
                {...formik.getFieldProps('password')}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <span>Register Account</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'underline' }}>
            Login here
          </Link>
        </div>
      </div>
    </main>
  );
}
