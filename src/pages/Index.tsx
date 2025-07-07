import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/hero-candles.jpg";
import festiveImage from "@/assets/festive-candles.jpg";
import giftImage from "@/assets/gift-candles.jpg";
import returnGiftImage from "@/assets/return-gift-candles.jpg";
import homeDecorImage from "@/assets/home-decor-candles.jpg";

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-premium font-inter overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-float"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-warm-black/30 via-transparent to-warm-black/40"></div>
          <div className="absolute inset-0 bg-gradient-shimmer opacity-30 animate-shimmer"></div>
        </div>
        
        <div className="relative z-10 text-center text-warm-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-slide-up">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 leading-tight animate-glow">
              The Fancy Candles
              <span className="block text-gold font-light bg-gradient-luxury bg-clip-text text-transparent animate-shimmer">by Pallavi</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light opacity-90 animate-fade-slide-up animation-delay-200">
              Handcrafted elegance for every occasion
            </p>
            <div className="animate-fade-slide-up animation-delay-400">
              <Button 
                variant="luxury" 
                size="lg" 
                onClick={() => scrollToSection('collections')}
                className="text-lg px-12 py-4 rounded-full shadow-luxury hover:shadow-glow transform hover:scale-105 transition-all duration-500"
              >
                Explore Our Collection
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gold/30 rounded-full animate-float animation-delay-100"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-blush/20 rounded-full animate-float animation-delay-300"></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-peach/25 rounded-full animate-float animation-delay-500"></div>
      </section>

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Festive Candles", 
                image: festiveImage, 
                description: "Celebrate special moments with our festive collection" 
              },
              { 
                title: "Gifting Candles", 
                image: giftImage, 
                description: "Perfect gifts for your loved ones on any occasion" 
              },
              { 
                title: "Return Gifts", 
                image: returnGiftImage, 
                description: "Elegant mini candles for wedding favors and events" 
              },
              { 
                title: "Home Décor", 
                image: homeDecorImage, 
                description: "Transform your space with decorative candle pieces" 
              }
            ].map((collection, index) => (
              <div key={index} className="animate-fade-slide-up group" style={{animationDelay: `${index * 100}ms`}}>
                <Card className="bg-card/80 backdrop-blur-md shadow-premium hover:shadow-luxury transition-all duration-500 hover:transform hover:scale-105 border-0 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={collection.image} 
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Candles Section */}
      <section className="py-20 px-4 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-peach/10 via-transparent to-blush/10"></div>
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-gradient-luxury opacity-5 rounded-full blur-3xl animate-float animation-delay-200"></div>
        <div className="absolute bottom-1/4 right-10 w-28 h-28 bg-gradient-shimmer opacity-8 rounded-full blur-2xl animate-float animation-delay-600"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-slide-up">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4 animate-glow">
              Featured Candles
            </h2>
            <p className="text-xl text-charcoal opacity-80 mb-16 max-w-2xl mx-auto">
              Our most loved handcrafted candles, each with its own unique charm and fragrance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Vanilla Dreams", description: "Warm vanilla with subtle floral notes", price: "₹499" },
              { name: "Citrus Burst", description: "Fresh citrus blend for energizing vibes", price: "₹549" },
              { name: "Lavender Serenity", description: "Calming lavender for peaceful moments", price: "₹449" },
              { name: "Sandalwood Luxury", description: "Rich sandalwood with woody undertones", price: "₹599" },
              { name: "Rose Garden", description: "Delicate rose petals with honey essence", price: "₹529" },
              { name: "Jasmine Nights", description: "Exotic jasmine for romantic evenings", price: "₹579" }
            ].map((candle, index) => (
              <div key={index} className="animate-fade-slide-up group" style={{animationDelay: `${index * 150}ms`}}>
                <Card className="bg-card/80 backdrop-blur-md shadow-premium hover:shadow-luxury transition-all duration-500 border-0 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
                  <div className="aspect-square bg-gradient-to-br from-peach/20 via-blush/10 to-beige/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="text-6xl opacity-60 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-110 animate-glow">🕯️</div>
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                      {candle.name}
                    </h3>
                    <p className="text-charcoal opacity-70 mb-3 group-hover:opacity-90 transition-opacity duration-300">
                      {candle.description}
                    </p>
                    <p className="font-playfair text-2xl font-bold text-gold group-hover:animate-shimmer">
                      {candle.price}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-warm-white via-ivory to-warm-white relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-luxury opacity-3 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-shimmer opacity-5 rounded-full blur-2xl animate-float animation-delay-400"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate-fade-slide-up">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-8 animate-glow">
              About The Brand
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-charcoal animate-fade-slide-up animation-delay-200">
            <p className="text-xl leading-relaxed mb-6 opacity-90 hover:opacity-100 transition-opacity duration-300">
              Welcome to The Fancy Candles by Pallavi, where every candle tells a story of craftsmanship and passion. 
              Our journey began with a simple belief that every home deserves the warmth and elegance that only 
              handcrafted candles can provide.
            </p>
            <p className="text-lg leading-relaxed mb-6 opacity-80 hover:opacity-95 transition-opacity duration-300">
              Each candle is meticulously handcrafted using premium wax and carefully selected fragrances. 
              We believe in sustainable practices and use eco-friendly materials to create products that 
              not only beautify your space but also respect our environment.
            </p>
            <p className="text-lg leading-relaxed opacity-80 hover:opacity-95 transition-opacity duration-300">
              From intimate gatherings to grand celebrations, our candles are designed to create perfect 
              moments and lasting memories. Experience the difference that handmade quality makes.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 px-4 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush/5 via-transparent to-peach/5"></div>
        <div className="absolute top-10 left-1/3 w-32 h-32 bg-gradient-luxury opacity-5 rounded-full blur-3xl animate-float animation-delay-100"></div>
        <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-gradient-shimmer opacity-5 rounded-full blur-2xl animate-float animation-delay-500"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-slide-up">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4 animate-glow">
              Follow Our Journey
            </h2>
            <p className="text-xl text-charcoal opacity-80 mb-8 font-inter font-medium">
              @the_fancy_candles_by_pallavi
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[heroImage, festiveImage, giftImage, homeDecorImage, returnGiftImage, festiveImage, giftImage, heroImage].map((image, index) => (
              <div key={index} className="animate-fade-slide-up group aspect-square overflow-hidden rounded-lg shadow-premium hover:shadow-luxury transition-all duration-500 cursor-pointer relative" style={{animationDelay: `${index * 100}ms`}}>
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
                <img 
                  src={image} 
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          
          <div className="animate-fade-slide-up animation-delay-800">
            <Button variant="outline" className="border-gold/50 text-gold hover:bg-gradient-luxury hover:text-warm-white hover:border-transparent shadow-soft hover:shadow-gold transition-all duration-500 backdrop-blur-sm">
              View More on Instagram
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-warm-white via-ivory to-warm-white relative overflow-hidden">
        <div className="absolute top-1/3 left-10 w-44 h-44 bg-gradient-luxury opacity-3 rounded-full blur-3xl animate-float animation-delay-200"></div>
        <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-gradient-shimmer opacity-5 rounded-full blur-2xl animate-float animation-delay-600"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-slide-up">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-16 animate-glow">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                review: "Absolutely beautiful candles! The fragrance lasts for hours and the quality is exceptional. Perfect for gifting!",
                rating: "⭐⭐⭐⭐⭐"
              },
              {
                name: "Amit Kumar",
                review: "Ordered these for our wedding return gifts. Everyone loved them! The packaging was elegant and professional.",
                rating: "⭐⭐⭐⭐⭐"
              },
              {
                name: "Sneha Patel",
                review: "These candles have transformed my home ambiance. The handcrafted quality is evident in every detail.",
                rating: "⭐⭐⭐⭐⭐"
              }
            ].map((testimonial, index) => (
              <div key={index} className="animate-fade-slide-up group" style={{animationDelay: `${index * 200}ms`}}>
                <Card className="bg-card/80 backdrop-blur-md shadow-premium hover:shadow-luxury border-0 p-6 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <CardContent className="p-0 relative z-10">
                    <div className="text-2xl mb-4 group-hover:animate-glow">{testimonial.rating}</div>
                    <p className="text-charcoal opacity-80 mb-4 italic group-hover:opacity-95 transition-opacity duration-300">
                      "{testimonial.review}"
                    </p>
                    <p className="font-playfair font-semibold text-gold group-hover:animate-shimmer">
                      - {testimonial.name}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-peach/10 via-transparent to-blush/10"></div>
        <div className="absolute top-1/4 left-1/5 w-52 h-52 bg-gradient-luxury opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/5 w-36 h-36 bg-gradient-shimmer opacity-8 rounded-full blur-2xl animate-float animation-delay-400"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-slide-up">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4 animate-glow">
              Get In Touch
            </h2>
            <p className="text-xl text-charcoal opacity-80">
              Have a question or want to place a custom order? We'd love to hear from you!
            </p>
          </div>
          
          <div className="animate-fade-slide-up animation-delay-300">
            <Card className="bg-warm-white/90 backdrop-blur-md shadow-luxury border-0 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-charcoal font-medium mb-2">Name</label>
                      <Input className="border-soft-gray/50 focus:border-gold focus:shadow-soft backdrop-blur-sm transition-all duration-300" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-2">Email</label>
                      <Input className="border-soft-gray/50 focus:border-gold focus:shadow-soft backdrop-blur-sm transition-all duration-300" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Message</label>
                    <Textarea 
                      className="border-soft-gray/50 focus:border-gold focus:shadow-soft backdrop-blur-sm min-h-32 transition-all duration-300" 
                      placeholder="Tell us about your candle needs..."
                    />
                  </div>
                  <div className="text-center">
                    <Button variant="luxury" size="lg" className="px-12 shadow-luxury hover:shadow-glow">
                      Send Message
                    </Button>
                  </div>
                </form>
                
                <div className="flex justify-center space-x-6 mt-8 pt-8 border-t border-soft-gray/30">
                  <Button variant="ghost" className="text-gold hover:text-gold-light hover:bg-gold/10 transition-all duration-300 backdrop-blur-sm">
                    📱 WhatsApp
                  </Button>
                  <Button variant="ghost" className="text-gold hover:text-gold-light hover:bg-gold/10 transition-all duration-300 backdrop-blur-sm">
                    📸 Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gradient-to-r from-charcoal via-warm-black to-charcoal text-warm-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shimmer opacity-5 animate-shimmer"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="font-playfair text-2xl font-bold mb-2 animate-glow">The Fancy Candles by Pallavi</h3>
          <p className="opacity-80">Handcrafted elegance for every occasion</p>
          <p className="mt-4 opacity-60">© 2024 The Fancy Candles by Pallavi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;