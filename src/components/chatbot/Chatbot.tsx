import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "What types of cakes do you offer?",
    answer: "We offer a variety of cakes including celebration cakes, wedding cakes, corporate cakes, cupcakes, and specialty cakes. All our cakes can be customized to your preferences."
  },
  {
    question: "How do I place an order?",
    answer: "You can place an order directly through our website by visiting the Products page, configuring your cake or pastry options, and proceeding to checkout. For custom orders, you can also contact us directly."
  },
  {
    question: "What is the pricing for cakes?",
    answer: "Round cakes start at £15 for a 6-inch cake, with an additional £5 for each extra inch. Square cakes start at £20 for a 6-inch cake, with an additional £5 for each extra inch. You can also add multiple layers to your cake."
  },
  {
    question: "Do you offer discounts for large orders?",
    answer: "Yes, we offer a 10% discount for orders of 20 or more pastry packs. The discount increases by 2.5% for each additional 20 packs, up to a maximum discount of 20%."
  },
  {
    question: "How far in advance should I place my order?",
    answer: "For standard cakes and pastries, we recommend placing your order at least 48 hours in advance. For custom or wedding cakes, please contact us at least 2-3 weeks before your event."
  },
  {
    question: "Do you deliver?",
    answer: "Yes, we offer delivery within London. Delivery charges vary depending on your location. Please contact us for more information about delivery options and charges."
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{type: string; content: string}>>([
    { type: 'bot', content: 'Hello! How can I help you today? You can ask me about our products, pricing, or ordering process.' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user', content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Process user message and generate response
    setTimeout(() => {
      const botResponse = processUserMessage(inputValue);
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 500);
  };

  const processUserMessage = (message: string): string => {
    // Simple keyword matching for FAQ
    const lowerMessage = message.toLowerCase();
    
    // Check for FAQ matches
    for (const faq of faqData) {
      const keywords = faq.question.toLowerCase().split(' ');
      const matchKeywords = keywords.filter(word => 
        word.length > 3 && lowerMessage.includes(word.toLowerCase())
      );
      
      if (matchKeywords.length >= 2) {
        return faq.answer;
      }
    }
    
    // Check for specific keywords
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return "Our Round cakes start at £15 for a 6-inch cake, and Square cakes start at £20. For meat pies, small ones cost £1, midi £1.50, and large £2. Puff-puffs are £1 for a pack of 5, and sausage rolls are £1 for midi and £1.50 for large.";
    }
    
    if (lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
      return "We offer a 10% discount for orders of 20 or more pastry packs. The discount increases by 2.5% for each additional 20 packs, up to a maximum discount of 20%.";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('speak') || lowerMessage.includes('human')) {
      return "Would you like to speak with a human? You can reach us via WhatsApp by clicking the button below. <a href='https://wa.me/1234567890' target='_blank' class='text-brand-orange underline'>Chat on WhatsApp</a>";
    }
    
    // Default response
    return "I'm not sure I understand. Could you rephrase your question? You can ask about our products, pricing, ordering process, or click below to chat with a human representative on WhatsApp. <a href='https://wa.me/1234567890' target='_blank' class='text-brand-orange underline'>Chat on WhatsApp</a>";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChatbot}
          className="rounded-full h-14 w-14 bg-brand-orange hover:bg-brand-orange/90 shadow-lg"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle chat</span>
        </Button>
      </div>

      {/* Chatbot panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-card text-card-foreground rounded-lg shadow-xl z-50 flex flex-col max-h-[500px] border border-border">
          {/* Chatbot header */}
          <div className="bg-brand-orange text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Jumis Cake Studio Support</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleChatbot}
                className="text-white hover:bg-brand-orange/90 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-muted text-muted-foreground min-h-[300px] max-h-[300px]">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-brand-orange text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.type === 'bot' ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="p-4 border-t border-border">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-orange"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                onClick={handleSend}
                className="bg-brand-orange hover:bg-brand-orange/90 rounded-l-none"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Need to talk to a human? <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-brand-orange">Chat with us on WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
