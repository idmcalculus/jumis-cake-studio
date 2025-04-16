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
        decorations: cakeDecorations === 'custom' ? customDecorations : cakeDecorations
      };
    }
    
    // Add pastry customizations
    if (isPastry(product)) {
      cartItem.customizations = {
        size: pastrySize
      };
    }
    
    // Retrieve existing cart or create new one
    const existingCart = localStorage.getItem('cartItems');
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
    
    // Add the new item
    cart.push(cartItem);
    
    // Save cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success toast
    toast.success(`${product.name} added to cart`);
    
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
      <div className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Customize Your Order</h1>
          
          {product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div data-aos="fade-right">
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 bg-card">
                    <h2 className="text-xl font-bold text-foreground mb-2">{product.name}</h2>
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              </div>
              {/* Customization Form */}
              <div data-aos="fade-left">
                <Card className="bg-card">
                  <CardContent className="p-6 space-y-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Customize Your {isCake(product) ? 'Cake' : 'Order'}</h2>
                    {/* Cake customizations */}
                    {isCake(product) && (
                      <div className="space-y-6">
                        {/* Shape selection */}
                        <div className="space-y-2">
                          <Label 
                            htmlFor="shape" 
                            className="text-sm font-medium text-foreground"
                          >
                            Cake Shape
                          </Label>
                          <Select
                            value={cakeShape}
                            onValueChange={(value: 'round' | 'square' | 'heart' | 'custom') => setCakeShape(value)}
                          >
                            <SelectTrigger 
                              id="shape"
                              className="bg-background"
                            >
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
                            value={cakeSize.toString()}
                            onValueChange={(value) => {
                              if (value === 'custom') {
                                setCakeSize('custom');
                              } else {
                                setCakeSize(parseInt(value));
                              }
                            }}
                          >
                            <SelectTrigger id="cake-size" className="w-full bg-background">
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
                          
                          {typeof cakeSize === 'number' && cakeSize === 6 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Round cakes start at £15 for 6 inches
                            </p>
                          )}
                        </div>
                        
                        {/* Number of layers */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-foreground">
                            Number of Layers
                          </Label>
                          <RadioGroup
                            value={cakeLayers.toString()}
                            onValueChange={(value) => setCakeLayers(parseInt(value))}
                            className="flex space-x-6 mt-2"
                          >
                            {[1, 2, 3, 4].map((layers) => (
                              <div key={layers} className="flex items-center space-x-2">
                                <RadioGroupItem 
                                  value={layers.toString()} 
                                  id={`layers-${layers}`}
                                  className="text-brand-orange"
                                />
                                <Label 
                                  htmlFor={`layers-${layers}`}
                                  className="text-sm text-foreground"
                                >
                                  {layers}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        
                        {/* Flavor */}
                        <div className="space-y-2">
                          <Label 
                            htmlFor="flavor" 
                            className="text-sm font-medium text-foreground"
                          >
                            Flavor
                          </Label>
                          <Select
                            value={cakeFlavor}
                            onValueChange={setCakeFlavor}
                          >
                            <SelectTrigger 
                              id="flavor"
                              className="bg-background"
                            >
                              <SelectValue placeholder="Select flavor" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.flavors.map((flavor) => (
                                <SelectItem key={flavor} value={flavor}>
                                  {flavor}
                                </SelectItem>
                              ))}
                              <SelectItem value="custom">Custom Flavor</SelectItem>
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
                          <div className="space-y-2">
                            <Label 
                              htmlFor="frosting" 
                              className="text-sm font-medium text-foreground"
                            >
                              Frosting
                            </Label>
                            <Select
                              value={cakeFrosting}
                              onValueChange={setCakeFrosting}
                            >
                              <SelectTrigger 
                                id="frosting"
                                className="bg-background"
                              >
                                <SelectValue placeholder="Select frosting" />
                              </SelectTrigger>
                              <SelectContent>
                                {product.frostings.map((frosting) => (
                                  <SelectItem key={frosting} value={frosting}>
                                    {frosting}
                                  </SelectItem>
                                ))}
                                <SelectItem value="custom">Custom Frosting</SelectItem>
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
                          <div className="space-y-2">
                            <Label 
                              htmlFor="decorations" 
                              className="text-sm font-medium text-foreground"
                            >
                              Decorations
                            </Label>
                            <Select
                              value={cakeDecorations}
                              onValueChange={setCakeDecorations}
                            >
                              <SelectTrigger 
                                id="decorations"
                                className="bg-background"
                              >
                                <SelectValue placeholder="Select decorations" />
                              </SelectTrigger>
                              <SelectContent>
                                {product.decorOptions.map((decor) => (
                                  <SelectItem key={decor} value={decor}>
                                    {decor}
                                  </SelectItem>
                                ))}
                                <SelectItem value="custom">Custom Decorations</SelectItem>
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
                    
                    {/* Quantity selector */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Quantity</Label>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="bg-background hover:bg-muted"
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 text-center bg-background"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(quantity + 1)}
                          className="bg-background hover:bg-muted"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="my-8" />
                  
                    {/* Order summary */}
                    <div data-aos="fade-up" data-aos-delay="300">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Item:</span>
                          <span className="text-foreground font-medium">{product.name}</span>
                        </div>
                        
                        {isCake(product) && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Shape:</span>
                              <span className="text-foreground font-medium">
                                {cakeShape === 'custom' ? `Custom (${customShape})` : cakeShape}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Size:</span>
                              <span className="text-foreground font-medium">
                                {cakeSize === 'custom' ? `Custom (${customSize})` : `${cakeSize} inches`}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Layers:</span>
                              <span className="text-foreground font-medium">{cakeLayers}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Flavor:</span>
                              <span className="text-foreground font-medium">
                                {cakeFlavor === 'custom' ? `Custom (${customFlavor})` : (cakeFlavor || product.flavors[0])}
                              </span>
                            </div>
                            {product.frostings && (
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Frosting:</span>
                                <span className="text-foreground font-medium">
                                  {cakeFrosting === 'custom' ? `Custom (${customFrosting})` : (cakeFrosting || product.frostings[0])}
                                </span>
                              </div>
                            )}
                            {product.decorOptions && cakeDecorations && (
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Decorations:</span>
                                <span className="text-foreground font-medium">
                                  {cakeDecorations === 'custom' ? `Custom (${customDecorations})` : cakeDecorations}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        
                        {isPastry(product) && product.sizes && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="text-foreground font-medium capitalize">{pastrySize}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="text-foreground font-medium">{quantity}</span>
                        </div>
                        
                        <Separator className="my-2" />
                        
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-foreground">Total:</span>
                          <span className="text-brand-orange">£{(calculateItemPrice() * quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium"
                      data-aos="zoom-in" 
                      data-aos-delay="400"
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <p className="text-center text-xl text-brand-gray-500">Product not found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderFlow;
