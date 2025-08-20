import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Leaf, Heart, Star, ArrowRight } from "lucide-react";
import essentialOilsImage from "@/assets/essential-oils.jpg";
import ivTherapyImage from "@/assets/iv_drip_therapy.jpg";
import wellnessSpaceImage from "@/assets/daily_love_bed.jpg";
import { Link } from "react-router-dom";
import GoogleReviews from "@/components/GoogleReviews";

// ASSETS
import heroImage from "@/assets/daily_love_shop.jpg";

const Home = () => {
  const benefits = [
    {
      icon: <Droplets className="h-8 w-8" />,
      title: "IV Drip Therapy",
      description:
        "Rejuvenate from within with our premium Nutri Drip treatments designed for optimal wellness and vitality.",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Essential Oils",
      description:
        "Pure, therapeutic-grade essential oils to support your natural healing and relaxation journey.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Holistic Wellness",
      description:
        "Experience complete mind-body harmony through our carefully curated wellness approach.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "The most peaceful wellness experience I've ever had. The IV therapy left me feeling completely refreshed.",
      rating: 5,
    },
    {
      name: "Michael R.",
      text: "Their essential oils are incredible. The quality and the serene atmosphere make this place special.",
      rating: 5,
    },
    {
      name: "Emma L.",
      text: "I feel like I've found my sanctuary. The Japandi aesthetic and premium service are unmatched.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-white">
            {/* <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Welcome to
              <span className="block text-wellness-warm">
                Daily Love Wellness
              </span>
            </h1> */}

            <img
              src="/dailylove_banner.png"
              alt="Daily Love Logo"
              className="h-auto w-full max-w-2xl mx-auto px-4"
            />

            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed opacity-80">
              Experience tranquility through premium Nutri Drip therapy and
              therapeutic essential oils in our peaceful, Japandi-inspired
              sanctuary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* CODE FOR FUTURE USE ============================================================ */}
              {/* <Button
                size="lg"
                className="bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground font-semibold px-8 py-4 rounded-full"
              >
                Book Your Wellness Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button> */}
              <Button
                // variant="outline"
                size="lg"
                asChild
                className="bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground font-semibold px-8 py-4"
                // className="border-white/80 text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-full backdrop-blur-sm bg-white/10"
              >
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Daily Love Wellness, we offer more than just Nutri Drips -{" "}
              <br /> we offer space to recharge. <br /> For tired bodies and
              overworked minds, step into a calming space where healing starts
              from the inside. <br /> We listen. We understand. We care. <br />{" "}
              Because recovery isn't a luxury - it's a need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="shadow-lg wellness-glow bg-card border-0"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wellness-sage/20 text-wellness-sage mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-wellness-sage/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Our Premium Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully curated wellness experiences designed to restore balance
              and enhance your natural vitality.
            </p>
          </div>

          {/* IV Therapy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <img
                src={ivTherapyImage}
                alt="IV Drip Therapy"
                className="w-full aspect-square object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                IV Drip Therapy
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our IV therapy treatments are administered in a spa-like
                environment that promotes deep relaxation. Each session is
                designed to replenish your body with essential nutrients while
                you unwind in our comfortable, serene setting. One gentle drip.
                Endless support for your body - from the inside out. Here are a
                few things you should know about IV Drip Therapy:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • Glutathione - For glow, detox, and deep cellular care.
                </li>
                <li>
                  • Vitamin C - For strong immunity and skin that stays bright.
                </li>
                <li>
                  • Vitamin B Complex - Boosts energy, and helps to reduce
                  fatigue gently.
                </li>
                <li>
                  • Boost energy levels - Feel more energized and ready to take
                  on the day.{" "}
                </li>
                <li>
                  • Detoxify the body - Flush out toxins and cleanse your
                  system.
                </li>
                <li>
                  • Enhance skin health - Glowing skin starts from the inside
                  out.
                </li>
              </ul>
              <Button 
                asChild
                className="bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground"
              >
                <Link to="/services">Learn More About IV Therapy</Link>
              </Button>
            </div>
          </div>

          {/* Essential Oils Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                Premium Essential Oils
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our collection of therapeutic-grade essential oils are sourced
                from the finest producers worldwide. Each oil is carefully
                selected for its purity and potency to support your wellness
                journey naturally.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Stress Relief & Relaxation</li>
                <li>• Sleep & Calm Support</li>
                <li>• Focus & Mental Clarity</li>
                <li>• Natural Immunity Boost</li>
              </ul>
              <Button 
                asChild
                className="bg-wellness-warm hover:bg-wellness-warm/90 text-wellness-warm-foreground"
              >
                <Link to="/services">Shop Essential Oils</Link>
              </Button>
            </div>
            <div className="space-y-6">
              <img
                src={essentialOilsImage}
                alt="Premium Essential Oils"
                className="w-full aspect-square object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CODE FOR FUTURE USE (WAITING TO OBTAIN API KEY FROM CLIENT TO INTEGRATE GOOGLE REVIEWS ================================) */}
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the peace and rejuvenation that our clients discover at
              Daily Love Wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg bg-card border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-wellness-sage text-wellness-sage"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-primary">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${wellnessSpaceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards a more balanced, peaceful you. Book your
            session today and discover the transformative power of true
            wellness.
          </p>
          <Button
            size="lg"
            className="bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground font-semibold px-8 py-4 rounded-full"
            onClick={() => {
              const phoneNumber = "+6013-959 9476";
              const message =
                "Hi! I'd like to book a wellness session at Daily Love Wellness. Can you help me with availability and pricing?";
              const whatsappUrl = `https://wa.me/${phoneNumber.replace(
                /[^0-9]/g,
                ""
              )}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
            }}
          >
            Book Your Session Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
