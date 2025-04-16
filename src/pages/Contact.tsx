import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SocialIcons } from '@/components/common/SocialIcons'; // Import the new component

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products or want to place a custom order? Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-brand-orange mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Phone</p>
                      <p className="text-muted-foreground">+44 123 456 7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-brand-orange mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <p className="text-muted-foreground">info@jumiscakestudio.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-orange mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Address</p>
                      <p className="text-muted-foreground">
                        123 Bakery Street<br />
                        London, UK
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-brand-orange mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 8am - 6pm<br />
                        Sunday: 9am - 3pm
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Follow Us</h2>
                <p className="text-muted-foreground mb-4">
                  Stay updated with our latest creations and promotions on social media.
                </p>
                <div className="flex space-x-4">
                  <SocialIcons iconSize={28} />
                </div>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                
                {isSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p>Thank you for your message! We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+44 123 456 7890"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Custom Cake Order"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your cake requirements..."
                        required
                        className="min-h-[150px] bg-background"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-12 bg-card text-card-foreground p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-foreground mb-4">Find Us</h2>
            <div className="h-96 w-full bg-brand-gray-200 rounded-lg overflow-hidden">
              {/* Here you would typically embed a Google Map */}
              <div className="w-full h-full flex items-center justify-center bg-brand-gray-200">
                <p className="text-muted-foreground">Google Maps will be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
