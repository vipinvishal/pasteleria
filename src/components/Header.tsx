import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Phone, MapPin, Menu, X, Trash2, ChevronRight, Sparkles } from "lucide-react";
import { CartItem } from "../types";

const PROMOTIONAL_SPECIALS = [
  {
    emoji: "🥭",
    prefix: "FRESH MANGO FESTIVAL",
    text: "Live Mango Festival is here! Crafted with pure eggless cream & hand-picked alfonso mangoes.",
    cta: "Explore Mango Treats",
    action: "menu"
  },
  {
    emoji: "🎁",
    prefix: "FESTIVE GIFT BOXES",
    text: "Sweeten your celebrations with our premium custom eggless hampers & luxury gift packages.",
    cta: "Order Gift Boxes",
    action: "menu"
  }
];

interface HeaderProps {
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onCheckout: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Header({
  cart,
  onRemoveFromCart,
  onUpdateCartQty,
  onCheckout,
  onNavigate,
  activeSection,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    if (!showPromo) return;
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMOTIONAL_SPECIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [showPromo]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const navItems = [
    { id: "hero", name: "Home" },
    { id: "menu", name: "Menu" },
    { id: "reviews", name: "Reviews" },
    { id: "location", name: "Contact & Location" },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ opacity: 0, y: -45 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -45 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 min-h-[40px] py-2 bg-gradient-to-r from-art-accent via-[#ce9661] to-art-brown text-white z-50 flex items-center shadow-md text-xs"
          >
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex items-center justify-between gap-3">
              <div className="flex-1 flex items-center justify-center min-h-[24px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={promoIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex flex-wrap items-center justify-center text-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs"
                  >
                    <span className="text-sm select-none">{PROMOTIONAL_SPECIALS[promoIndex].emoji}</span>
                    <span className="font-mono font-bold text-[9px] sm:text-[10px] tracking-wider bg-white/20 px-2 py-0.5 rounded leading-none border border-white/5 uppercase shrink-0">
                      {PROMOTIONAL_SPECIALS[promoIndex].prefix}
                    </span>
                    <span className="text-white/95 font-medium">
                      {PROMOTIONAL_SPECIALS[promoIndex].text}
                    </span>
                    <button
                      onClick={() => handleLinkClick(PROMOTIONAL_SPECIALS[promoIndex].action)}
                      className="underline underline-offset-2 hover:text-white/80 font-extrabold cursor-pointer flex items-center gap-0.5 shrink-0"
                    >
                      <span>{PROMOTIONAL_SPECIALS[promoIndex].cta}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button
                onClick={() => setShowPromo(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer shrink-0"
                aria-label="Close Promo Banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        id="app_header"
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          showPromo ? "top-[40px]" : "top-0"
        } ${
          isScrolled
            ? "bg-art-bg/95 backdrop-blur-md shadow-xl/5 border-b border-art-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo element */}
          <div
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-art-brown flex items-center justify-center text-white font-serif font-black text-2xl shadow-md border-2 border-art-accent transform group-hover:rotate-12 transition-transform duration-300 shrink-0">
              P
            </div>
            <div className="text-left">
              <span className="font-display font-black text-3xl tracking-tight text-art-brown group-hover:text-art-accent transition-colors block leading-none italic font-serif">
                Pasteleria
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#C48C58] font-mono font-bold mt-1">
                Artisanal Cafe
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-sm font-medium transition-colors hover:text-art-accent relative py-1 cursor-pointer ${
                  activeSection === item.id ? "text-art-accent" : "text-art-muted"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-art-accent rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Cart & Contact Actions */}
          <div className="flex items-center gap-3">
            <button
              id="cart_toggle_button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-art-cream/35 hover:bg-art-cream/65 text-art-brown transition-all cursor-pointer border border-art-border"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-art-brown" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-art-accent text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              onClick={() => handleLinkClick("location")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-art-accent to-art-brown text-white text-xs font-semibold rounded-full hover:shadow-lg transition-all cursor-pointer shadow-md shadow-black/5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Shop</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-art-cream/35 hover:bg-art-cream/65 text-art-brown cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-art-bg/98 flex flex-col justify-center items-center gap-8 lg:hidden animate-fade-in px-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-art-cream/50 border border-art-border text-art-brown"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center -mt-10 mb-5">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-art-brown flex items-center justify-center text-white font-serif font-black text-3xl shadow-md border-2 border-art-accent">
              P
            </div>
            <span className="font-display font-black text-3xl text-art-brown italic block font-serif">Pasteleria</span>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#C48C58] font-bold mt-1">Shalimar Garden, Ghaziabad</span>
          </div>

          <nav className="flex flex-col items-center gap-6 text-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-xl font-serif font-medium italic tracking-wide border-b border-transparent pb-1 cursor-pointer ${
                  activeSection === item.id ? "text-art-accent border-art-accent" : "text-art-muted hover:text-art-brown"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Virtual Order Tray Menu Drawer (Cart) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-art-brown/30 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md border-l border-art-border bg-art-bg p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-art-border">
                  <h2 className="text-lg font-serif font-bold text-art-brown flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-art-accent" />
                    <span>Your Visual Order Tray</span>
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 rounded-full bg-art-cream/40 hover:bg-art-cream/80 text-art-brown cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="mt-6 flex-1 overflow-y-auto max-h-[60vh] pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 px-4">
                      <ShoppingBag className="w-12 h-12 text-art-cream mx-auto mb-3" />
                      <p className="text-art-brown font-serif font-bold italic">Your tray is empty</p>
                      <p className="text-xs text-art-muted mt-1.5 max-w-xs mx-auto">
                        Add treats from our Artisanal Menu or create a customized custom dream cake to load your tray!
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {cart.map((item) => (
                        <li key={item.id} className="flex gap-4 p-3 rounded-xl bg-white border border-art-border shadow-sm">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-art-accent/15 border border-art-accent/20 flex items-center justify-center text-art-accent font-serif font-bold text-sm shrink-0">
                              Cake
                            </div>
                          )}

                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-art-brown leading-tight">{item.name}</h4>
                            {item.details && (
                              <p className="text-[10px] text-art-muted font-mono mt-1 line-clamp-2 bg-[#E9DCC9]/15 rounded p-1 border border-art-border">
                                {item.details}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-sm font-bold text-art-brown font-mono">
                                ₹{item.price * item.quantity}
                              </span>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full bg-art-cream/70 hover:bg-art-cream text-art-brown flex items-center justify-center text-xs cursor-pointer font-bold"
                                >
                                  -
                                </button>
                                <span className="text-xs font-mono font-bold text-art-brown px-1">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full bg-art-cream/70 hover:bg-art-cream text-art-brown flex items-center justify-center text-xs cursor-pointer font-bold"
                                >
                                  +
                                </button>

                                <button
                                  onClick={() => onRemoveFromCart(item.id)}
                                  className="p-1 px-1.5 ml-2 text-[#C48C58]/80 hover:text-red-600 rounded transition-colors cursor-pointer"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-art-border pt-5 mt-5">
                  <div className="flex justify-between text-sm text-art-muted font-mono mb-2">
                    <span>Subtotal:</span>
                    <span className="text-art-brown font-black">₹{totalCartPrice}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-art-muted mb-6 font-mono leading-snug">
                    <span>*Estimated pricing for pre-order only. Pay at pickup at our Shalimar Garden outlet.</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onCheckout();
                    }}
                    className="w-full py-3 bg-art-accent hover:bg-art-brown text-white font-serif font-bold text-center rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
                  >
                    <span>Finalize Pre-Order Inquiries</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
