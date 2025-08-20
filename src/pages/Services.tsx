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
  SmilePlus,
  Sparkles,
  Recycle,
  Dumbbell,
  Dna,
  Activity,
  Scissors,
  Flame,
} from "lucide-react";
import ivTherapyImage from "@/assets/iv_therapy1.jpg";
import essentialOilsImage from "@/assets/essential-oils.jpg";

const Services = () => {
  const ivDrips = [
    {
      name: "Vitality Overdrive",
      icon: <Zap className="h-6 w-6" />,
      // duration: "45-60 minutes",
      price: "RM 280",
      description:
        "One way traffic to achieve & sustain great health is topping up our Daily Love Vitality nutrients to start a brand new life, full of energy and kiss all your bodily pain, tiredness and fatigue goodbye.",
      benefits: [
        "Sustains great health",
        "Increases daily energy",
        "Reduces bodily pain, tiredness, and fatigue",
      ],
      popular: true,
    },
    {
      name: "Collagen Brewing",
      icon: <Droplets className="h-6 w-6" />,
      // duration: "45-60 minutes",
      price: "RM 450",
      description:
        "Overflowing of collagen for an unimaginable silky smooth complexion. Glowing with healthy sparkling skin by promoting collagen production and antioxidants to rejuvenate your health to a brand new you.",
      benefits: [
        "Boosts collagen for silky smooth complexion",
        "Enhances glowing, sparkling skin",
        "Provides antioxidant-driven rejuvenation",
      ],
    },
    {
      name: "Fight Infection Daily",
      icon: <Shield className="h-6 w-6" />,
      // duration: "60-75 minutes",
      price: "RM 550",
      description:
        "Frustrated with Allergy? Feeling Weak? Constant attack by Flu? Endless streak of sicknesses? Sweat no more. Allow Daily Love Wellness to strengthen your immune system and beat all infections within weeks.",
      benefits: [
        "Strengthens immune system",
        "Reduces allergies and weakness",
        "Helps beat flu and recurring infections",
      ],
    },
    {
      name: "Happiness Overload",
      icon: <SmilePlus className="h-6 w-6" />,
      // duration: "30-45 minutes",
      price: "RM 680",
      description:
        "Too much enjoyment and fun last night? Having hangover and stomach upset? Daily Love Happiness Overload will get rid of all the damages due to late night and lacked of sleep and simultaneously protect your stomach and liver instantly.",
      benefits: [
        "Relieves hangovers and fatigue",
        "Protects stomach and liver",
        "Repairs late-night damage",
      ],
    },
    {
      name: "Youth & Immortality",
      icon: <Sparkles className="h-6 w-6" />,
      price: "RM 920",
      description:
        "Forever Young. Rejuvenate & Restore back your youth and health by stimulating cell regeneration to increase energy and replenishing your body’s level of electrolytes, vitamins, fluids and boost metabolism.",
      benefits: [
        "Stimulates cell regeneration",
        "Restores youth and health",
        "Replenishes electrolytes, vitamins, and fluids",
      ],
    },
    {
      name: "Liver Detoxing",
      icon: <Recycle className="h-6 w-6" />,
      price: "RM 850",
      description:
        "Feeling healthy & fresh 24/7. Say bye-bye to toxin and heavy metals. Get rid of unwanted stubborn minerals from your body with ease and double up the cleansing and protection effect for daily health.",
      benefits: [
        "Eliminates toxins and heavy metals",
        "Removes stubborn minerals",
        "Enhances cleansing and protection",
      ],
    },
    {
      name: "Total Immunity Protection",
      icon: <Shield className="h-6 w-6" />,
      price: "RM 1,050",
      description:
        "Guard & Defend your daily health. Health is not about periodical maintenance through supplement, diets or exercises. It is about the daily love and care for your precious one and only body in your life time. Guard and defend your body daily with high-dose Vitamin C, essential amino acids, trace minerals and antioxidants to fortify your immune system against all kinds of infections, especially viral infection, cold & flu.",
      benefits: [
        "Fortifies immune system",
        "Protects against viral infections",
        "Provides daily essential nutrients",
      ],
    },
    {
      name: "Be A Sleeping Beauty",
      icon: <Moon className="h-6 w-6" />,
      price: "RM 550",
      description:
        "There is no substitute for a good sleep and insomnia can negatively effect our entire body immune system. Daily Love Sleeping Beauty IV drip formulated with Magnesium, Vitamin D & Glutamine will help your body to unwind and recharge, while improving your sleeping pattern and support sleep related enhancing functions.",
      benefits: [
        "Improves sleep quality",
        "Supports immune system recovery",
        "Promotes relaxation and recharge",
      ],
    },
    {
      name: "Be A Better Man",
      icon: <Flame className="h-6 w-6" />,
      price: "RM 1,280",
      description:
        "Testosterone hormone is vital to be a Better Man to stand proud and roar with all the male characteristics. It helps to regulate sex drive, build bones and muscle mass, fat distribution, and the production of red blood cells and sperms.",
      benefits: [
        "Boosts testosterone levels",
        "Supports sex drive and fertility",
        "Improves muscle and bone mass",
      ],
    },
    {
      name: "A True Gift to All Sportsman",
      icon: <Dumbbell className="h-6 w-6" />,
      price: "RM 1,300",
      description:
        "Help to promote healthy neurological development and function, cognitive performance, nervous system, regulate amount of calcium and phosphate in the body to support muscle plus bone growth, regulate mood and concentration.",
      benefits: [
        "Supports neurological development",
        "Enhances muscle and bone growth",
        "Improves mood and concentration",
      ],
    },
    {
      name: "Brain Health IV Drip",
      icon: <Brain className="h-6 w-6" />,
      price: "RM 820",
      description:
        "To achieve optimal brain health and cognitive function, this new revolutionary Brain IV Drip therapy is specifically designed to deliver potent blend of vitamins, minerals and amino acids directly into our bloodstream to ensure maximum absorption and effectiveness. This therapy contains nutrients that support neurotransmitter production and regulate mood, support cognitive function and reduce oxidative stress. With high dose of Vitamin B12, this therapy helps combat fatigues and boosts overall energy levels. Individual who receive the Brain IV Drip often report of feeling more energized and mentally alert.",
      benefits: [
        "Boosts brain health and cognition",
        "Supports neurotransmitter production",
        "Increases energy and mental alertness",
      ],
    },
    {
      name: "NAD 500 gm",
      icon: <Dna className="h-6 w-6" />,
      price: "RM 1,800",
      description:
        "Advanced Cellular Rejuvenation Therapy. Nicotinamide Adenine Dinucleotide (NAD) is a vital coenzyme found in every cell of the body. It plays a key role in cellular energy production and is essential for many biological processes that keep our cells healthy. As we age, NAD+ levels naturally decline, with studies showing up to a 50% reduction in NAD by middle age and further depletion in older age. This decline can lead to reduced energy production, less efficient DNA repair, higher oxidative stress, and weaker cellular resilience, leading to weakened immunity and inflammation. Maintaining NAD Levels will ensure age-related diseases and symptoms like fatigue, slower healing, and weakened immunity can be significantly enhanced and reduce risk of Metabolic Disorders. NAD supports brain function by fueling neurons and helping waste removal. As NAD levels fall, brain cells may suffer, impairing memory, focus, and mood. Bottom Line: Oxidative damage, when unmanaged, accelerates aging and leads to diseases like cardiovascular issues, cataracts, and more. NAD is essential to keep oxidative stress under control.",
      benefits: [
        "Restores NAD levels in cells",
        "Improves DNA repair and resilience",
        "Supports brain function and memory",
        "Reduces oxidative stress and aging effects",
      ],
    },
    {
      name: "NMN 150 gm",
      icon: <Activity className="h-6 w-6" />,
      price: "RM 1,850",
      description:
        "Nicotinamide MonoNucleotide is the superhero sidekick. It is derivative of Vitamin B3. The main role of NMN is to act as an immediate precursor to NAD. Therefore, ideally both NAD & NMN should be administered together for best result. IV infusion is the most efficient way to deliver NMN into the body. When NMN is administered intravenously into the bloodstream, it enter the circulatory system, allowing for rapid mobilization to various tissues and cells throughout the body. Once inside the cells, NMN helps produce more NAD, keeping your body at work, energetic & healthy.",
      benefits: [
        "Acts as NAD precursor",
        "Boosts energy and cellular health",
        "Enhances anti-aging results with NAD",
      ],
    },
    {
      name: "Hydrogen Drip",
      icon: <Droplets className="h-6 w-6" />,
      price: "RM 880",
      description:
        "Rejuvenation Bliss: A Detox Like No Other. Hydrogen is the most powerful antioxidants and the only one can reach to your brain! Hydrogen effectively reduces oxidative stress and inflammation, and leave your organs with no burden. This treatment promotes better sleep, improves skin complexion, support immunity and restore cellular functions, making it a holistic approach to health and beauty.",
      benefits: [
        "Reduces oxidative stress and inflammation",
        "Improves skin complexion",
        "Supports immunity and better sleep",
      ],
    },
    {
      name: "Triple S",
      icon: <Scissors className="h-6 w-6" />,
      price: "RM 880",
      description:
        "Slim, Slender & Sexy for Irresistible Attraction. Slimming Nutri IV Drip consist of L-Carnitine, an amino acid that plays a critical role in fat metabolism and energy production, whereas Methionine, Inositol and Choline (MIC) as lipotropic agents help break down fat in the liver and support its removal from the body. Coupled with B-Complex Vitamins, it assist in converting nutrients into energy and support metabolic function, while Vitamin C and Taurine (an amino acid) aids in the reduction of fat absorption and support liver function.",
      benefits: [
        "Boosts fat metabolism",
        "Breaks down and removes fat",
        "Supports energy and liver function",
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
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-wellness-warm via-wellness-sage/90 to-primary/70 text-primary-foreground">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Our Premium Services
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated wellness experiences designed to
            restore balance, enhance vitality, and nurture your natural
            well-being in our serene environment.
          </p>
        </div>
        {/* Subtle overlay for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
      </section>

      {/* IV Drip Therapy Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                IV Drip Therapy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the transformative power of IV therapy in our
                spa-like environment. Each treatment is administered by
                certified professionals in comfortable, private spaces designed
                for your complete relaxation and well-being.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button
                  className="w-full sm:w-auto bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground font-semibold px-6 py-3"
                  onClick={() => {
                    // You can replace this URL with your actual Chinese PDF brochure
                    const pdfUrl = "/chinese-iv-therapy-brochure.pdf";
                    window.open(pdfUrl, "_blank");
                  }}
                >
                  📄 中文手册 / Chinese Brochure
                </Button>
              </div>
              {/* <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-wellness-sage" />
                  <span className="text-sm text-muted-foreground">30-75 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-sm text-wellness-sage" />
                  <span className="text-sm text-muted-foreground">
                    Certified professionals
  </span>
                </div>
              </div> */}
            </div>
            <div>
              <img
                src={ivTherapyImage}
                alt="IV Drip Therapy"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            {ivDrips.map((drip, index) => (
              <Card
                key={index}
                className="shadow-lg wellness-glow bg-card border border-wellness-sage/20 hover:border-wellness-sage/40 transition-all duration-300 relative flex flex-col"
              >
                {drip.popular && (
                  <Badge className="absolute -top-2 left-6 bg-wellness-sage text-wellness-sage-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-wellness-sage/20 text-wellness-sage flex-shrink-0">
                        {drip.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl font-serif text-primary mb-2">
                          {drip.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                          {drip.name === "Vitality Overdrive" &&
                            "Start a brand new life with boundless energy"}
                          {drip.name === "Collagen Brewing" &&
                            "Silky smooth complexion & glowing skin"}
                          {drip.name === "Fight Infection Daily" &&
                            "Strengthen immunity & beat infections"}
                          {drip.name === "Happiness Overload" &&
                            "Recover from late nights & protect organs"}
                          {drip.name === "Youth & Immortality" &&
                            "Forever young with cell regeneration"}
                          {drip.name === "Liver Detoxing" &&
                            "24/7 health & toxin elimination"}
                          {drip.name === "Total Immunity Protection" &&
                            "Daily defense against all infections"}
                          {drip.name === "Be A Sleeping Beauty" &&
                            "Unwind, recharge & sleep better"}
                          {drip.name === "Be A Better Man" &&
                            "Boost testosterone & male vitality"}
                          {drip.name === "A True Gift to All Sportsman" &&
                            "Enhanced performance & recovery"}
                          {drip.name === "Brain Health IV Drip" &&
                            "Optimal cognition & mental alertness"}
                          {drip.name === "NAD 500 gm" &&
                            "Advanced cellular rejuvenation therapy"}
                          {drip.name === "NMN 150 gm" &&
                            "NAD superhero sidekick for anti-aging"}
                          {drip.name === "Hydrogen Drip" &&
                            "Rejuvenation bliss with powerful antioxidants"}
                          {drip.name === "Triple S" &&
                            "Slim, slender & sexy transformation"}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-2xl font-bold text-primary">
                        {drip.price}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="flex-1 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {drip.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Benefits:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  </div>
                  <Button
                    className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground mt-auto"
                    onClick={() => {
                      const phoneNumber = "+6013-959 9476";
                      const message = `Hi! I'd like to book the ${drip.name} treatment at Daily Love Wellness.

Treatment Details:
• Price: ${drip.price}
• Description: ${drip.description}

Can you help me with availability and booking?`;

                      const whatsappUrl = `https://wa.me/${phoneNumber.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                  >
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
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8">
            {essentialOils.map((category, index) => (
              <Card key={index} className="shadow-lg bg-card border border-wellness-warm/20 hover:border-wellness-warm/40 transition-all duration-300">
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
      {/* <section className="py-20">
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
            <Card className="shadow-lg bg-card border-0">
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
                <Button
                  className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground"
                  onClick={() => {
                    const phoneNumber = "+6013-959 9476";
                    const message = `Hi! I'd like to schedule a Wellness Consultation at Daily Love Wellness.

Service Details:
• Price: RM 155

What's included:
• Comprehensive assessment with wellness director
• Personalized treatment plan
• Essential oil recommendations
• Follow-up support

Can you help me with availability and booking?`;

                    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                >
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-card border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
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
                <Button
                  className="w-full bg-wellness-warm hover:bg-wellness-warm/90 text-wellness-warm-foreground"
                  onClick={() => {
                    const phoneNumber = "+6013-959 9476";
                    const message = `Hi! I'd like to start the Monthly Wellness Package at Daily Love Wellness.

Package Details:
• Price: RM 740 (Save RM 200)

What's included:
• 3 IV therapy sessions
• Essential oil starter kit
• Monthly wellness check-in
• Ongoing support for optimal results

Can you help me with availability and getting started?`;

                    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                >
                  Start Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Services;
