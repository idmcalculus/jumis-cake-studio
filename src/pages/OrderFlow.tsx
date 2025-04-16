
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { getProductById } from "@/utils/productData";
import { calculateCakePrice, calculatePastryPrice } from "@/utils/priceCalculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CakeProduct, PastryProduct, CartItem } from "@/utils/types";
import "aos/dist/aos.css";
import AOS from "aos";
import CustomOptionInput from "@/components/order/CustomOptionInput";

const OrderFlow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : null;
  
  const [quantity, setQuantity] = useState(1);
  // Cake customizations
  const [cakeSize, setCakeSize] = useState<number | string>(6);
  const [cakeLayers, setCakeLayers] = useState<number>(1);
  const [cakeFlavor, setCakeFlavor] = useState<string>("");
  const [cakeFrosting, setCakeFrosting] = useState<string>("");
  const [cakeDecorations, setCakeDecorations] = useState<string>("");
  // Pastry customizations
  const [pastrySize, setPastrySize] = useState<'small' | 'midi' | 'large'>('small');
  const [cakeShape, setCakeShape] = useState<'round' | 'square' | 'heart' | 'custom'>('round');
  // Custom inputs
  const [customShape, setCustomShape] = useState('');
  const [customSize, setCustomSize] = useState('');
  const [customFlavor, setCustomFlavor] = useState('');
  const [customFrosting, setCustomFrosting] = useState('');
  const [customDecorations, setCustomDecorations] = useState('');

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  // Type guards
  const isCake = (product: any): product is CakeProduct => {
    return product && product.cakeType !== undefined;
  };
  
  const isPastry = (product: any): product is PastryProduct => {
    return product && (product.sizes !== undefined || product.packQuantity !== undefined);
  };

  // Calculate price based on customizations
  const calculateItemPrice = () => {
    if (!product) return 0;

    if (isCake(product as any)) {
      let finalSize = typeof cakeSize === 'number' ? cakeSize : 8; // Default to 8 inches for custom sizes
      return calculateCakePrice(
        (product as CakeProduct).price, 
        (product as CakeProduct).cakeType,
        finalSize,
        cakeLayers
      );
    } else if (isPastry(product as any)) {
      return calculatePastryPrice(
        (product as PastryProduct).price,
        pastrySize,
        quantity,
        (product as PastryProduct).sizes
      );
    }
    
    return product.price * quantity;
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    const itemPrice = calculateItemPrice();
    
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      quantity: quantity,
      basePrice: product.price,
      totalPrice: itemPrice * quantity,
      customizations: {}
    };
    
    // Add cake customizations
    if (isCake(product)) {
      cartItem.customizations = {
        shape: cakeShape,
        size: cakeSize === 'custom' ? customSize : cakeSize,
        layers: cakeLayers,
        flavor: cakeFlavor === 'custom' ? customFlavor : cakeFlavor,
        frosting: cakeFrosting === 'custom' ? customFrosting : cakeFrosting,
        decorations: cakeDecorations === 'custom' ? customDecorations : cakeDecorations,
      };
    }
    
    // Add pastry customizations
    if (isPastry(product)) {
      cartItem.customizations = {
        packSize: pastrySize
      };
    }
    
    // Retrieve existing cart or create new one
    const existingCart = localStorage.getItem('cart');
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
    
    // Add the new item
    cart.push(cartItem);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success toast
    toast.success(`${product.name} added to cart`);
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Navigate to cart
    navigate('/cart');
  };

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-xl text-brand-gray-500">Product not found.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-brand-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-brand-gray-700 mb-6" data-aos="fade-up">Customize Your Order</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="md:col-span-1" data-aos="fade-right">
              <Card>
                <div className="p-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-auto rounded-md object-cover aspect-square"
                  />
                  <h2 className="mt-4 text-xl font-bold text-brand-gray-700">{product.name}</h2>
                  <p className="text-brand-gray-500 mt-2">{product.description}</p>
                </div>
              </Card>
            </div>
            
            {/* Customization Form */}
            <div className="md:col-span-2" data-aos="fade-left">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-brand-gray-700 mb-4">Customize Your {isCake(product) ? 'Cake' : 'Order'}</h2>
                  
                  {/* Cake customizations */}
                  {isCake(product) && (
                    <div className="space-y-6">
                      {/* Cake shape */}
                      <div data-aos="fade-up" data-aos-delay="100">
                        <Label htmlFor="cake-shape">Cake Shape</Label>
                        <Select 
                          value={cakeShape}
                          onValueChange={(value: 'round' | 'square' | 'heart' | 'custom') => setCakeShape(value)}
                        >
                          <SelectTrigger id="cake-shape" className="w-full">
                            <SelectValue placeholder="Select shape" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="round">Round</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                            <SelectItem value="heart">Heart</SelectItem>
                            <SelectItem value="custom">Custom Shape</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {cakeShape === 'custom' && (
                          <CustomOptionInput
                            label="Shape"
                            value={customShape}
                            onChange={setCustomShape}
                          />
                        )}
                      </div>

                      {/* Cake size */}
                      <div data-aos="fade-up" data-aos-delay="100">
                        <Label htmlFor="cake-size">Cake Size (inches)</Label>
                        <Select 
                          value={typeof cakeSize === 'number' ? cakeSize.toString() : cakeSize} 
                          onValueChange={(value) => {
                            if (value === 'custom') {
                              setCakeSize('custom');
                            } else {
                              setCakeSize(parseInt(value));
                            }
                          }}
                        >
                          <SelectTrigger id="cake-size" className="w-full">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 inches</SelectItem>
                            <SelectItem value="7">7 inches</SelectItem>
                            <SelectItem value="8">8 inches</SelectItem>
                            <SelectItem value="9">9 inches</SelectItem>
                            <SelectItem value="10">10 inches</SelectItem>
                            <SelectItem value="11">11 inches</SelectItem>
                            <SelectItem value="12">12 inches</SelectItem>
                            <SelectItem value="custom">Custom Size</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {cakeSize === 'custom' && (
                          <CustomOptionInput
                            label="Size"
                            value={customSize}
                            onChange={setCustomSize}
                          />
                        )}
                        
                        <p className="text-sm text-brand-gray-500 mt-1">
                          {product.cakeType === 'round' ? 
                            'Round cakes start at £15 for 6 inches' : 
                            'Square/specialty cakes start at £20 for 6 inches'
                          }
                        </p>
                      </div>
                      
                      {/* Number of layers */}
                      <div data-aos="fade-up" data-aos-delay="200">
                        <Label htmlFor="cake-layers">Number of Layers</Label>
                        <RadioGroup 
                          id="cake-layers" 
                          value={cakeLayers.toString()}
                          onValueChange={(value) => setCakeLayers(parseInt(value))}
                          className="flex space-x-4 mt-2"
                        >
                          {[1, 2, 3, 4].slice(0, product.maxLayers).map((layer) => (
                            <div key={layer} className="flex items-center space-x-2">
                              <RadioGroupItem value={layer.toString()} id={`layer-${layer}`} />
                              <Label htmlFor={`layer-${layer}`}>{layer}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      {/* Flavor */}
                      <div data-aos="fade-up" data-aos-delay="300">
                        <Label htmlFor="cake-flavor">Flavor</Label>
                        <Select 
                          value={cakeFlavor} 
                          onValueChange={setCakeFlavor}
                        >
                          <SelectTrigger id="cake-flavor" className="w-full">
                            <SelectValue placeholder="Select flavor" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...product.flavors, "custom"].map((flavor) => (
                              <SelectItem key={flavor} value={flavor}>{flavor}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {cakeFlavor === 'custom' && (
                          <CustomOptionInput
                            label="Flavor"
                            value={customFlavor}
                            onChange={setCustomFlavor}
                          />
                        )}
                      </div>
                      
                      {/* Frosting */}
                      {product.frostings && (
                        <div data-aos="fade-up" data-aos-delay="400">
                          <Label htmlFor="cake-frosting">Frosting</Label>
                          <Select 
                            value={cakeFrosting} 
                            onValueChange={setCakeFrosting}
                          >
                            <SelectTrigger id="cake-frosting" className="w-full">
                              <SelectValue placeholder="Select frosting" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...product.frostings, "custom"].map((frosting) => (
                                <SelectItem key={frosting} value={frosting}>{frosting}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {cakeFrosting === 'custom' && (
                            <CustomOptionInput
                              label="Frosting"
                              value={customFrosting}
                              onChange={setCustomFrosting}
                            />
                          )}
                        </div>
                      )}
                      
                      {/* Decorations */}
                      {product.decorOptions && (
                        <div data-aos="fade-up" data-aos-delay="500">
                          <Label htmlFor="cake-decorations">Decorations</Label>
                          <Select 
                            value={cakeDecorations} 
                            onValueChange={setCakeDecorations}
                          >
                            <SelectTrigger id="cake-decorations" className="w-full">
                              <SelectValue placeholder="Select decorations" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...product.decorOptions, "custom"].map((decoration) => (
                                <SelectItem key={decoration} value={decoration}>{decoration}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {cakeDecorations === 'custom' && (
                            <CustomOptionInput
                              label="Decorations"
                              value={customDecorations}
                              onChange={setCustomDecorations}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Pastry customizations */}
                  {isPastry(product) && (
                    <div className="space-y-6">
                      {/* Size options */}
                      {product.sizes && (
                        <div data-aos="fade-up" data-aos-delay="100">
                          <Label>Size</Label>
                          <RadioGroup 
                            value={pastrySize}
                            onValueChange={(value) => setPastrySize(value as 'small' | 'midi' | 'large')}
                            className="flex flex-col space-y-2 mt-2"
                          >
                            {product.sizes.small?.available && (
                              <div className="flex items-center justify-between border p-3 rounded-md">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="small" id="size-small" />
                                  <Label htmlFor="size-small">Small</Label>
                                </div>
                                <span className="text-brand-orange font-semibold">£{product.sizes.small.price.toFixed(2)}</span>
                              </div>
                            )}
                            {product.sizes.midi?.available && (
                              <div className="flex items-center justify-between border p-3 rounded-md">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="midi" id="size-midi" />
                                  <Label htmlFor="size-midi">Midi</Label>
                                </div>
                                <span className="text-brand-orange font-semibold">£{product.sizes.midi.price.toFixed(2)}</span>
                              </div>
                            )}
                            {product.sizes.large?.available && (
                              <div className="flex items-center justify-between border p-3 rounded-md">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="large" id="size-large" />
                                  <Label htmlFor="size-large">Large</Label>
                                </div>
                                <span className="text-brand-orange font-semibold">£{product.sizes.large.price.toFixed(2)}</span>
                              </div>
                            )}
                          </RadioGroup>
                        </div>
                      )}
                      
                      {/* Pack quantity info */}
                      {product.packQuantity && (
                        <div className="bg-brand-gray-100 p-3 rounded-md" data-aos="fade-up" data-aos-delay="200">
                          <p className="text-brand-gray-700">
                            Sold in packs of {product.packQuantity}
                            {product.packQuantity === 5 && " pieces"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Quantity */}
                  <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex items-center mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-16 text-center mx-2"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Order summary */}
                  <div data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-lg font-semibold text-brand-gray-700 mb-2">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Item:</span>
                        <span>{product.name}</span>
                      </div>
                      
                      {isCake(product) && (
                        <>
                          <div className="flex justify-between">
                            <span>Shape:</span>
                            <span>{cakeShape === 'custom' ? `Custom (${customShape})` : cakeShape}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Size:</span>
                            <span>{cakeSize === 'custom' ? `Custom (${customSize})` : `${cakeSize} inches`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Layers:</span>
                            <span>{cakeLayers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Flavor:</span>
                            <span>{cakeFlavor === 'custom' ? `Custom (${customFlavor})` : (cakeFlavor || product.flavors[0])}</span>
                          </div>
                          {product.frostings && (
                            <div className="flex justify-between">
                              <span>Frosting:</span>
                              <span>{cakeFrosting === 'custom' ? `Custom (${customFrosting})` : (cakeFrosting || product.frostings[0])}</span>
                            </div>
                          )}
                          {product.decorOptions && cakeDecorations && (
                            <div className="flex justify-between">
                              <span>Decorations:</span>
                              <span>{cakeDecorations === 'custom' ? `Custom (${customDecorations})` : cakeDecorations}</span>
                            </div>
                          )}
                        </>
                      )}
                      
                      {isPastry(product) && product.sizes && (
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="capitalize">{pastrySize}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span>{quantity}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-semibold text-brand-orange text-lg">
                        <span>Total:</span>
                        <span>£{(calculateItemPrice() * quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90"
                    data-aos="zoom-in" 
                    data-aos-delay="400"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderFlow;
