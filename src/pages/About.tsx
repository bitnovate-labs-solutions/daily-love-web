import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Leaf, X } from "lucide-react";
import Carousel from "@/components/ui/carousel";
import { openingDayImages } from "@/data/openingDayImages";

// IMAGE ASSETS
import wellnessSpaceImage from "@/assets/daily_love_sofa.jpg";
import dailyLoveShop2Image from "@/assets/daily_love_shop2.jpg";
import dailyLoveChairsImage from "@/assets/daily_love_chairs.jpg";
import dailyLoveBedImage from "@/assets/daily_love_bed.jpg";
import ivTherapyImage from "@/assets/iv_drip.jpg";

const About = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryImages = [
    {
      src: dailyLoveChairsImage,
      alt: "Relaxation Area",
      title: "Relaxation Area",
      description: "Where comfort meets tranquility",
    },
    {
      src: dailyLoveBedImage,
      alt: "Treatment Space",
      title: "Treatment Space",
      description: "Your personal wellness sanctuary",
    },
    {
      src: ivTherapyImage,
      alt: "IV Therapy",
      title: "IV Therapy",
      description: "Advanced wellness treatments",
    },
    {
      src: dailyLoveShop2Image,
      alt: "Wellness Shop",
      title: "Wellness Shop",
      description: "Premium products and essential oils",
    },
    {
      src: wellnessSpaceImage,
      alt: "Wellness Space",
      title: "Wellness Space",
      description: "Serene environment for healing",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url(${wellnessSpaceImage})`,
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
      <section className="py-20 bg-wellness-warm/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                  A Journey Towards Wellness
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Daily Love Wellness was born from a simple yet profound
                  belief: that true wellness should be accessible, natural, and
                  deeply restorative. Our founder's personal journey through
                  stress and burnout led to the discovery of how IV therapy and
                  therapeutic essential oils could transform not just physical
                  health, but entire well-being.
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
              <div className="relative h-full">
                <div
                  className="w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${dailyLoveShop2Image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="text-center p-8 text-white relative z-10">
                    <Leaf className="h-16 w-16 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-semibold text-white mb-2">
                      Founded in 2020
                    </h3>
                    <p className="text-white/90">
                      With a vision to make wellness accessible and beautiful
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Our Sanctuary
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step into our peaceful wellness space designed for your complete
              relaxation and restoration
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-80 md:h-96 object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-8 text-white">
                          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
                            {image.title}
                          </h3>
                          <p className="text-lg opacity-90">
                            {image.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to view
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 z-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 z-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-3">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-wellness-sage/20">
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
              <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
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

              <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                    Our Promise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every visit to Daily Love Wellness will leave you feeling
                    more balanced, restored, and connected to your natural
                    vitality. We promise an experience that honors your time and
                    investment in your well-being.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-wellness-warm/10">
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
                className="shadow-lg wellness-glow bg-card border-0"
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
      <section className="py-20 bg-background">
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

      {/* Opening Day Carousel Section */}
      <section className="py-16 bg-wellness-sage/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Opening Day
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Relive the magical moment when Daily Love Wellness first opened its doors. 
              Experience the excitement, joy, and promise of a new beginning as we welcomed 
              our first guests into our wellness sanctuary.
            </p>
          </div>
                      <Carousel 
              images={openingDayImages}
              autoPlay={true}
              interval={4000}
              showArrows={true}
              showDots={true}
              showPlayPause={false}
              className="mb-12"
            />
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Full size view"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
