import { Button } from "@/components/ui/button";
import { Construction, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "@/components/ui/carousel";
import { openingDayImages } from "@/data/openingDayImages";

const AboutUnderConstruction = () => {

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-background to-secondary/20">
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          {/* Construction Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-wellness-sage/20 rounded-full flex items-center justify-center">
              <Construction className="h-20 w-20 text-wellness-sage" />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">
              Page Under Construction
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're working hard to bring you an amazing About page experience. 
              Our team is crafting something special that will showcase the heart 
              and soul of Daily Love Wellness.
            </p>

            <div className="bg-wellness-sage/10 p-6 rounded-2xl border border-wellness-sage/20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                What's Coming Soon
              </h2>
              <ul className="text-left space-y-3 text-muted-foreground">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                  <span>Our wellness journey and mission</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                  <span>Meet our dedicated team</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                  <span>Our wellness philosophy and values</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                  <span>Beautiful gallery of our wellness space</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness-sage"></div>
                  <span>Client testimonials and success stories</span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-muted-foreground">
              In the meantime, explore our services and products to discover how 
              we can support your wellness journey.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                asChild
                size="lg"
                className="bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground font-semibold px-8 py-4"
              >
                <Link to="/services">
                  Explore Our Services
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-wellness-sage text-wellness-sage hover:bg-wellness-sage hover:text-primary-foreground font-semibold px-8 py-4"
              >
                <Link to="/products">
                  View Our Products
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                </Link>
              </Button>
            </div>

            {/* Back to Home */}
            <div className="pt-8">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-wellness-sage hover:text-wellness-sage/80 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-12 bg-wellness-warm/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-serif font-semibold text-primary">
              Construction Progress
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-wellness-sage h-3 rounded-full animate-pulse" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground">
              65% Complete - Estimated completion: Coming Soon
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUnderConstruction;
