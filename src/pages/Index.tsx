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
    <div className="min-h-screen bg-gradient-hero font-inter">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-warm-black bg-opacity-20"></div>
        </div>
        
        <div className="relative z-10 text-center text-warm-white px-4 max-w-4xl mx-auto">
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 leading-tight">
            The Fancy Candles
            <span className="block text-gold font-light">by Pallavi</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-90">
            Handcrafted elegance for every occasion
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => scrollToSection('collections')}
            className="text-lg px-8 py-4 rounded-full"
          >
            Explore Our Collection
          </Button>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 px-4 bg-warm-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4">
            Our Collections
          </h2>
          <p className="text-xl text-charcoal opacity-80 mb-16 max-w-2xl mx-auto">
            Discover our carefully curated candle collections, each crafted with love and attention to detail
          </p>
          
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
              <Card key={index} className="bg-card shadow-card hover:shadow-gold transition-all duration-300 hover:transform hover:scale-105 border-0 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-charcoal opacity-70">
                    {collection.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Candles Section */}
      <section className="py-20 px-4 bg-gradient-soft">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4">
            Featured Candles
          </h2>
          <p className="text-xl text-charcoal opacity-80 mb-16 max-w-2xl mx-auto">
            Our most loved handcrafted candles, each with its own unique charm and fragrance
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Vanilla Dreams", description: "Warm vanilla with subtle floral notes", price: "₹499" },
              { name: "Citrus Burst", description: "Fresh citrus blend for energizing vibes", price: "₹549" },
              { name: "Lavender Serenity", description: "Calming lavender for peaceful moments", price: "₹449" },
              { name: "Sandalwood Luxury", description: "Rich sandalwood with woody undertones", price: "₹599" },
              { name: "Rose Garden", description: "Delicate rose petals with honey essence", price: "₹529" },
              { name: "Jasmine Nights", description: "Exotic jasmine for romantic evenings", price: "₹579" }
            ].map((candle, index) => (
              <Card key={index} className="bg-card shadow-card hover:shadow-gold transition-all duration-300 border-0 group">
                <div className="aspect-square bg-peach opacity-20 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🕯️</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
                    {candle.name}
                  </h3>
                  <p className="text-charcoal opacity-70 mb-3">
                    {candle.description}
                  </p>
                  <p className="font-playfair text-2xl font-bold text-gold">
                    {candle.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-5xl font-bold text-charcoal mb-8">
            About The Brand
          </h2>
          <div className="prose prose-lg max-w-none text-charcoal">
            <p className="text-xl leading-relaxed mb-6">
              Welcome to The Fancy Candles by Pallavi, where every candle tells a story of craftsmanship and passion. 
              Our journey began with a simple belief that every home deserves the warmth and elegance that only 
              handcrafted candles can provide.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Each candle is meticulously handcrafted using premium wax and carefully selected fragrances. 
              We believe in sustainable practices and use eco-friendly materials to create products that 
              not only beautify your space but also respect our environment.
            </p>
            <p className="text-lg leading-relaxed">
              From intimate gatherings to grand celebrations, our candles are designed to create perfect 
              moments and lasting memories. Experience the difference that handmade quality makes.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 px-4 bg-gradient-soft">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4">
            Follow Our Journey
          </h2>
          <p className="text-xl text-charcoal opacity-80 mb-8">
            @the_fancy_candles_by_pallavi
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[heroImage, festiveImage, giftImage, homeDecorImage, returnGiftImage, festiveImage, giftImage, heroImage].map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-gold transition-all duration-300 cursor-pointer">
                <img 
                  src={image} 
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-warm-white">
            View More on Instagram
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-warm-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-playfair text-5xl font-bold text-charcoal mb-16">
            What Our Customers Say
          </h2>
          
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
              <Card key={index} className="bg-card shadow-card border-0 p-6">
                <CardContent className="p-0">
                  <div className="text-2xl mb-4">{testimonial.rating}</div>
                  <p className="text-charcoal opacity-80 mb-4 italic">
                    "{testimonial.review}"
                  </p>
                  <p className="font-playfair font-semibold text-gold">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-charcoal opacity-80">
              Have a question or want to place a custom order? We'd love to hear from you!
            </p>
          </div>
          
          <Card className="bg-warm-white shadow-gold border-0">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Name</label>
                    <Input className="border-soft-gray focus:border-gold" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-charcoal font-medium mb-2">Email</label>
                    <Input className="border-soft-gray focus:border-gold" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-charcoal font-medium mb-2">Message</label>
                  <Textarea 
                    className="border-soft-gray focus:border-gold min-h-32" 
                    placeholder="Tell us about your candle needs..."
                  />
                </div>
                <div className="text-center">
                  <Button variant="hero" size="lg" className="px-8">
                    Send Message
                  </Button>
                </div>
              </form>
              
              <div className="flex justify-center space-x-6 mt-8 pt-8 border-t border-soft-gray">
                <Button variant="ghost" className="text-gold hover:text-gold-dark">
                  📱 WhatsApp
                </Button>
                <Button variant="ghost" className="text-gold hover:text-gold-dark">
                  📸 Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-charcoal text-warm-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-playfair text-2xl font-bold mb-2">The Fancy Candles by Pallavi</h3>
          <p className="opacity-80">Handcrafted elegance for every occasion</p>
          <p className="mt-4 opacity-60">© 2024 The Fancy Candles by Pallavi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;