import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/hero-candles.jpg";
import festiveImage from "@/assets/festive-candles.jpg";
import giftImage from "@/assets/gift-candles.jpg";
import returnGiftImage from "@/assets/return-gift-candles.jpg";
import homeDecorImage from "@/assets/home-decor-candles.jpg";
import { sanityClient, urlFor } from "@/lib/sanityClient";
import logo from "@/assets/logo.png";

// Add Collection type
type Collection = {
  _id: string;
  title: string;
  description: string;
  image: any;
  category: string;
};

// Add Product type
type Product = {
  _id: string;
  name: string;
  description: string;
  image: any;
  price: string;
  collection?: { _ref: string };
  featured: boolean;
};

// Add Testimonial type
type Testimonial = {
  _id: string;
  name: string;
  review: string;
  rating: number;
};

// Add About type
type About = {
  _id: string;
  heading: string;
  content: string;
  image: any;
};

// Add Social type
type Social = {
  _id: string;
  instagram: string;
};

const Index = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [about, setAbout] = useState<About | null>(null);
  const [social, setSocial] = useState<Social | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    // Fetch collections
    sanityClient
      .fetch(
        `*[_type == "collection"]{_id, title, description, image, category}`
      )
      .then((data) => {
        setCollections(data);
        console.log("Collections from Sanity:", data);
      });
    // Fetch all products (for filtering later)
    sanityClient
      .fetch(
        `*[_type == "product"]{_id, name, description, image, price, collection, featured}`
      )
      .then((data) => {
        setProducts(data);
        setFeaturedProducts(data.filter((p: Product) => p.featured).slice(0, 6));
        console.log("Products from Sanity:", data);
      });
    // Fetch testimonials
    sanityClient
      .fetch(
        `*[_type == "testimonial"]{_id, name, review, rating}`
      )
      .then((data) => setTestimonials(data));
    // Fetch about
    sanityClient
      .fetch(
        `*[_type == "about"][0]{_id, heading, content, image}`
      )
      .then((data) => setAbout(data));
    // Fetch social
    sanityClient
      .fetch(
        `*[_type == "social"][0]{_id, instagram}`
      )
      .then((data) => setSocial(data));
  }, []);

  // Filter products when a collection is selected
  useEffect(() => {
    if (selectedCollection) {
      setFilteredProducts(
        products.filter(
          (product) => product.collection && product.collection._ref === selectedCollection._id
        )
      );
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCollection, products]);

  // Add close on Escape and lock scroll on mobile menu open
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-premium font-inter overflow-hidden">
      {/* Sticky Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/40 backdrop-blur-xl flex items-center justify-between px-6 py-1 shadow-lg md:hidden border-b border-gold/20 rounded-b-2xl" style={{boxShadow: '0 4px 32px 0 rgba(212,175,55,0.08)'}}>
        <div className="shadow-gold flex items-center justify-center" style={{boxShadow: '0 0 12px 2px rgba(212,175,55,0.12)'}}>
          <img src={logo} alt="The Fancy Candle by Pallavi logo" className="h-16 w-auto object-contain drop-shadow-lg" style={{ maxHeight: 64, minWidth: 64, filter: 'drop-shadow(0 0 8px #e6c97a88)' }} />
        </div>
        {/* Hamburger/X Icon */}
        <button
          className="w-12 h-12 flex items-center justify-center text-gold focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-200 hover:text-white hover:bg-gold/20 self-center"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-drawer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative w-7 h-7 block">
            <span
              className={`absolute left-0 top-2 w-7 h-1 bg-gold rounded transition-transform transition-[top] duration-300 ease-in-out ${menuOpen ? 'rotate-45 top-4' : ''}`}
            ></span>
            <span
              className={`absolute left-0 top-5 w-7 h-1 bg-gold rounded transition-all duration-200 ease-in-out ${menuOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`absolute left-0 top-8 w-7 h-1 bg-gold rounded transition-transform transition-[top] duration-300 ease-in-out ${menuOpen ? '-rotate-45 top-4' : ''}`}
            ></span>
          </span>
        </button>
        {/* Gold gradient accent bar */}
        <div className="absolute left-0 right-0 bottom-0 h-1 rounded-b-xl bg-gradient-to-r from-gold via-gold-light to-gold/60 opacity-80 pointer-events-none shadow-lg" style={{zIndex:2}} />
      </header>
      {/* Mobile Drawer & Overlay */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <nav
            id="mobile-menu-drawer"
            className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white/70 backdrop-blur-lg border-l border-white/30 shadow-2xl flex flex-col py-8 px-6 rounded-l-2xl transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0 animate-slide-in' : 'translate-x-full'}`}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="self-end mb-8 text-charcoal hover:text-gold focus:outline-none"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="22" y2="22"/><line x1="6" y1="22" x2="22" y2="6"/></svg>
            </button>
            <ul className="flex flex-col gap-6 text-lg font-semibold text-charcoal mt-4">
              <li><a href="#" className="py-3 px-2 rounded-lg transition-colors duration-200 hover:text-gold active:bg-gold/10" onClick={e => { e.preventDefault(); setMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Home</a></li>
              <li><a href="#collections" className="py-3 px-2 rounded-lg transition-colors duration-200 hover:text-gold active:bg-gold/10" onClick={e => { e.preventDefault(); setMenuOpen(false); document.getElementById('collections')?.scrollIntoView({behavior: 'smooth'}); }}>Collections</a></li>
              <li><a href="#about" className="py-3 px-2 rounded-lg transition-colors duration-200 hover:text-gold active:bg-gold/10" onClick={e => { e.preventDefault(); setMenuOpen(false); document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}); }}>About</a></li>
              <li><a href="#testimonials" className="py-3 px-2 rounded-lg transition-colors duration-200 hover:text-gold active:bg-gold/10" onClick={e => { e.preventDefault(); setMenuOpen(false); document.getElementById('testimonials')?.scrollIntoView({behavior: 'smooth'}); }}>Testimonials</a></li>
              <li><a href="#contact" className="py-3 px-2 rounded-lg transition-colors duration-200 hover:text-gold active:bg-gold/10" onClick={e => { e.preventDefault(); setMenuOpen(false); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}); }}>Contact</a></li>
            </ul>
            <div className="mt-10 flex gap-6 justify-center">
              <a href={social?.instagram || 'https://instagram.com/the_fancy_candles_by_pallavi'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] via-[#8134af] to-[#515bd4] text-white text-xl shadow-lg hover:scale-110 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3h9A4.5 4.5 0 0121 7.5v9A4.5 4.5 0 0116.5 21h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3zm9.75 2.25h.008v.008h-.008v-.008zM12 8.25A3.75 3.75 0 1112 15.75a3.75 3.75 0 010-7.5z" />
                </svg>
              </a>
              <a href="https://wa.me/message/JVVEFSG6NLWVH1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-xl shadow-lg hover:scale-110 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.67 6.13L0 24l6.25-1.64A12.09 12.09 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22a9.93 9.93 0 01-5.09-1.39l-.36-.21-3.71.98.99-3.62-.23-.37A9.94 9.94 0 1122 12c0 5.52-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.34.99 2.64 1.13 2.82.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
                </svg>
              </a>
            </div>
          </nav>
          <style>{`
            @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          `}</style>
        </>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[420px] flex items-center justify-center overflow-hidden pt-16 md:pt-0">
        {/* Hero Image with dark overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
        </div>
        {/* Animated bokeh/floating candle */}
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-gold/20 rounded-full blur-2xl pointer-events-none animate-bokeh-float" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-blush/20 rounded-full blur-2xl pointer-events-none animate-bokeh-float" style={{animationDelay: '0.8s'}}></div>
        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="font-playfair text-4xl xs:text-5xl sm:text-6xl font-bold mb-2 leading-tight text-white drop-shadow-xl animate-hero-title-fade">
              The Fancy Candles
              <span className="block mt-2 animate-hero-fade-in">
                <span className="inline-block px-4 py-1 rounded-full bg-black/60 text-white font-semibold text-base shadow-lg" style={{letterSpacing: '0.18em', textShadow: '0 2px 8px rgba(0,0,0,0.32)'}}>by Pallavi</span>
              </span>
            </h1>
            {/* Gold underline accent */}
            <div className="mx-auto mb-6 mt-2 w-20 h-1 rounded-full bg-gradient-to-r from-gold to-gold-light opacity-80 animate-hero-underline-fade"></div>
            <p className="text-base xs:text-lg mb-8 font-light text-white/90 animate-hero-tagline-fade">
              Handcrafted elegance for every occasion
            </p>
            <Button 
              variant="luxury" 
              size="lg" 
              aria-label="Explore our candle collection"
              onClick={() => scrollToSection('collections')}
              className="text-base xs:text-lg px-8 py-3 rounded-full bg-gradient-to-r from-gold to-gold-light shadow-lg hover:shadow-gold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 hover:scale-105 hover:glow animate-hero-btn-fade"
            >
              Explore Our Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
      <section className="py-20 px-4 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-peach/10 via-transparent to-blush/10"></div>
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-gradient-luxury opacity-5 rounded-full blur-3xl animate-float animation-delay-200"></div>
        <div className="absolute bottom-1/4 right-10 w-28 h-28 bg-gradient-shimmer opacity-8 rounded-full blur-2xl animate-float animation-delay-600"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-slide-up">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4 animate-glow">
                Featured Products
            </h2>
            <p className="text-xl text-charcoal opacity-80 mb-16 max-w-2xl mx-auto">
              Our most loved handcrafted candles, each with its own unique charm and fragrance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((candle, index) => (
              <div key={candle._id} className="group">
                <Card className="bg-card/80 backdrop-blur-md shadow-premium hover:shadow-luxury transition-all duration-500 border-0 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                  <div className="aspect-square bg-gradient-to-br from-peach/20 via-blush/10 to-beige/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    {candle.image ? (
                      <img
                        src={urlFor(candle.image).width(400).height(400).url()}
                        alt={candle.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-6xl opacity-60 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-110 animate-glow">🕯️</div>
                    )}
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                      {candle.name}
                    </h3>
                    <p className="text-charcoal opacity-70 mb-3 group-hover:opacity-90 transition-opacity duration-300">
                      {candle.description}
                    </p>
                    <p className="font-playfair text-2xl font-bold text-gold">
                      ₹{candle.price}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Collections Section */}
      <section id="collections" className="py-20 px-4 bg-warm-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-ivory to-warm-white"></div>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-luxury opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-gradient-shimmer opacity-10 rounded-full blur-2xl animate-float animation-delay-300"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-slide-up">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4 animate-glow">
              Our Collections
            </h2>
            <p className="text-xl text-charcoal opacity-80 mb-16 max-w-2xl mx-auto">
              Discover our carefully curated candle collections, each crafted with love and attention to detail
            </p>
          </div>

          {/* Mobile: Horizontal scrollable chips with icons and micro-interactions */}
          <div className="block md:hidden sticky top-0 z-20 bg-warm-white/95 pb-4 mb-8 -mx-4 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-3 w-max flex-nowrap" style={{ WebkitOverflowScrolling: 'touch' }}>
              {collections.map((collection) => {
                let icon = '🕯️';
                if (/festive/i.test(collection.title)) icon = '🎉';
                else if (/gift/i.test(collection.title)) icon = '🎁';
                else if (/return/i.test(collection.title)) icon = '🔄';
                else if (/home/i.test(collection.title)) icon = '🏠';
                return (
                  <button
                    key={collection._id}
                    className={`px-5 py-2 rounded-full font-semibold text-base whitespace-nowrap shadow-sm border flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/60 ${selectedCollection?._id === collection._id ? 'bg-gold text-white border-gold shadow-gold scale-105 animate-bounce-once' : 'bg-white text-charcoal border-soft-gray hover:bg-gold/10'}`}
                    onClick={() => setSelectedCollection(collection)}
                    aria-pressed={selectedCollection?._id === collection._id}
                    style={{ transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)' }}
                  >
                    <span className="text-lg">{icon}</span>
                    {collection.title}
                  </button>
                );
              })}
            </div>
            <style>{`
              #collections::-webkit-scrollbar { display: none; }
              @keyframes bounce-once { 0% { transform: scale(1); } 30% { transform: scale(1.12); } 60% { transform: scale(0.97); } 100% { transform: scale(1); } }
              .animate-bounce-once { animation: bounce-once 0.4s; }
            `}</style>
          </div>

          {/* Desktop: Grid of collection cards */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {collections.map((collection, index) => (
              <button
                key={collection._id}
                className={`animate-fade-slide-up group focus:outline-none transition-all duration-300 ${selectedCollection?._id === collection._id ? 'ring-4 ring-gold/60 scale-105' : ''}`}
                style={{animationDelay: `${index * 100}ms`}}
                onClick={() => setSelectedCollection(collection)}
                aria-pressed={selectedCollection?._id === collection._id}
              >
                <Card className="bg-card/80 backdrop-blur-md shadow-premium hover:shadow-luxury transition-all duration-500 hover:transform hover:scale-105 border-0 overflow-hidden relative">
                  {/* Folder-like visual */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-gradient-to-r from-gold/60 to-gold-light/80 rounded-t-lg shadow-md z-20"></div>
                  <div className="aspect-square overflow-hidden relative rounded-t-lg">
                    <img 
                      src={collection.image ? urlFor(collection.image).width(400).height(400).url() : ''} 
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                      {collection.title}
                    </h3>
                    <p className="text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                      {collection.description}
                    </p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>

          {/* Products for selected collection */}
          {selectedCollection && (
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <div className="animate-fade-slide-up mb-8">
                <h3 className="font-playfair text-4xl font-bold text-charcoal mb-2 animate-glow">
                  {selectedCollection.title} Candles
                </h3>
                <p className="text-lg text-charcoal opacity-80 mb-6 max-w-2xl mx-auto">
                  {selectedCollection.description}
                </p>
              </div>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                  {filteredProducts.map((candle, index) => (
                    <div key={candle._id} className="group relative">
                      <Card
                        className="bg-card/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden relative active:scale-[0.98] focus-within:shadow-gold cursor-pointer"
                        tabIndex={0}
                        aria-label={`View details for ${candle.name}`}
                        onClick={() => setModalProduct(candle)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModalProduct(candle); }}
                      >
                        {/* Wishlist heart icon */}
                        <button className="absolute top-3 right-3 z-20 bg-white/80 rounded-full p-2 shadow hover:bg-gold/90 hover:text-white text-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold" aria-label="Add to wishlist" tabIndex={-1}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                        </button>
                        <div className="aspect-square bg-gradient-to-br from-peach/20 via-blush/10 to-beige/20 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                          {candle.image ? (
                            <img
                              src={urlFor(candle.image).width(400).height(400).url()}
                              alt={candle.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="text-5xl opacity-60 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-110 animate-glow">🕯️</div>
                          )}
                        </div>
                        <CardContent className="p-4 sm:p-5 md:p-6 relative z-10 text-left">
                          <h3 className="font-playfair text-lg sm:text-xl font-semibold text-charcoal mb-1 group-hover:text-gold transition-colors duration-300">
                            {candle.name}
                          </h3>
                          <p className="text-charcoal opacity-70 mb-2 group-hover:opacity-90 transition-opacity duration-300 text-sm sm:text-base">
                            {candle.description}
                          </p>
                          <p className="font-playfair text-xl sm:text-2xl font-bold text-gold">
                            ₹{candle.price}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-lg text-charcoal opacity-70 animate-fade-slide-up">
                  No products found for this collection.
                </div>
              )}
            </div>
          )}

          {/* Product Detail Modal/Drawer */}
          {modalProduct && (
            <div
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300"
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              onClick={() => setModalProduct(null)}
            >
              <div
                className="w-full max-w-md mx-auto bg-white rounded-t-2xl md:rounded-2xl shadow-2xl p-6 pt-4 relative animate-fade-slide-up"
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  className="absolute top-3 right-3 text-charcoal bg-gray-100 rounded-full p-2 shadow hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold"
                  aria-label="Close product details"
                  onClick={() => setModalProduct(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Product image (carousel-ready) */}
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-peach/20 via-blush/10 to-beige/20 flex items-center justify-center">
                  {modalProduct.image ? (
                    <img
                      src={urlFor(modalProduct.image).width(600).height(600).url()}
                      alt={modalProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl opacity-60 animate-glow">🕯️</div>
                  )}
                </div>
                <h2 className="font-playfair text-2xl font-bold text-charcoal mb-2">
                  {modalProduct.name}
                </h2>
                <p className="font-playfair text-xl font-bold text-gold mb-2">
                  ₹{modalProduct.price}
                </p>
                <p className="text-base text-charcoal opacity-80 mb-2">
                  {modalProduct.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-r from-warm-white via-ivory to-warm-white relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-luxury opacity-3 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-shimmer opacity-5 rounded-full blur-2xl animate-float animation-delay-400"></div>
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Brand image */}
            {about?.image && (
            <div className="w-full flex justify-center mb-6">
              <img
                src={urlFor(about.image).width(600).url()}
                alt={about.heading}
                className="rounded-2xl shadow-xl border-4 border-gold/20 object-cover w-full max-w-xs sm:max-w-md bg-white"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          )}
          <div className="animate-fade-slide-up w-full">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-2 animate-glow">
              {about?.heading || 'About The Brand'}
            </h2>
            {/* Tagline/quote */}
            <div className="italic text-gold text-lg mb-4 font-playfair">Handcrafted with love</div>
            {/* Card-like background for text */}
            <div className="bg-white/95 rounded-xl shadow-lg px-5 py-6 sm:px-8 sm:py-8 mx-auto max-w-xl">
              <AboutExpandable content={about?.content || ''} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - swipeable carousel for mobile */}
      <section id="testimonials" className="py-16 px-4 bg-gradient-to-b from-warm-white via-ivory to-warm-white relative overflow-hidden">
        <div className="absolute top-1/3 left-10 w-44 h-44 bg-gradient-luxury opacity-3 rounded-full blur-3xl animate-float animation-delay-200"></div>
        <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-gradient-shimmer opacity-5 rounded-full blur-2xl animate-float animation-delay-600"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-slide-up mb-8">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-charcoal mb-6 animate-glow">
              What Our Customers Say
            </h2>
          </div>
          {/* Mobile: swipeable carousel */}
          <div className="block md:hidden -mx-2 px-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 w-max pb-2">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial._id} className="min-w-[85vw] max-w-xs bg-card/90 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center relative">
                  <div className="text-4xl mb-2">“</div>
                  <p className="text-charcoal opacity-80 mb-4 text-base">
                    {testimonial.review}
                  </p>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? 'text-gold text-lg' : 'text-gray-300 text-lg'}>★</span>
                    ))}
                  </div>
                  <h3 className="font-playfair text-base font-semibold text-charcoal">
                    {testimonial.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: grid of testimonials */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial._id} className="group">
                <Card className="bg-card/80 backdrop-blur-md shadow-premium hover:shadow-luxury transition-all duration-500 border-0 group overflow-hidden relative">
                  <CardContent className="p-8 relative z-10 flex flex-col items-center">
                    <div className="text-4xl mb-4">“</div>
                    <p className="text-charcoal opacity-80 mb-6 group-hover:opacity-100 transition-opacity duration-300">
                      {testimonial.review}
                    </p>
                    <div className="flex items-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < testimonial.rating ? 'text-gold text-xl' : 'text-gray-300 text-xl'}>★</span>
                      ))}
                    </div>
                    <h3 className="font-playfair text-lg font-semibold text-charcoal group-hover:text-gold transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram/Social Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-warm-white via-peach/10 to-blush/10 relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-gold/15 rounded-full blur-2xl pointer-events-none animate-bokeh-float" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-blush/15 rounded-full blur-2xl pointer-events-none animate-bokeh-float" style={{animationDelay: '0.7s'}}></div>
        <div className="max-w-md mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-4 animate-hero-title-fade">
            Follow Our Journey
          </h2>
          <span className="inline-block px-6 py-2 mb-8 rounded-full font-semibold text-base bg-white/80 text-gold shadow backdrop-blur-md tracking-widest animate-hero-fade-in font-playfair" style={{letterSpacing: '0.18em', boxShadow: '0 2px 16px rgba(212,175,55,0.08)'}}>
            {social?.instagram ? `@${social.instagram.replace('https://instagram.com/', '').replace('https://www.instagram.com/', '').replace('/', '')}` : '@the_fancy_candles_by_pallavi'}
          </span>
          <a
            href={social?.instagram || 'https://instagram.com/the_fancy_candles_by_pallavi'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-white font-semibold shadow-lg hover:shadow-gold hover:scale-105 transition-all duration-300 text-lg animate-hero-btn-fade mb-6"
            aria-label="View on Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white/90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3h9A4.5 4.5 0 0121 7.5v9A4.5 4.5 0 0116.5 21h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3zm9.75 2.25h.008v.008h-.008v-.008zM12 8.25A3.75 3.75 0 1112 15.75a3.75 3.75 0 010-7.5z" />
            </svg>
            View on Instagram
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-peach/10 via-transparent to-blush/10"></div>
        <div className="absolute top-1/4 left-1/5 w-52 h-52 bg-gradient-luxury opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/5 w-36 h-36 bg-gradient-shimmer opacity-8 rounded-full blur-2xl animate-float animation-delay-400"></div>
        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center mb-10 animate-fade-slide-up">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-4 animate-glow">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg text-charcoal opacity-80">
              Have a question or want to place a custom order? We'd love to hear from you!
            </p>
          </div>
          <div className="animate-fade-slide-up animation-delay-300">
            <Card className="bg-warm-white/95 backdrop-blur-md shadow-luxury border-0 overflow-hidden relative group rounded-xl">
              <CardContent className="p-6 sm:p-8 relative z-10">
                <form 
                  className="space-y-5" 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setContactLoading(true);
                    setContactError("");
                    setContactSuccess(false);
                    try {
                      const form = e.target as HTMLFormElement;
                      const res = await fetch("https://formspree.io/f/xzzgnker", {
                        method: "POST",
                        headers: { "Accept": "application/json" },
                        body: new FormData(form),
                      });
                      const data = await res.json();
                      if (data.ok) {
                        setContactSuccess(true);
                        setContactName("");
                        setContactEmail("");
                        setContactMessage("");
                      } else {
                        setContactError("Something went wrong. Please try again later.");
                      }
                    } catch (err) {
                      setContactError("Something went wrong. Please try again later.");
                    } finally {
                      setContactLoading(false);
                    }
                  }}
                >
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-charcoal font-medium mb-2">Name</label>
                      <Input name="name" required value={contactName} onChange={e => setContactName(e.target.value)} className="w-full border-soft-gray/50 focus:border-gold focus:shadow-soft backdrop-blur-sm transition-all duration-300 rounded-lg px-4 py-3 text-base" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-2">Email</label>
                      <Input name="email" type="email" required value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full border-soft-gray/50 focus:border-gold focus:shadow-soft backdrop-blur-sm transition-all duration-300 rounded-lg px-4 py-3 text-base" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Message</label>
                    <Textarea 
                      name="message"
                      required
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      className="w-full border-soft-gray/50 focus:border-gold focus:shadow-soft backdrop-blur-sm min-h-32 transition-all duration-300 rounded-lg px-4 py-3 text-base" 
                      placeholder="Tell us about your candle needs..."
                    />
                  </div>
                  {contactSuccess && (
                    <div className="text-green-600 font-semibold text-center">Thank you! Your message has been sent.</div>
                  )}
                  {contactError && (
                    <div className="text-red-600 font-semibold text-center">{contactError}</div>
                  )}
                  <div className="flex flex-col gap-3 mt-6">
                    <Button 
                      variant="luxury" 
                      size="lg" 
                      className="w-full flex items-center justify-center px-8 py-3 rounded-full shadow-lg border-2 border-gold bg-gradient-to-r from-gold to-gold-light text-white font-bold text-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all duration-200"
                      type="submit"
                      style={{ display: 'flex', opacity: 1, pointerEvents: contactLoading ? 'none' : 'auto' }}
                      disabled={contactLoading}
                    >
                      <span className="w-full text-center">{contactLoading ? 'Sending...' : 'Send Message'}</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gradient-to-r from-charcoal via-warm-black to-charcoal text-warm-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shimmer opacity-5 animate-shimmer"></div>
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center gap-5">
          <div className="flex gap-6 justify-center mb-2">
            <a href={social?.instagram || 'https://instagram.com/the_fancy_candles_by_pallavi'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] via-[#8134af] to-[#515bd4] text-white text-2xl shadow-lg hover:scale-110 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3h9A4.5 4.5 0 0121 7.5v9A4.5 4.5 0 0116.5 21h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3zm9.75 2.25h.008v.008h-.008v-.008zM12 8.25A3.75 3.75 0 1112 15.75a3.75 3.75 0 010-7.5z" />
              </svg>
            </a>
            <a href="https://wa.me/message/JVVEFSG6NLWVH1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white text-2xl shadow-lg hover:scale-110 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
                <path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.67 6.13L0 24l6.25-1.64A12.09 12.09 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22a9.93 9.93 0 01-5.09-1.39l-.36-.21-3.71.98.99-3.62-.23-.37A9.94 9.94 0 1122 12c0 5.52-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.34.99 2.64 1.13 2.82.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
              </svg>
            </a>
          </div>
          <h3 className="font-playfair text-xl font-bold mb-1 animate-glow">The Fancy Candles by Pallavi</h3>
          <p className="opacity-80 text-base">Handcrafted elegance for every occasion</p>
          <p className="mt-2 opacity-60 text-sm">© 2024 The Fancy Candles by Pallavi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

// Add AboutExpandable component at the bottom of the file
function AboutExpandable({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);
  if (!content) return null;
  const short = content.length > 180 ? content.slice(0, 180) + '...' : content;
  return (
    <div className="text-charcoal text-base leading-relaxed mb-4 max-w-md mx-auto" style={{ lineHeight: '1.8' }}>
      <span>{expanded ? content : short}</span>
      {content.length > 180 && (
        <button
          className="ml-2 inline-block px-3 py-1 rounded-full bg-gold text-white font-semibold text-sm shadow hover:bg-gold-light transition-colors duration-200 focus:outline-none"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}