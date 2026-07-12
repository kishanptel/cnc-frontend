import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OurCakes from './pages/OurCakes';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register';
import ToastContainer from './components/ToastContainer';
import instance from '../utils/axios';

// AOS Scroll Animations
import AOS from 'aos';
import 'aos/dist/aos.css';

// Helper to scroll to top and refresh animations on route changes
function ScrollToTopAndAOS() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);

  return null;
}

export default function App() {
  // Global States
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sweet_shop_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('sweet_shop_cart', JSON.stringify(cart));
  }, [cart]);

  // AOS Init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);



  // Toast Helper Functions
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Global Axios Interceptors for auto-login and notifications
  useEffect(() => {
    if (localStorage.getItem('account_deleted_toast') === 'true') {
      addToast('Account deleted successfully.', 'success');
      localStorage.removeItem('account_deleted_toast');
    }

    const interceptor = instance.interceptors.response.use(
      (response) => {
        if (response.config.url.endsWith('/users/register') && response.data?.success) {
          const userData = response.data.Data;
          setCurrentUser({
            id: userData._id,
            name: userData.name,
            email: userData.email,
            profile: userData.profile
          });
          addToast(`Account created! Welcome, ${userData.name}!`, 'success');
        }
        return response;
      },
      (error) => {
        const errMsg = error.response?.data?.message || error.message || 'An error occurred';
        addToast(errMsg, 'error');
        return Promise.reject(error);
      }
    );
    return () => {
      instance.interceptors.response.eject(interceptor);
    };
  }, []);

  // Cart operations
  const addToCart = (cake) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cake.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { ...cake, quantity: 1 }];
      }
    });

    addToast(`${cake.title} added to your cart!`, 'success');
    return true;
  };

  const updateQuantity = (cakeId, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === cakeId) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (cakeId) => {
    const item = cart.find((i) => i.id === cakeId);
    if (item) {
      addToast(`${item.title} removed from your cart.`, 'info');
    }
    setCart((prevCart) => prevCart.filter((i) => i.id !== cakeId));
  };

  const clearCart = () => {
    setCart([]);
    addToast('Order placed successfully! Thank you for shopping with us.', 'success');
  };

  // Logout operation
  const logout = (msg = 'Logged out successfully.') => {
    setCurrentUser(null);
    setCart([]);
    if (msg) {
      addToast(msg, 'info');
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTopAndAOS />
      <div id="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar 
          currentUser={currentUser} 
          logout={logout} 
          cart={cart} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart} 
          clearCart={clearCart}
          setIsLoading={setIsLoading}
          setShowDeleteModal={setShowDeleteModal}
        />
        
        {/* Main Content Area */}
        <div style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-cakes" element={
              <OurCakes 
                addToCart={addToCart} 
                currentUser={currentUser} 
                addToast={addToast} 
                setIsLoading={setIsLoading}
              />
            } />
            <Route path="/contact-us" element={<ContactUs setIsLoading={setIsLoading} />} />
            <Route path="/login" element={
              <Login 
                setCurrentUser={setCurrentUser} 
                addToast={addToast} 
                setIsLoading={setIsLoading}
              />
            } />
            <Route path="/register" element={<Register setIsLoading={setIsLoading} />} />
            {/* Fallback for undefined routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <Footer />
        <ToastContainer toasts={toasts} removeToast={removeToast} />

        {/* Global Glassmorphic Loader Overlay */}
        {isLoading && (
          <div className="global-loader-overlay">
            <div className="loader-spinner-wrap">
              <div className="loader-circle-spinner"></div>
              <img src="/sweet_shop_logo.png" alt="Pulsing Cake" className="loader-logo-pulsing" />
            </div>
            <p className="loader-text">Baking happiness...</p>
          </div>
        )}

        {/* Custom Delete Account Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h3 className="modal-title">Delete Account?</h3>
              <p className="modal-desc">
                Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone.
              </p>
              <div className="modal-buttons">
                <button 
                  onClick={() => setShowDeleteModal(false)} 
                  className="btn btn-secondary btn-sm"
                  style={{ minWidth: '100px' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={async () => {
                    setShowDeleteModal(false);
                    setIsLoading(true);
                    try {
                      const res = await instance.delete(`/users/delete/${currentUser.id}`);
                      if (res.data?.success) {
                        localStorage.setItem('account_deleted_toast', 'true');
                        logout(null);
                        window.location.href = '/';
                      }
                    } catch (err) {
                      // Error is handled by Axios interceptor
                    } finally {
                      setIsLoading(false);
                    }
                  }} 
                  className="btn btn-primary btn-sm"
                  style={{ minWidth: '100px', background: 'var(--red)', borderColor: 'var(--red)' }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
