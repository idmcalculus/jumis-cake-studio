
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getProductsByCategory, ALL_PRODUCTS } from "@/utils/productData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState<string>(category || "all");
  
  const categories = [
    { id: "all", name: "All Products" },
    { id: "cakes", name: "Cakes" },
    { id: "meat-pies", name: "Meat Pies" },
    { id: "puff-puffs", name: "Puff-Puffs" },
    { id: "sausage-rolls", name: "Sausage Rolls" },
  ];
  
  // Get products based on active category
  const products = getProductsByCategory(activeCategory);
  
  return (
    <Layout>
      <div className="bg-brand-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Our Products</h1>
          
          {/* Category filter */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((cat) => (
                <Button 
                  key={cat.id} 
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  className={activeCategory === cat.id ? "bg-brand-orange hover:bg-brand-orange/90" : ""}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Products grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-w-16 aspect-h-9 relative h-48">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground mt-1 h-12 overflow-hidden">
                      {product.description.substring(0, 80)}...
                    </p>
                    <p className="text-brand-orange font-bold mt-2">
                      From £{product.price.toFixed(2)}
                    </p>
                    <div className="mt-4 flex justify-between">
                      <Button asChild variant="outline">
                        <Link to={`/product/${product.id}`}>View Details</Link>
                      </Button>
                      <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
                        <Link to={`/order/${product.id}`}>Order Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
