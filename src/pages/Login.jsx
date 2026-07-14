import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Key, Mail } from 'lucide-react';
import instance from '../../utils/axios';

export default function Login({ setCurrentUser, addToast, setIsLoading }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const res = await instance.post('/users/login', {
          email: values.email,
          password: values.password
        });
        if (res.data?.success) {
          const userData = res.data.Data;
          const userPayload = {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            profile: userData.profile
          };
          if (values.rememberMe) {
            localStorage.setItem('cacaoncrumb_user', JSON.stringify(userPayload));
          } else {
            sessionStorage.setItem('cacaoncrumb_user', JSON.stringify(userPayload));
          }
          setCurrentUser(userPayload);
          addToast(`Welcome back, ${userData.name}!`, 'success');
          resetForm();
          navigate('/our-cakes');
        }
      } catch (error) {
        // Handled automatically by the global Axios error interceptor
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', padding: '120px 20px 80px' }}>
      <div className="contact-form-card" style={{ maxWidth: '440px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(61, 35, 20, 0.08)', color: 'var(--accent)', marginBottom: '16px' }}>
            <LogIn size={22} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '6px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Login to manage your sweet orders and profile</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="enquiry-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
              </span>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                className="form-input"
                style={{ paddingLeft: '44px' }}
                {...formik.getFieldProps('email')}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: '6px', fontWeight: '600' }}>
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="password" className="form-label">Password *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Key size={16} />
              </span>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
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

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <input 
              type="checkbox" 
              id="rememberMe" 
              {...formik.getFieldProps('rememberMe')}
              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--accent)' }}
            />
            <label htmlFor="rememberMe" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer', userSelect: 'none' }}>
              Remember Me
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <span>Sign In</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'underline' }}>
            Register here
          </Link>
        </div>
      </div>
    </main>
  );
}
