import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function OurCakes({ addToCart, currentUser, addToast }) {
  const [isCakesLoading, setIsCakesLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCakesLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (cake) => {
    if (!currentUser) {
      addToast('Please login or register to add cakes to your cart!', 'warning');
      return;
    }
    addToCart(cake);
  };

  const cakes = [
    {
      id: 1,
      title: 'Chocolate Fudge Cake',
      category: 'Basic Cakes',
      desc: 'Rich, dense chocolate sponge layered with dark Belgian chocolate ganache and fudge frosting.',
      price: '₹450',
      image: '/cake_chocolate.png',
    },
    {
      id: 2,
      title: 'Double Strawberry Cream',
      category: 'Basic Cakes',
      desc: 'Light vanilla sponge filled with sliced organic strawberries and sweet chantilly fresh cream.',
      price: '₹480',
      image: '/cake_strawberry.png',
    },
    {
      id: 3,
      title: 'Classic Red Velvet',
      category: 'Basic Cakes',
      desc: 'Traditional cocoa-infused red velvet layers paired with a silky, rich cream cheese frosting.',
      price: '₹520',
      image: '/cake_velvet.png',
    },
    {
      id: 4,
      title: 'Signature Berry Cupcakes',
      category: 'Cupcakes & Cookies',
      desc: 'Gourmet cupcakes topped with strawberry cream cheese frosting and fresh organic glazed berries.',
      price: '₹350',
      image: '/hero_cupcake.png',
    },
    {
      id: 5,
      title: 'Mango Cardamom Mousse',
      category: 'Specialty Cakes',
      desc: 'Fluffy sponge cake layered with rich, aromatic mango pulp and cardamom-infused mousse.',
      price: '₹550',
      image: '/cake_mango.png',
    },
    {
      id: 6,
      title: 'Rose Pistachio Delight',
      category: 'Specialty Cakes',
      desc: 'Fragrant rosewater buttercream layers sandwiched between roasted pistachio sponge cake.',
      price: '₹590',
      image: '/cake_pistachio.png',
    }
  ];

  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container" data-aos="fade-up">
          <span className="section-label">Fresh From the Oven</span>
          <h1>Become The Sweet Tooth Master</h1>
          <p>
            Explore our curated menu of signature creations. Handcrafted daily, kept under ideal temperature control, and delivered fresh.
          </p>
        </div>
      </section>

      {/* Cakes Grid Section */}
      <section className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="cake-grid">
            {isCakesLoading ? (
              skeletons.map((num) => (
                <div className="skeleton-card" key={num}>
                  <div className="skeleton-image"></div>
                  <div className="skeleton-label"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-desc"></div>
                  <div className="skeleton-desc short"></div>
                  <div className="skeleton-footer">
                    <div className="skeleton-price"></div>
                    <div className="skeleton-btn"></div>
                  </div>
                </div>
              ))
            ) : (
              cakes.map((cake, index) => (
                <article 
                  className="cake-card" 
                  key={cake.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  <div className="cake-img-wrap">
                    <img 
                      src={cake.image} 
                      alt={cake.title} 
                      className="cake-img"
                    />
                  </div>
                  <div className="cake-body">
                    <span className="section-label" style={{ fontSize: '.68rem', marginBottom: '6px' }}>
                      {cake.category}
                    </span>
                    <h3 className="cake-title">{cake.title}</h3>
                    <p className="cake-desc">{cake.desc}</p>
                    
                    <div className="cake-footer">
                      <span className="cake-price">{cake.price}</span>
                      <button 
                        onClick={() => handleAddToCart(cake)}
                        className="btn btn-sm btn-primary"
                      >
                        <ShoppingBag size={14} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Specialty Banner */}
      <section className="section-pad" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="banner-block" data-aos="zoom-in" data-aos-duration="1000">
            <span className="section-label" style={{ color: 'rgba(237, 226, 209, 0.7)' }}>Custom Orders</span>
            <h2>Need a Custom Masterpiece?</h2>
            <p>
              From tier wedding cakes to personalized birthday designs, our chefs can create the perfect cake for your event.
            </p>
            <Link 
              to="/contact-us" 
              className="btn btn-secondary btn-large"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
