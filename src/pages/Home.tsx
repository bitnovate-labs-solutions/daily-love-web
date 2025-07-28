import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Leaf, Heart, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-wellness.png";
import essentialOilsImage from "@/assets/essential-oils.jpg";
import ivTherapyImage from "@/assets/iv-therapy.png";
import wellnessSpaceImage from "@/assets/wellness-space.png";
import { Link } from "react-router-dom";

const Home = () => {
  const benefits = [
    {
      icon: <Droplets className="h-8 w-8" />,
      title: "IV Drip Therapy",
      description:
        "Rejuvenate from within with our premium IV treatments designed for optimal wellness and vitality.",
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Welcome to
              <span className="block text-wellness-warm">Daily Love Wellness</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed opacity-90">
              Experience tranquility through premium IV therapy and therapeutic
              essential oils in our peaceful, Japandi-inspired sanctuary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground font-semibold px-8 py-4 rounded-full"
              >
                Book Your Wellness Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white/80 text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-full backdrop-blur-sm bg-white/10"
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
              Why Choose Daily Love Wellness?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We blend ancient wisdom with modern wellness to create an
              experience that nurtures your complete well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="shadow-soft wellness-glow bg-card border-0"
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
      <section className="py-20">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* IV Therapy */}
            <div className="space-y-6">
              <img
                src={ivTherapyImage}
                alt="IV Drip Therapy"
                className="w-full h-80 object-cover rounded-2xl shadow-warm"
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
                you unwind in our comfortable, serene setting.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Energy & Vitality Boost</li>
                <li>• Immune System Support</li>
                <li>• Hydration & Recovery</li>
                <li>• Anti-aging & Beauty</li>
              </ul>
              <Button className="bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground">
                Learn More About IV Therapy
              </Button>
            </div>

            {/* Essential Oils */}
            <div className="space-y-6 lg:order-last">
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
              <Button className="bg-wellness-warm hover:bg-wellness-warm/90 text-wellness-warm-foreground">
                Shop Essential Oils
              </Button>
            </div>
            <div className="space-y-6 lg:order-first">
              <img
                src={essentialOilsImage}
                alt="Premium Essential Oils"
                className="w-full h-80 object-cover rounded-2xl shadow-warm"
              />
            </div>
          </div>
        </div>
      </section>

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
              <Card key={index} className="shadow-soft bg-card border-0">
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${wellnessSpaceImage})`,
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
