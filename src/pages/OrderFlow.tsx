
import { useState } from "react";
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

const OrderFlow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : null;
  
  const [quantity, setQuantity] = useState(1);
  // Cake customizations
  const [cakeSize, setCakeSize] = useState<number>(6);
  const [cakeLayers, setCakeLayers] = useState<number>(1);
  const [cakeFlavor, setCakeFlavor] = useState<string>("");
  const [cakeFrosting, setCakeFrosting] = useState<string>("");
  const [cakeDecorations, setCakeDecorations] = useState<string>("");
  // Pastry customizations
  const [pastrySize, setPastrySize] = useState<'small' | 'midi' | 'large'>('small');

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
      return calculateCakePrice(
        (product as CakeProduct).price, 
        (product as CakeProduct).cakeType,
        cakeSize,
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
  
  // Add item to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    const itemPrice = calculateItemPrice();
    
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      quantity: quantity,
      basePrice: product.price,
      totalPrice: itemPrice,
      customizations: {}
    };
    
    // Add cake customizations
    if (isCake(product)) {
      cartItem.customizations = {
        size: cakeSize,
        layers: cakeLayers,
        flavor: cakeFlavor || product.flavors[0],
        frosting: cakeFrosting || (product.frostings && product.frostings[0]),
        decorations: cakeDecorations || (product.decorOptions && product.decorOptions[0]),
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
          <h1 className="text-3xl font-bold text-brand-gray-700 mb-6">Customize Your Order</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="md:col-span-1">
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
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-brand-gray-700 mb-4">Customize Your {isCake(product) ? 'Cake' : 'Order'}</h2>
                  
                  {/* Cake customizations */}
                  {isCake(product) && (
                    <div className="space-y-6">
                      {/* Cake size */}
                      <div>
                        <Label htmlFor="cake-size">Cake Size (inches)</Label>
                        <Select 
                          value={cakeSize.toString()} 
                          onValueChange={(value) => setCakeSize(parseInt(value))}
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
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-brand-gray-500 mt-1">
                          {product.cakeType === 'round' ? 
                            'Round cakes start at £15 for 6 inches' : 
                            'Square/specialty cakes start at £20 for 6 inches'
                          }
                        </p>
                      </div>
                      
                      {/* Number of layers */}
                      <div>
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
                      <div>
                        <Label htmlFor="cake-flavor">Flavor</Label>
                        <Select 
                          value={cakeFlavor} 
                          onValueChange={setCakeFlavor}
                        >
                          <SelectTrigger id="cake-flavor" className="w-full">
                            <SelectValue placeholder="Select flavor" />
                          </SelectTrigger>
                          <SelectContent>
                            {product.flavors.map((flavor) => (
                              <SelectItem key={flavor} value={flavor}>{flavor}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Frosting */}
                      {product.frostings && (
                        <div>
                          <Label htmlFor="cake-frosting">Frosting</Label>
                          <Select 
                            value={cakeFrosting} 
                            onValueChange={setCakeFrosting}
                          >
                            <SelectTrigger id="cake-frosting" className="w-full">
                              <SelectValue placeholder="Select frosting" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.frostings.map((frosting) => (
                                <SelectItem key={frosting} value={frosting}>{frosting}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      {/* Decorations */}
                      {product.decorOptions && (
                        <div>
                          <Label htmlFor="cake-decorations">Decorations</Label>
                          <Select 
                            value={cakeDecorations} 
                            onValueChange={setCakeDecorations}
                          >
                            <SelectTrigger id="cake-decorations" className="w-full">
                              <SelectValue placeholder="Select decorations" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.decorOptions.map((decoration) => (
                                <SelectItem key={decoration} value={decoration}>{decoration}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Pastry customizations */}
                  {isPastry(product) && (
                    <div className="space-y-6">
                      {/* Size options */}
                      {product.sizes && (
                        <div>
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
                        <div className="bg-brand-gray-100 p-3 rounded-md">
                          <p className="text-brand-gray-700">
                            Sold in packs of {product.packQuantity}
                            {product.packQuantity === 5 && " pieces"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Quantity */}
                  <div className="mt-6">
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
                  <div>
                    <h3 className="text-lg font-semibold text-brand-gray-700 mb-2">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Item:</span>
                        <span>{product.name}</span>
                      </div>
                      
                      {isCake(product) && (
                        <>
                          <div className="flex justify-between">
                            <span>Size:</span>
                            <span>{cakeSize} inches</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Layers:</span>
                            <span>{cakeLayers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Flavor:</span>
                            <span>{cakeFlavor || product.flavors[0]}</span>
                          </div>
                          {product.frostings && (
                            <div className="flex justify-between">
                              <span>Frosting:</span>
                              <span>{cakeFrosting || product.frostings[0]}</span>
                            </div>
                          )}
                          {product.decorOptions && cakeDecorations && (
                            <div className="flex justify-between">
                              <span>Decorations:</span>
                              <span>{cakeDecorations || product.decorOptions[0]}</span>
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
