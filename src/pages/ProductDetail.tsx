
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getProductById } from "@/utils/productData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CakeProduct, PastryProduct } from "@/utils/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get product by ID
  const product = id ? getProductById(id) : null;
  
  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-xl text-brand-gray-500">Product not found.</p>
          <div className="text-center mt-4">
            <Button asChild variant="outline">
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Type guard to check if product is a cake
  const isCake = (product: any): product is CakeProduct => {
    return product.cakeType !== undefined;
  };
  
  // Type guard to check if product is a pastry
  const isPastry = (product: any): product is PastryProduct => {
    return product.sizes !== undefined || product.packQuantity !== undefined;
  };
  
  return (
    <Layout>
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden border border-brand-gray-200">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-brand-gray-700">{product.name}</h1>
              <p className="text-xl text-brand-orange font-semibold mt-2">
                From £{product.price.toFixed(2)}
              </p>
              <div className="mt-4 prose text-brand-gray-600">
                <p>{product.description}</p>
              </div>
              
              {/* Cake specific details */}
              {isCake(product) && (
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-gray-700">Available Flavors</h3>
                    <ul className="mt-2 grid grid-cols-2 gap-2">
                      {product.flavors.map((flavor, index) => (
                        <li key={index} className="text-brand-gray-600">• {flavor}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {product.frostings && (
                    <div>
                      <h3 className="text-lg font-semibold text-brand-gray-700">Frosting Options</h3>
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {product.frostings.map((frosting, index) => (
                          <li key={index} className="text-brand-gray-600">• {frosting}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-semibold text-brand-gray-700">Cake Details</h3>
                    <ul className="mt-2">
                      <li className="text-brand-gray-600">Type: {product.cakeType.charAt(0).toUpperCase() + product.cakeType.slice(1)}</li>
                      <li className="text-brand-gray-600">Base Size: {product.baseSizeInches} inches</li>
                      <li className="text-brand-gray-600">Max Layers: {product.maxLayers}</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Pastry specific details */}
              {isPastry(product) && (
                <div className="mt-6">
                  {product.sizes && (
                    <div>
                      <h3 className="text-lg font-semibold text-brand-gray-700">Available Sizes</h3>
                      <ul className="mt-2">
                        {product.sizes.small?.available && (
                          <li className="text-brand-gray-600">Small: £{product.sizes.small.price.toFixed(2)}</li>
                        )}
                        {product.sizes.midi?.available && (
                          <li className="text-brand-gray-600">Midi: £{product.sizes.midi.price.toFixed(2)}</li>
                        )}
                        {product.sizes.large?.available && (
                          <li className="text-brand-gray-600">Large: £{product.sizes.large.price.toFixed(2)}</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {product.packQuantity && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-brand-gray-700">Pack Details</h3>
                      <p className="text-brand-gray-600">Sold in packs of {product.packQuantity}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-8">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-brand-orange hover:bg-brand-orange/90 w-full sm:w-auto"
                >
                  <Link to={`/order/${product.id}`}>
                    Order Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
