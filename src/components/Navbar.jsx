import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, LogOut } from 'lucide-react';
import instance from '../../utils/axios';

export default function Navbar({ currentUser, logout, cart, updateQuantity, removeFromCart, clearCart, setIsLoading, setShowDeleteModal }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const val = parseInt(item.price.replace(/[^\d]/g, ''), 10);
    return sum + (val * item.quantity);
  }, 0);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleCheckout = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const res = await instance.post('/orders/create', {
        userEmail: currentUser.email,
        userName: currentUser.name,
        items: cart.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: totalPrice
      });
      if (res.data?.success) {
        clearCart();
        setCartOpen(false);
      }
    } catch (error) {
      // Handled automatically by the global Axios error interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Row 1: Logo & Main Actions */}
        <div className="nav-row-main">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setCartOpen(false)}>
            <img 
              src="/sweet_shop_logo.png" 
              alt="Cacao & Crumb Logo" 
              style={{ height: '38px', width: '38px', borderRadius: '50%', objectFit: 'cover', background: '#fff', border: '1px solid var(--border-mid)' }} 
            />
            <span className="logo-wordmark">Cacao & Crumb</span>
          </Link>
          
          {/* Navigation Links (Desktop Only) */}
          <div className="nav-links-desktop">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/our-cakes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Our Cakes
            </NavLink>
            <NavLink to="/contact-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact Us
            </NavLink>
          </div>

          {/* Actions (Always visible) */}
          <div className="nav-actions" style={{ position: 'relative' }}>
            {/* Cart Icon & Badge */}
            {currentUser && (
              <div className="cart-icon-btn" onClick={() => { setCartOpen(!cartOpen); setUserMenuOpen(false); }} aria-label="Shopping Cart">
                <ShoppingCart size={20} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </div>
            )}

            {/* User Badge / Profile / Auth */}
            {currentUser ? (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div 
                  className="user-menu-wrap" 
                  title={currentUser.name}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setCartOpen(false);
                  }}
                >
                  <div className="user-badge">
                    {currentUser.profile ? (
                      <img src={currentUser.profile} alt={currentUser.name} />
                    ) : (
                      <span>{getInitials(currentUser.name)}</span>
                    )}
                  </div>
                  <span className="user-display-name">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </div>

                {userMenuOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-info">
                      <span className="profile-dropdown-name">{currentUser.name}</span>
                      <span className="profile-dropdown-email">{currentUser.email}</span>
                    </div>
                    <div className="profile-dropdown-actions">
                      <button 
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                          navigate('/');
                        }} 
                        className="btn btn-secondary btn-sm btn-block"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <LogOut size={13} />
                        <span>Sign Out</span>
                      </button>

                      <button 
                        onClick={() => {
                          setUserMenuOpen(false);
                          setShowDeleteModal(true);
                        }} 
                        className="btn btn-secondary btn-sm btn-block"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--red)' }}
                      >
                        <Trash2 size={13} />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}

            {/* Cart Dropdown Menu */}
            {currentUser && cartOpen && (
              <div className="cart-dropdown">
                <h4 style={{ margin: 0, fontSize: '.95rem', fontWeight: '900', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                  Shopping Cart
                </h4>
                
                {cart.length === 0 ? (
                  <div className="cart-empty-text">Your cart is empty</div>
                ) : (
                  <>
                    <div className="cart-items-list">
                      {cart.map((item) => (
                        <div key={item.id} className="cart-item-row">
                          <img src={item.image} alt={item.title} className="cart-item-img" />
                          <div className="cart-item-details">
                            <div className="cart-item-title">{item.title}</div>
                            <div className="cart-item-price">{item.price} each</div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="cart-qty-ctrls">
                            <button 
                              className="cart-qty-btn" 
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </button>
                            <span className="cart-qty-num">{item.quantity}</span>
                            <button 
                              className="cart-qty-btn" 
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button 
                            className="cart-item-remove"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="cart-total-row">
                      <span>Total:</span>
                      <span>₹{totalPrice}</span>
                    </div>

                    <button 
                      className="btn btn-primary btn-block btn-sm"
                      onClick={handleCheckout}
                      style={{ marginTop: '8px' }}
                    >
                      Checkout Order
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Navigation Links (Mobile Only - Always Visible) */}
        <div className="nav-row-links-mobile">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/our-cakes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Our Cakes
          </NavLink>
          <NavLink to="/contact-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
