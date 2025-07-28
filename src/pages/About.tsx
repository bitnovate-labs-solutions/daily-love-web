import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Leaf } from "lucide-react";
import wellnessSpaceImage from "@/assets/wellness-space.png";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Holistic Care",
      description:
        "We believe in treating the whole person—mind, body, and spirit—through integrated wellness approaches.",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Natural Healing",
      description:
        "Our commitment to natural, therapeutic-grade ingredients ensures the purest wellness experience.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Personal Touch",
      description:
        "Every client receives individualized attention and customized wellness plans tailored to their needs.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Quality",
      description:
        "We maintain the highest standards in everything we do, from our products to our service excellence.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${wellnessSpaceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Story
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover the passion and purpose behind Daily Love Wellness
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                  A Journey Towards Wellness
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Daily Love Wellness was born from a simple yet profound belief:
                  that true wellness should be accessible, natural, and deeply
                  restorative. Our founder's personal journey through stress and
                  burnout led to the discovery of how IV therapy and therapeutic
                  essential oils could transform not just physical health, but
                  entire well-being.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Inspired by the Japandi philosophy of finding beauty in
                  simplicity and harmony in nature, we created a space where
                  modern wellness meets timeless tranquility. Every aspect of
                  our sanctuary—from the warm wood tones to the carefully
                  curated essential oil blends—reflects our commitment to your
                  peaceful restoration.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-80 rounded-2xl bg-wellness-sage/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Leaf className="h-16 w-16 text-wellness-sage mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                      Founded in 2020
                    </h3>
                    <p className="text-muted-foreground">
                      With a vision to make wellness accessible and beautiful
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              To create a sanctuary where cutting-edge wellness treatments meet
              the timeless principles of natural healing, providing every client
              with a transformative experience that nurtures their complete
              well-being in an atmosphere of pure serenity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <Card className="shadow-soft bg-wellness-warm/10 border-0">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the premier destination for holistic wellness, where
                    every individual discovers their path to optimal health
                    through natural, premium treatments in a peaceful, nurturing
                    environment.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-soft bg-wellness-sage/10 border-0">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                    Our Promise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every visit to Daily Love Wellness will leave you feeling more
                    balanced, restored, and connected to your natural vitality.
                    We promise an experience that honors your time and
                    investment in your well-being.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience
              we create for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="shadow-soft wellness-glow bg-card border-0"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wellness-sage/20 text-wellness-sage mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Meet Our Wellness Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our certified wellness professionals are dedicated to providing
              you with the highest level of care and expertise in a warm,
              welcoming environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Team members would go here - for now, we'll use placeholder content */}
            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-wellness-sage/20 mx-auto mb-4"></div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                  Dr. Sarah Chen
                </h3>
                <p className="text-wellness-sage font-medium mb-3">
                  Founder & Wellness Director
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Certified in integrative medicine with over 10 years of
                  experience in holistic wellness approaches.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-wellness-warm/20 mx-auto mb-4"></div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                  Maria Rodriguez
                </h3>
                <p className="text-wellness-sage font-medium mb-3">
                  Senior IV Therapy Specialist
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Licensed RN specializing in IV therapy with a passion for
                  creating comfortable, healing experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-wood-light mx-auto mb-4"></div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                  James Thompson
                </h3>
                <p className="text-wellness-sage font-medium mb-3">
                  Aromatherapy Consultant
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Certified aromatherapist with expertise in therapeutic-grade
                  essential oils and natural wellness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
