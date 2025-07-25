import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Leaf,
  Zap,
  Shield,
  Heart,
  Brain,
  Moon,
  Sun,
  Clock,
  Star,
} from "lucide-react";
import ivTherapyImage from "@/assets/iv-therapy.png";
import essentialOilsImage from "@/assets/essential-oils.jpg";

const Services = () => {
  const ivDrips = [
    {
      name: "Energy & Vitality",
      icon: <Zap className="h-6 w-6" />,
      duration: "45-60 minutes",
      price: "RM 285",
      description:
        "Boost your energy levels and mental clarity with our signature blend of B vitamins, amino acids, and minerals.",
      benefits: [
        "Enhanced energy",
        "Mental clarity",
        "Improved mood",
        "Faster recovery",
      ],
      popular: true,
    },
    {
      name: "Immune Support",
      icon: <Shield className="h-6 w-6" />,
      duration: "45-60 minutes",
      price: "RM 320",
      description:
        "Strengthen your body's natural defenses with high-dose vitamin C, zinc, and immune-boosting nutrients.",
      benefits: [
        "Immune system boost",
        "Antioxidant protection",
        "Faster healing",
        "Seasonal support",
      ],
    },
    {
      name: "Beauty & Anti-Aging",
      icon: <Heart className="h-6 w-6" />,
      duration: "60-75 minutes",
      price: "RM 370",
      description:
        "Nourish your skin from within with collagen-supporting vitamins and powerful antioxidants.",
      benefits: [
        "Skin hydration",
        "Collagen support",
        "Hair & nail health",
        "Anti-aging effects",
      ],
    },
    {
      name: "Hydration & Recovery",
      icon: <Droplets className="h-6 w-6" />,
      duration: "30-45 minutes",
      price: "RM 240",
      description:
        "Rapid rehydration and recovery with electrolytes, minerals, and essential nutrients.",
      benefits: [
        "Quick hydration",
        "Hangover relief",
        "Athletic recovery",
        "Electrolyte balance",
      ],
    },
  ];

  const essentialOils = [
    {
      category: "Stress Relief & Relaxation",
      icon: <Moon className="h-6 w-6" />,
      oils: [
        { name: "Lavender Premium", price: "RM 52", size: "15ml" },
        { name: "Chamomile Roman", price: "RM 95", size: "10ml" },
        { name: "Bergamot", price: "RM 46", size: "15ml" },
        { name: "Ylang Ylang", price: "RM 69", size: "15ml" },
      ],
      description:
        "Promote deep relaxation and peaceful sleep with our calming essential oil collection.",
    },
    {
      category: "Energy & Focus",
      icon: <Sun className="h-6 w-6" />,
      oils: [
        { name: "Peppermint", price: "RM 39", size: "15ml" },
        { name: "Rosemary", price: "RM 43", size: "15ml" },
        { name: "Lemon", price: "RM 36", size: "15ml" },
        { name: "Eucalyptus", price: "RM 41", size: "15ml" },
      ],
      description:
        "Enhance mental clarity and natural energy with our invigorating essential oil blends.",
    },
    {
      category: "Wellness & Immunity",
      icon: <Leaf className="h-6 w-6" />,
      oils: [
        { name: "Tea Tree", price: "RM 49", size: "15ml" },
        { name: "Oregano", price: "RM 57", size: "10ml" },
        { name: "Frankincense", price: "RM 112", size: "10ml" },
        { name: "Thieves Blend", price: "RM 74", size: "15ml" },
      ],
      description:
        "Support your natural wellness and immune system with these therapeutic-grade oils.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Our Premium Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated wellness experiences designed to
            restore balance, enhance vitality, and nurture your natural
            well-being in our serene environment.
          </p>
        </div>
      </section>

      {/* IV Drip Therapy Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                IV Drip Therapy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the transformative power of IV therapy in our
                spa-like environment. Each treatment is administered by
                certified professionals in comfortable, private spaces designed
                for your complete relaxation and well-being.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-wellness-sage" />
                  <span className="text-muted-foreground">30-75 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-wellness-sage" />
                  <span className="text-muted-foreground">
                    Certified professionals
                  </span>
                </div>
              </div>
            </div>
            <div>
              <img
                src={ivTherapyImage}
                alt="IV Drip Therapy"
                className="w-full h-80 object-cover rounded-2xl shadow-warm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ivDrips.map((drip, index) => (
              <Card
                key={index}
                className="shadow-soft wellness-glow bg-card border-0 relative"
              >
                {drip.popular && (
                  <Badge className="absolute -top-2 left-6 bg-wellness-sage text-wellness-sage-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-wellness-sage/20 text-wellness-sage">
                        {drip.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-serif text-primary">
                          {drip.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {drip.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {drip.price}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {drip.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Benefits:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {drip.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                          <span className="text-sm text-muted-foreground">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground">
                    Book This Treatment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Oils Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={essentialOilsImage}
                alt="Premium Essential Oils"
                className="w-full h-80 object-cover rounded-2xl shadow-warm"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                Premium Essential Oils
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our collection features only the finest therapeutic-grade
                essential oils, sourced from trusted producers worldwide. Each
                oil is rigorously tested for purity and potency to ensure you
                receive the highest quality natural wellness support.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-wellness-warm" />
                  <span className="text-muted-foreground">
                    Therapeutic grade
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-wellness-warm" />
                  <span className="text-muted-foreground">100% pure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {essentialOils.map((category, index) => (
              <Card key={index} className="shadow-soft bg-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-full bg-wellness-warm/20 text-wellness-warm">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg font-serif text-primary">
                      {category.category}
                    </CardTitle>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.oils.map((oil, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-medium text-primary">{oil.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {oil.size}
                        </p>
                      </div>
                      <p className="font-semibold text-primary">{oil.price}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation & Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Consultation & Wellness Packages
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized wellness plans designed to meet your unique needs and
              goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-soft bg-card border-0">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">
                  Wellness Consultation
                </CardTitle>
                <p className="text-2xl font-bold text-primary">RM 155</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive assessment with our wellness director to create
                  your personalized treatment plan and essential oil
                  recommendations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                    <span className="text-sm text-muted-foreground">
                      60-minute consultation
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                    <span className="text-sm text-muted-foreground">
                      Personalized wellness plan
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                    <span className="text-sm text-muted-foreground">
                      Follow-up support
                    </span>
                  </li>
                </ul>
                <Button className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground">
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-card border-0">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">
                  Monthly Wellness Package
                </CardTitle>
                <p className="text-2xl font-bold text-primary">RM 740</p>
                <p className="text-sm text-muted-foreground">Save RM 200</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Complete wellness package including IV therapy sessions,
                  essential oils, and ongoing support for optimal results.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-wellness-warm"></div>
                    <span className="text-sm text-muted-foreground">
                      3 IV therapy sessions
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-wellness-warm"></div>
                    <span className="text-sm text-muted-foreground">
                      Essential oil starter kit
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-wellness-warm"></div>
                    <span className="text-sm text-muted-foreground">
                      Monthly wellness check-in
                    </span>
                  </li>
                </ul>
                <Button className="w-full bg-wellness-warm hover:bg-wellness-warm/90 text-wellness-warm-foreground">
                  Start Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
