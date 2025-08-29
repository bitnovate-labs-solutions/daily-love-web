import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Moon,
  Sun,
  Brain,
  ShoppingBag,
  Star,
  Heart,
  Zap,
  Shield,
  Sparkles,
  Play,
  FileText,
  Droplets,
  EyeOff,
  X,
} from "lucide-react";
import { useState } from "react";

// ASSETS
import essentialOilsImage from "@/assets/essential-oils/EO20.jpeg";
import EO1Image from "@/assets/essential-oils/EO19.jpeg";
import EO2Image from "@/assets/essential-oils/EO16.jpeg";
import EO3Image from "@/assets/essential-oils/EO14.jpeg";
// import EO5Image from "@/assets/essential-oils/EO5.jpeg";
import EO7Image from "@/assets/essential-oils/EO7.jpeg";
import casImage from "@/assets/CAS/CAS.png";
import casVideo from "@/assets/CAS/CAS.mp4";

const Products = () => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const essentialOils = [
    {
      category: "Stress Relief & Relaxation",
      image: EO1Image,
      oils: [
        { name: "Letting Go", price: "RM 98", size: "10ml" },
        { name: "Purification", price: "RM 98", size: "10ml" },
      ],
      description:
        "Release emotional burdens and cleanse your energy with our therapeutic blends designed to help you let go of stress and purify your mind, body, and spirit.",
    },
    {
      category: "Sleep, Calmness, Emotional & Love Support",
      image: EO2Image,
      oils: [
        { name: "Relaxation", price: "RM 98", size: "10ml" },
        { name: "️Love Me More", price: "RM 98", size: "10ml" },
      ],
      description:
        "Nurture your emotional well-being and cultivate self-love with our calming essential oils that promote deep relaxation and enhance your capacity for love and compassion.",
    },
    {
      category: "Focus & Mental Clarity",
      image: EO3Image,
      oils: [{ name: "Throat Chakra", price: "RM 98", size: "10ml" }],
      description:
        "Unlock your voice and enhance communication with our Throat Chakra blend that supports clear thinking, confident expression, and mental clarity for better focus and decision-making.",
    },
    {
      category: "Uplifting Vibration and Good Luck",
      image: EO7Image,
      oils: [
        { name: "Abundance & Money", price: "RM 98", size: "10ml" },
        { name: "️Sacral Chakra", price: "RM 98", size: "10ml" },
      ],
      description:
        "Elevate your energy and attract positive opportunities with our sacred blends that activate abundance consciousness and balance your sacral chakra for enhanced creativity and prosperity.",
    },
    {
      category: "Sacred Protection",
      // image: EO5Image,
      oils: [
        { name: "StarDust Sacred Protection", price: "RM 138", size: "10ml" },
      ],
      description:
        "Shield yourself with divine protection using our sacred StarDust blend that creates a powerful energetic barrier against negative influences while connecting you to higher spiritual realms.",
    },
  ];

  const casSkincareProducts = [
    {
      name: "C.A.S Water Booster",
      icon: <Droplets className="h-6 w-6" />,
      price: "RM 180",
      description:
        "Plant Extract with Hyaluronic Acid Salt - Intensive hydration serum for all skin types.",
      size: "30ml",
      features: [
        "Deep hydration",
        "Hyaluronic acid",
        "Plant extracts",
        "Suitable for all skin types",
      ],
      popular: true,
    },
    {
      name: "C.A.S Sleeping Mask",
      icon: <Moon className="h-6 w-6" />,
      price: "RM 220",
      description:
        "Overnight intensive treatment mask for deep nourishment and skin repair.",
      size: "50ml",
      features: [
        "Overnight treatment",
        "Deep nourishment",
        "Skin repair",
        "Better Tomorrow formula",
      ],
    },
    {
      name: "C.A.S Eye Cream",
      icon: <EyeOff className="h-6 w-6" />,
      price: "RM 160",
      description:
        "Specialized eye care treatment for delicate eye area with gentle, effective ingredients.",
      size: "15ml",
      features: [
        "Gentle formula",
        "Eye area specific",
        "Anti-aging",
        "Delicate care",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-wellness-warm via-wellness-sage/90 to-primary/70 text-primary-foreground">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Our Premium Products
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collection of therapeutic-grade
            essential oils and wellness products, designed to support your daily
            wellness journey and enhance your natural well-being.
          </p>
        </div>
        {/* Subtle overlay for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
      </section>

      {/* Essential Oils Section */}
      <section id="essential-oils" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={essentialOilsImage}
                alt="Essential Oils"
                className="w-full h-86 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                Essential Oils
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8">
            {essentialOils.map((category, index) => (
              <Card
                key={index}
                className="shadow-lg bg-card border border-wellness-warm/20 hover:border-wellness-warm/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="mb-4">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.category}
                        className="w-full aspect-square object-cover rounded-lg mb-3"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const nextSibling = target.nextSibling as HTMLElement;
                          if (nextSibling) {
                            nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full aspect-square bg-gradient-to-br from-wellness-warm/20 to-wellness-sage/20 rounded-lg mb-3 flex items-center justify-center ${
                        category.image ? "hidden" : "flex"
                      }`}
                    >
                      <div className="text-center p-4">
                        <div className="text-4xl mb-3">🌿</div>
                        <p className="text-sm text-muted-foreground font-medium">
                          {category.category}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Essential Oil Collection
                        </p>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-serif text-primary mb-3">
                    {category.category}
                  </CardTitle>
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
                  <Button
                    className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground mt-4"
                    onClick={() => {
                      const phoneNumber = "+6013-959 9476";
                      const message = `Hi! I'd like to purchase some essential oils from the ${category.category} collection at Daily Love Wellness.

Can you help me with availability and pricing for these oils?`;
                      const whatsappUrl = `https://wa.me/${phoneNumber.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                  >
                    Order Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* C.A.S Skincare Products Section */}
      <section
        id="cas-skincare"
        className="py-20 bg-gradient-to-b from-secondary/30 to-background"
      >
        <div className="container mx-auto px-4">
          <div className="space-y-8 mb-16">
            {/* CAS Section Title */}
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mt-10">
              C.A.S Premium Skincare
            </h2>

            {/* C.A.S Image - Full Width at Top */}
            <div className="relative">
              <img
                src={casImage}
                alt="C.A.S Premium Skincare Collection"
                className="w-full sm:aspect-[5/2] object-cover rounded-2xl shadow-lg"
                loading="lazy"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const nextSibling = target.nextSibling as HTMLElement;
                  if (nextSibling) {
                    nextSibling.style.display = "flex";
                  }
                }}
              />
              {/* Fallback placeholder */}
              <div className="hidden w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🧴</div>
                  <p className="text-lg font-medium text-gray-600">
                    C.A.S Skincare Collection
                  </p>
                  <p className="text-sm text-gray-500">
                    Water Booster • Sleeping Mask • Eye Cream
                  </p>
                </div>
              </div>
            </div>

            {/* Watch Demo Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => setShowVideoPopup(true)}
                className="bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground font-semibold px-10 py-2 shadow-lg text-md"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* C.A.S Content - Full Width Below Image */}
            <div className="space-y-6">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div className="bg-wellness-sage/5 p-6 rounded-lg border border-wellness-sage/20">
                  <h4 className="font-serif font-semibold text-primary mb-3 text-lg">
                    Introducing CAS Water Booster - The Ultimate Hydration
                    Booster
                  </h4>
                  <p className="mb-4">
                    A high-concentration hydrating repair essence powered by 12
                    plant extracts
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-medium text-primary">
                        🌱 Deep Hydration & Moisture Locking
                      </p>
                      <p className="text-sm">
                        5 extracts focus on intensive hydration
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-primary">
                        ✨ Anti-Inflammation & Barrier Repair
                      </p>
                      <p className="text-sm">
                        7 extracts target skin barrier restoration
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-medium text-primary">
                  Beautiful skin starts with repairing your skin barrier at the
                  stratum corneum!
                </p>

                <p>
                  It's formulated with Small-Molecule Sodium Hyaluronate—super
                  fine molecules that penetrate deeply into the skin, helping it
                  absorb nutrients while locking in moisture.
                </p>

                <div className="bg-wellness-warm/5 p-6 rounded-lg border border-wellness-warm/20">
                  <p className="font-medium text-primary">
                    This high-concentration essence (92.74% active serum!) keeps
                    your skin hydrated, glowing, and radiant—even without
                    makeup. The more you use it, the brighter and clearer your
                    complexion becomes!
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-primary mb-3">
                    Perfect for anyone dealing with:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                      <span className="text-sm">Dry, flaky skin</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                      <span className="text-sm">Enlarged pores</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                      <span className="text-sm">Dull complexion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                      <span className="text-sm">Sensitive redness</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                      <span className="text-sm">Breakouts</span>
                    </div>
                  </div>
                </div>

                <div className="bg-wellness-sage/5 p-6 rounded-lg border border-wellness-sage/20">
                  <h4 className="font-medium text-primary mb-3">Free from:</h4>
                  <p className="text-sm">
                    Mineral oils, parabens, fragrances, colorants,
                    animal-derived ingredients, chelating agents, ethanol, and
                    surfactants.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  className="w-full sm:w-auto bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground font-semibold px-6 py-3"
                  onClick={() => {
                    // You can replace this URL with your actual Chinese PDF brochure
                    const pdfUrl = "/CAS_chinese.pdf";
                    window.open(pdfUrl, "_blank");
                  }}
                >
                  📄 中文手册 / Chinese Brochure
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {casSkincareProducts.map((product, index) => (
              <Card
                key={index}
                className="shadow-lg wellness-glow bg-card border border-wellness-sage/20 hover:border-wellness-sage/40 transition-all duration-300 relative flex flex-col"
              >
                {product.popular && (
                  <Badge className="absolute -top-2 left-6 bg-wellness-sage text-wellness-sage-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-wellness-sage/20 text-wellness-sage flex-shrink-0">
                      {product.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl font-serif text-primary mb-2">
                        {product.name}
                      </CardTitle>
                      <p className="text-2xl font-bold text-primary mb-2">
                        {product.price}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Size: {product.size}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground mt-auto"
                    onClick={() => {
                      const phoneNumber = "+6013-959 9476";
                      const message = `Hi! I'd like to purchase the ${product.name} at Daily Love Wellness.

Product Details:
• Price: ${product.price}
• Size: ${product.size}
• Description: ${product.description}

Can you help me with availability and ordering?`;

                      const whatsappUrl = `https://wa.me/${phoneNumber.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                  >
                    Order This Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Quality Assurance */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Quality Assurance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards in product quality and customer
              satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-wellness-sage/20 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-wellness-sage" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary">
                Premium Quality
              </h3>
              <p className="text-muted-foreground">
                All products are sourced from trusted, certified producers with
                rigorous quality control.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-wellness-sage/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-wellness-sage" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary">
                Safety Tested
              </h3>
              <p className="text-muted-foreground">
                Every product undergoes thorough testing for purity, potency,
                and safety standards.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-wellness-sage/20 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-wellness-sage" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary">
                Customer Satisfaction
              </h3>
              <p className="text-muted-foreground">
                We're committed to your satisfaction with our products and
                exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Popup Modal */}
      {showVideoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4 bg-background rounded-2xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowVideoPopup(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted
                onLoadedData={() => {
                  // Video loaded successfully
                }}
                onError={(e) => {
                  console.error("Video failed to load:", e);
                }}
              >
                <source src={casVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Description */}
            {/* <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                CAS Water Booster - How to Use
              </h3>
              <p className="text-muted-foreground">
                Learn the proper application techniques for maximum hydration
                and skin barrier repair.
              </p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
