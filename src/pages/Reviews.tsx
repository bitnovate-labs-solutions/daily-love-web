import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import wellnessSpaceImage from "@/assets/wellness-space.png";

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Mitchell",
      rating: 5,
      date: "2 weeks ago",
      service: "Energy & Vitality IV Drip",
      review:
        "I've never felt so refreshed and energized after a wellness treatment. The space is absolutely beautiful - it feels like a luxury retreat. The staff was incredibly knowledgeable and made sure I was comfortable throughout the entire process.",
      verified: true,
    },
    {
      name: "Michael Chen",
      rating: 5,
      date: "1 month ago",
      service: "Essential Oils Consultation",
      review:
        "The essential oils here are exceptional quality. The aromatherapist took time to understand my needs and created a perfect blend for stress relief. The Japandi aesthetic of the space adds to the overall calming experience.",
      verified: true,
    },
    {
      name: "Emma Rodriguez",
      rating: 5,
      date: "3 weeks ago",
      service: "Beauty & Anti-Aging IV Drip",
      review:
        "After just one session, my skin looked noticeably brighter and more hydrated. The environment is so peaceful - I actually fell asleep during the treatment! It's like having a spa day with real health benefits.",
      verified: true,
    },
    {
      name: "David Thompson",
      rating: 5,
      date: "2 months ago",
      service: "Monthly Wellness Package",
      review:
        "Best investment I've made in my health this year. The combination of IV therapy and essential oils has completely transformed how I feel. The staff remembers my preferences and makes each visit feel personalized.",
      verified: true,
    },
    {
      name: "Lisa Park",
      rating: 5,
      date: "1 week ago",
      service: "Immune Support IV Drip",
      review:
        "I was feeling run down and decided to try the immune support treatment. Not only did I feel better immediately, but I've stayed healthy through flu season. The warm, welcoming atmosphere makes all the difference.",
      verified: true,
    },
    {
      name: "James Wilson",
      rating: 5,
      date: "5 days ago",
      service: "Stress Relief Essential Oils",
      review:
        "The lavender blend I purchased has revolutionized my sleep quality. The team took time to educate me on proper usage and the benefits of each oil. You can tell they're passionate about what they do.",
      verified: true,
    },
    {
      name: "Maria Gonzalez",
      rating: 5,
      date: "3 weeks ago",
      service: "Hydration & Recovery IV Drip",
      review:
        "After a particularly stressful work period, this treatment was exactly what I needed. I felt rehydrated and refreshed within hours. The serene environment helped me truly relax for the first time in weeks.",
      verified: true,
    },
    {
      name: "Robert Kim",
      rating: 5,
      date: "1 month ago",
      service: "Wellness Consultation",
      review:
        "The consultation was thorough and enlightening. Dr. Chen really listened to my concerns and created a wellness plan that fits my lifestyle. The natural approach and beautiful space make this place truly special.",
      verified: true,
    },
    {
      name: "Amanda Foster",
      rating: 5,
      date: "2 weeks ago",
      service: "Energy & Focus Essential Oils",
      review:
        "The peppermint and rosemary blend has become essential for my work days. The quality is outstanding and the effects are noticeable immediately. The staff's knowledge about each oil is impressive.",
      verified: true,
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "4.9", label: "Average Rating" },
    { number: "95%", label: "Client Retention" },
    { number: "2000+", label: "Treatments Completed" },
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
            Client Reviews
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover what our clients say about their transformative wellness
            experiences
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              What Our Clients Are Saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from real people who have discovered the
              transformative power of our wellness services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card
                key={index}
                className="shadow-soft wellness-glow bg-card border-0 h-full"
              >
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-primary">
                          {review.name}
                        </h3>
                        {review.verified && (
                          <span className="text-xs bg-wellness-sage/20 text-wellness-sage px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-wellness-sage text-wellness-sage"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Service */}
                  <div className="mb-4">
                    <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      {review.service}
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="flex-1 mb-4">
                    <Quote className="h-5 w-5 text-wellness-sage/40 mb-2" />
                    <p className="text-muted-foreground leading-relaxed text-sm italic">
                      "{review.review}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
            Ready to Experience Serene Wellness?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have discovered their path to
            optimal wellness. Book your first session today and experience the
            difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground font-semibold px-8 py-4 rounded-full transition-smooth">
              Book Your First Session
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 rounded-full transition-smooth">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                    Share Your Experience
                  </h3>
                  <p className="text-muted-foreground">
                    We'd love to hear about your wellness journey with us. Your
                    feedback helps us continue providing exceptional service.
                  </p>
                </div>

                <div className="text-center">
                  <button className="bg-wellness-warm hover:bg-wellness-warm/90 text-wellness-warm-foreground font-semibold px-6 py-3 rounded-full transition-smooth">
                    Leave a Review
                  </button>
                  <p className="text-sm text-muted-foreground mt-3">
                    Reviews help other clients discover the transformative power
                    of natural wellness
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
