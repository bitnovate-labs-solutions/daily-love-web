import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Our Sanctuary",
      details: [
        "Plaza Mont Kiara, Level 3",
        "No. 2, Jalan Kiara, Mont Kiara",
        "50480 Kuala Lumpur, Malaysia",
      ],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: [
        "+60 3-2166 8888",
        "+60 12-345 6789",
        "WhatsApp for quick questions",
      ],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: [
        "hello@serenewellness.com",
        "bookings@serenewellness.com",
        "We respond within 2 hours",
      ],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: [
        "Monday - Friday: 9am - 7pm",
        "Saturday: 10am - 6pm",
        "Sunday: 11am - 5pm",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to begin your wellness journey? We're here to help you find
            the perfect treatment and answer any questions you may have about
            our services.
          </p>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="shadow-soft wellness-glow bg-card border-0 text-center"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wellness-sage/20 text-wellness-sage mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-soft bg-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary flex items-center">
                  <MessageCircle className="h-6 w-6 mr-3 text-wellness-sage" />
                  Send Us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 2
                  hours during business hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+60 12-345 6789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interest</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a service</option>
                        <option value="iv-therapy">IV Drip Therapy</option>
                        <option value="essential-oils">Essential Oils</option>
                        <option value="consultation">
                          Wellness Consultation
                        </option>
                        <option value="package">Monthly Package</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your wellness goals or any questions you have..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <Card className="shadow-soft bg-card border-0">
                <CardContent className="p-0">
                  <div className="h-64 bg-wellness-sage/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-wellness-sage mx-auto mb-2" />
                      <p className="text-wellness-sage font-medium">
                        Interactive Map
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Plaza Mont Kiara, Kuala Lumpur
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact Options */}
              <Card className="shadow-soft bg-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-primary">
                    Quick Contact Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-wellness-warm/10 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">
                        Quick questions & booking
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Message Us
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-wellness-sage/10 rounded-lg">
                    <div>
                      <p className="font-semibold text-primary">Book Online</p>
                      <p className="text-sm text-muted-foreground">
                        Schedule your appointment
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-wellness-sage hover:bg-wellness-sage/90 text-wellness-sage-foreground"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Parking & Directions */}
              <Card className="shadow-soft bg-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-primary">
                    Parking & Directions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage mt-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Free parking available in our private lot behind the
                      building
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage mt-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Accessible entrance through the main lobby
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage mt-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Public transit: Bus lines 12, 24, and 36 stop nearby
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and booking
              process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-primary mb-3">
                  How should I prepare for my IV therapy session?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Simply stay hydrated and eat a light meal before your
                  appointment. Wear comfortable clothing and plan to relax for
                  45-75 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-primary mb-3">
                  Are your essential oils safe during pregnancy?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We carry pregnancy-safe options and our aromatherapist will
                  help you choose the right oils. Always consult your healthcare
                  provider first.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-primary mb-3">
                  What's your cancellation policy?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We require 24-hour notice for cancellations. Same-day
                  cancellations may incur a fee, though we're always
                  understanding of emergencies.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-card border-0">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-primary mb-3">
                  Do you accept insurance?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Currently, we're a cash-pay service. We provide detailed
                  receipts that you can submit to your HSA/FSA or insurance for
                  possible reimbursement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
