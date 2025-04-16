
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wedding Client",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    content: "The wedding cake was absolutely stunning! Not only did it look beautiful, but it tasted amazing. Our guests couldn't stop talking about it.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Corporate Event Planner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    content: "Jumis Cake Studio delivered the perfect branded desserts for our company event. Professional service from consultation to delivery.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Birthday Celebration",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    content: "I ordered a custom cake for my daughter's 5th birthday. It exceeded my expectations! Will definitely order again for future celebrations.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-gray-700">What Our Customers Say</h2>
          <p className="mt-4 text-xl text-brand-gray-500">
            Trusted by customers for delicious cakes and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-brand-gray-100 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-brand-gray-700">{testimonial.name}</h3>
                  <p className="text-sm text-brand-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="text-brand-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
