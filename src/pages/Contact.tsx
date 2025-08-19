import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "27cf33e4-ec63-431e-be4b-947cfa36e814",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
        "12, Jalan SS 21/39,",
        "Damansara Utama,",
        "47400 Petaling Jaya,",
        "Selangor, Malaysia",
      ],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+6013-959 9476", "WhatsApp for quick questions"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["dailylovewellness@gmail.com", "We respond within 2 hours"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: [
        "Monday - Friday: 10am - 5pm",
        "Saturday: 10am - 5pm",
        "Sunday: Closed",
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
                className="shadow-lg wellness-glow bg-card border-0 text-center"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="shadow-2xl bg-card border-0 h-fit">
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interest</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
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
                      className="min-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Submission Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-medium">
                        Thank you! Your message has been sent successfully.
                        We'll get back to you within 2 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-sm font-medium">
                        Sorry, there was an error sending your message. Please
                        try again or contact us directly.
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Google Maps Embed */}
              <Card className="shadow-lg bg-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-primary flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-wellness-sage" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-80 w-full overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8408945457936!2d101.6214369!3d3.1366958000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49006644b8a1%3A0xab44c423577d1f5a!2sDaily%20Love%20Wellness!5e0!3m2!1sen!2smy!4v1755405972847!5m2!1sen!2smy"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Daily Love Wellness Location"
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="p-4 bg-wellness-sage/10 rounded-b-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      <strong>Daily Love Wellness</strong>
                      <br />
                      12, Jalan SS 21/39, Damansara Utama, 47400 Petaling Jaya,
                      Selangor, Malaysia
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact Options */}
              <Card className="shadow-lg bg-card border-0">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const phoneNumber = "+6013-959 9476";
                        const message =
                          "Hi! I'd like to know more about your wellness services.";
                        const whatsappUrl = `https://wa.me/${phoneNumber.replace(
                          /[^0-9]/g,
                          ""
                        )}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, "_blank");
                      }}
                    >
                      Message Us
                    </Button>
                  </div>

                  {/* CODE FOR FUTURE USE ================================================================= */}
                  {/* <div className="flex items-center justify-between p-4 bg-wellness-sage/10 rounded-lg">
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
                  </div> */}
                </CardContent>
              </Card>

              {/* Parking & Directions */}
              <Card className="shadow-lg bg-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-primary">
                    Parking & Directions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <p className="text-sm text-muted-foreground">
                      Parking is available in the surrounding area (paid on
                      weekdays, free on weekends). <br />
                      Should no parking be available, Starling Mall’s just a
                      short walk away.
                    </p>
                  </div>
                  {/* <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage mt-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Accessible entrance through the main lobby
                    </p>
                  </div> */}
                  {/* <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness-sage mt-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Public transit: Bus lines 12, 24, and 36 stop nearby
                    </p>
                  </div> */}
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
            <Card className="shadow-lg bg-card border-0">
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

            <Card className="shadow-lg bg-card border-0">
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

            <Card className="shadow-lg bg-card border-0">
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

            <Card className="shadow-lg bg-card border-0">
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
