
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
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
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="bg-brand-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-gray-700">Contact Us</h1>
            <p className="mt-4 text-xl text-brand-gray-500 max-w-3xl mx-auto">
              Have questions about our products or want to place a custom order? Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-brand-gray-700 mb-4">Get In Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-brand-orange mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-gray-700">Phone</p>
                      <p className="text-brand-gray-600">+44 123 456 7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-brand-orange mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-gray-700">Email</p>
                      <p className="text-brand-gray-600">info@jumiscakestudio.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-orange mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-gray-700">Address</p>
                      <p className="text-brand-gray-600">
                        123 Bakery Street<br />
                        London, UK
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-brand-orange mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-brand-gray-700">Hours</p>
                      <p className="text-brand-gray-600">
                        Monday - Saturday: 8am - 6pm<br />
                        Sunday: 9am - 3pm
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-brand-gray-700 mb-4">Follow Us</h2>
                <p className="text-brand-gray-600 mb-4">
                  Stay updated with our latest creations and promotions on social media.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-brand-gray-500 hover:text-brand-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-brand-gray-500 hover:text-brand-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.254 1.232.599 1.777 1.145.546.546.891 1.11 1.145 1.777.246.636.416 1.363.465 2.427.047 1.024.06 1.379.06 3.808 0 2.43-.013 2.784-.06 3.808-.049 1.064-.219 1.791-.465 2.427a4.902 4.902 0 01-1.145 1.777 4.902 4.902 0 01-1.777 1.145c-.636.247-1.363.417-2.427.465-1.024.047-1.379.06-3.808.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.777-1.145 4.902 4.902 0 01-1.145-1.777c-.247-.636-.417-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808 0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.145-1.777A4.902 4.902 0 015.08 2.525c.636-.247 1.363-.417 2.427-.465 1.024-.047 1.379-.06 3.808-.06M12 4.378c-2.211 0-2.532.01-3.425.054-.83.038-1.279.177-1.58.294-.391.152-.675.332-.977.635-.3.3-.483.586-.635.977-.117.301-.256.75-.294 1.58-.044.893-.053 1.214-.053 3.425 0 2.211.01 2.532.053 3.425.038.83.177 1.279.294 1.58.152.391.333.677.635.977.3.3.586.483.977.635.301.117.75.256 1.58.294.893.044 1.214.053 3.425.053 2.211 0 2.532-.009 3.425-.053.83-.038 1.279-.177 1.58-.294.391-.152.677-.333.977-.635.3-.3.482-.586.635-.977.117-.301.256-.75.294-1.58.044-.893.053-1.214.053-3.425 0-2.211-.009-2.532-.053-3.425-.038-.83-.177-1.279-.294-1.58a2.593 2.593 0 00-.635-.977 2.593 2.593 0 00-.977-.635c-.301-.117-.75-.256-1.58-.294-.893-.044-1.214-.054-3.425-.054M12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="text-brand-gray-500 hover:text-brand-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                      <path d="M8.29 20.252c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.615 11.615 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-brand-gray-700 mb-4">Send Us a Message</h2>
                
                {isSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p>Thank you for your message! We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
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
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="bg-brand-orange hover:bg-brand-orange/90 w-full md:w-auto"
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
          <div className="mt-12 bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-brand-gray-700 mb-4">Find Us</h2>
            <div className="h-96 w-full bg-brand-gray-200 rounded-lg overflow-hidden">
              {/* Here you would typically embed a Google Map */}
              <div className="w-full h-full flex items-center justify-center bg-brand-gray-200">
                <p className="text-brand-gray-500">Google Maps will be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
