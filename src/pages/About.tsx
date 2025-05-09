import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground">About Jumis Cake Studio</h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              A distinguished bakery specializing in freshly baked breads, exquisite pastries, and meticulously crafted cakes for all occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Jumis Cake Studio was founded with a passion for creating beautiful and delicious baked goods. What started as a small home bakery has grown into a beloved local institution, known for quality ingredients and exceptional craftsmanship.
              </p>
              <p className="text-muted-foreground mb-4">
                Our dedication to premium ingredients, artisanal techniques, and exceptional customer service has built our reputation for creativity, quality, and customization.
              </p>
              <p className="text-muted-foreground">
                Every product that leaves our kitchen is crafted with care and attention to detail, ensuring that your special moments are made even more memorable with our delicious creations.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1556911073-38141963c9e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Jumis Cake Studio team" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-8 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">Our Vision & Mission</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-brand-orange mb-4">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading bakery known for exceptional taste, unique designs, and unparalleled customer experience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-orange mb-4">Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver high-quality, beautifully crafted baked goods tailored to our clients' unique needs, ensuring every product reflects our passion for creativity and quality.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border border-brand-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Quality</h3>
                <p className="text-muted-foreground">
                  We use only the finest ingredients and maintain the highest standards in our baking process.
                </p>
              </div>
              <div className="p-6 border border-brand-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Creativity</h3>
                <p className="text-muted-foreground">
                  We bring imagination and innovation to every cake design and pastry creation.
                </p>
              </div>
              <div className="p-6 border border-brand-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Customization</h3>
                <p className="text-muted-foreground">
                  We believe every celebration is unique and deserves a personalized approach.
                </p>
              </div>
              <div className="p-6 border border-brand-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Service</h3>
                <p className="text-muted-foreground">
                  We pride ourselves on exceptional customer service from consultation to delivery.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Visit Our Shop</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We'd love to welcome you to our bakery in London. Stop by to see our daily fresh bakes and discuss your custom cake needs in person.
            </p>
            <div className="inline-block border-2 border-brand-orange rounded-lg p-6 bg-card text-card-foreground">
              <h3 className="text-xl font-semibold text-foreground mb-2">Jumis Cake Studio</h3>
              <p className="text-muted-foreground">123 Bakery Street</p>
              <p className="text-muted-foreground">London, UK</p>
              <p className="text-muted-foreground mt-2">Open Monday - Saturday: 8am - 6pm</p>
              <p className="text-muted-foreground">Sunday: 9am - 3pm</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
