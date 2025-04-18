
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Cakes",
    description: "Celebration cakes for all occasions",
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/products/cakes"
  },
  {
    id: 2,
    name: "Meat Pies",
    description: "Delicious savory treats",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/products/meat-pies"
  },
  {
    id: 3,
    name: "Puff-puffs",
    description: "Sweet African-style donuts",
    imageUrl: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/products/puff-puffs"
  },
  {
    id: 4,
    name: "Sausage Rolls",
    description: "Perfect for snacking",
    imageUrl: "https://images.unsplash.com/photo-1626078541669-54e16a0200fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/products/sausage-rolls"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Our Products</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our range of delicious products made with premium ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-foreground/5 hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Link 
                  to={category.link}
                  className="inline-flex items-center font-medium text-brand-orange hover:text-brand-orange/90 transition-colors"
                >
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
