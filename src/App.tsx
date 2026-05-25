import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, MapPin, Calendar, Check, ExternalLink, X, Star, Sparkle, ShoppingBag, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { MenuItem, CartItem } from "./types";
import { HERO_IMAGE, CUSTOM_CAKE_DISPLAY } from "./data";

// Subcomponents import
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import ReviewsSection from "./components/ReviewsSection";
import AssistantDrawer from "./components/AssistantDrawer";
import Footer from "./components/Footer";

const SPOTLIGHT_CREATIONS = [
  {
    title: "2-Tier Crimson Velvet",
    description: "Our custom tiered anniversary masterpiece with creamy vanilla pearls and hand-piped edible roses.",
    price: "₹1,550",
    image: CUSTOM_CAKE_DISPLAY,
    rating: "4.9",
    tag: "SIGNATURE SHOWPIECE",
    badgeColor: "bg-art-accent"
  },
  {
    title: "Royal Dutch Truffle Cake",
    description: "Layers of moist eggless chocolate sponge smothered in velvety glossy Belgian chocolate Ganache.",
    price: "₹650",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    rating: "4.8",
    tag: "BEST SELLER BATCH",
    badgeColor: "bg-art-brown"
  },
  {
    title: "Nutty Hazelnut Mousse",
    description: "Light-as-air dark mousse layered on crunchy roasted hazelnut praline sheets.",
    price: "₹140",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    rating: "4.7",
    tag: "PATISSERIE FAVORITE",
    badgeColor: "bg-[#805B36]"
  }
];

const ROTATING_WORDS = ["Sweet Indulgences", "Artisanal Patisserie", "Celebration Cakes", "Fresh Savory Bites"];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState("hero");
  const [checkoutReceipt, setCheckoutReceipt] = useState<{
    referenceCode: string;
    show: boolean;
  } | null>(null);

  // Dynamic values state for Hero Spotlight Content 
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Automatic slide/word rotation intervals
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3800);

    const spotlightInterval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % SPOTLIGHT_CREATIONS.length);
    }, 7200);

    return () => {
      clearInterval(wordInterval);
      clearInterval(spotlightInterval);
    };
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((y - centerY) / centerY) * -12;
    const rotateYVal = ((x - centerX) / centerX) * 12;
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleCardMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleNextSpotlight = () => {
    setSpotlightIndex((prev) => (prev + 1) % SPOTLIGHT_CREATIONS.length);
  };

  const handlePrevSpotlight = () => {
    setSpotlightIndex((prev) => (prev - 1 + SPOTLIGHT_CREATIONS.length) % SPOTLIGHT_CREATIONS.length);
  };

  // Cart Management Functions
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          type: "menu",
          image: item.image,
        },
      ];
    });
  };

  const handleAddCustomToCart = (customCake: CartItem) => {
    setCart((prev) => [...prev, customCake]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const handleCheckoutSettle = () => {
    // Generate a unique 8-character pre-order voucher code
    const voucher = "PAST-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setCheckoutReceipt({
      referenceCode: voucher,
      show: true,
    });
  };

  const handleClearCheckout = () => {
    setCart([]);
    setCheckoutReceipt(null);
  };

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-art-bg text-art-brown font-sans min-h-screen selection:bg-art-accent selection:text-white">
      {/* 1. Universal Glass Header */}
      <Header
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQty={handleUpdateCartQty}
        onCheckout={handleCheckoutSettle}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-art-bg">
        {/* Banner Image with high depth gradient shadow layers */}
        <div className="absolute inset-0 z-0 select-none opacity-85">
          <img
            src={HERO_IMAGE}
            alt="Pasteleria Boutique Front"
            className="w-full h-full object-cover transform scale-100 filter brightness-45 contrast-105"
            style={{ objectPosition: "center 110px" }}
            referrerPolicy="no-referrer"
          />
          {/* Intense vignette overlays with Artistic ivory/creamy hues */}
          <div className="absolute inset-0 bg-gradient-to-t from-art-bg via-art-bg/25 to-art-bg/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-art-bg/90 via-transparent to-art-bg/90" />
        </div>

        {/* Ambient Gold/Brown Backdrop Radial Spotlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-art-accent/10 rounded-full blur-[140px] pointer-events-none mix-blend-multiply opacity-50 z-10" />

        {/* Floating elegant background gold/cream drifting particles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`floater-${i}`}
              className="absolute bg-gradient-to-br from-art-accent/20 to-transparent rounded-full blur-sm"
              style={{
                width: `${(i % 3) * 45 + 30}px`,
                height: `${(i % 3) * 45 + 30}px`,
                left: `${12 + i * 15}%`,
                top: `${15 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -35, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 9 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Interactive Workspace Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 w-full py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text metadata (7/12 cols) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Supercharged Header Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-art-border text-art-brown font-mono text-xs uppercase tracking-wider font-bold shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-art-accent animate-pulse" />
                <span>Baking Artistry • Since 2018</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-800 font-mono text-[10px] uppercase tracking-wider font-extrabold shadow-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>BAKED FRESH TODAY</span>
              </motion.div>
            </div>

            {/* Rotating Word Header System */}
            <div className="min-h-[7.5rem] sm:min-h-[9rem] md:min-h-[11rem] flex flex-col justify-center">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-art-brown tracking-tight leading-none italic font-bold text-center lg:text-left">
                100% Eggless <br />
                <span className="inline-block relative h-[1.12em] overflow-visible w-full">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 20, rotateX: -25 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, rotateX: 25 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="absolute inset-x-0 lg:left-0 lg:right-auto text-transparent bg-clip-text bg-gradient-to-r from-art-accent via-[#ce9661] to-art-brown select-none font-serif font-black block leading-none py-1 filter drop-shadow-xs"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-art-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans"
            >
              Step into Shalimar Garden's premier neighborhood bakery-cafe. From golden, piping hot gourmet mini pizzas and hazelnut brews to custom-tiered celebration cakes—each recipe is crafted with precision, and baked in hygienic vegetarian ovens.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4.5 justify-center lg:justify-start pt-4"
            >
              <button
                onClick={() => handleNavigate("menu")}
                className="w-full sm:w-auto px-8 py-4 bg-art-accent hover:bg-art-brown text-white font-serif font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-art-accent/20 flex items-center justify-center gap-2.5 group text-sm transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Bistro Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => handleNavigate("reviews")}
                className="w-full sm:w-auto px-8 py-4 bg-white/95 backdrop-blur-sm hover:bg-art-cream/30 text-art-brown font-sans font-extrabold text-xs rounded-full border border-art-border/80 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Read Customer Reviews</span>
                <Star className="w-3.5 h-3.5 text-art-accent fill-art-accent" />
              </button>
            </motion.div>

            {/* Quick trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-5 justify-center lg:justify-start pt-6 text-art-muted text-xs font-mono"
            >
              <span className="flex items-center gap-1.5 border-r border-art-border pr-5">
                <Check className="w-4 h-4 text-green-600 font-bold" />
                <span className="font-bold">100% Pure Vegetarian</span>
              </span>
              <span className="flex items-center gap-1.5 dark:text-art-muted">
                <Star className="w-4 h-4 text-art-accent fill-art-accent" />
                <span className="font-bold">4.8/5 Star Rated locally</span>
              </span>
            </motion.div>
          </div>

          {/* Hero visual creation spotlight card (5/12 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            {/* Ambient dynamic glow background */}
            <div className="absolute inset-0 bg-art-accent/15 rounded-full blur-3xl pointer-events-none scale-75 -z-10 animate-pulse" />

            <motion.div
              style={{ perspective: 1000 }}
              className="w-full max-w-sm"
            >
              <motion.div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                animate={{
                  rotateX,
                  rotateY,
                  transformPerspective: 1000
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white/95 backdrop-blur-md border border-art-border/60 rounded-3xl p-5 shadow-2xl relative group overflow-hidden cursor-grab active:cursor-grabbing hover:shadow-art-accent/15 transition-shadow duration-300"
              >
                {/* Image Showcase Box */}
                <div className="relative h-68 overflow-hidden rounded-2xl bg-art-cream/20">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={spotlightIndex}
                      src={SPOTLIGHT_CREATIONS[spotlightIndex].image}
                      alt={SPOTLIGHT_CREATIONS[spotlightIndex].title}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover filter contrast-[1.03] brightness-100"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Manual Navigation Chevrons */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevSpotlight();
                      }}
                      className="w-8.5 h-8.5 rounded-full bg-white/95 hover:bg-white text-art-brown flex items-center justify-center pointer-events-auto shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer border border-art-border"
                    >
                      <ChevronLeft className="w-5 h-5 text-art-brown" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextSpotlight();
                      }}
                      className="w-8.5 h-8.5 rounded-full bg-white/95 hover:bg-white text-art-brown flex items-center justify-center pointer-events-auto shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer border border-art-border"
                    >
                      <ChevronRight className="w-5 h-5 text-art-brown" />
                    </button>
                  </div>

                  {/* Golden-white high shine sliding sweep reflection */}
                  <motion.div
                    key={`sweep-${spotlightIndex}`}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, repeatDelay: 6, duration: 1.6, ease: "linear" }}
                  />

                  {/* Spotlight Indicator Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest text-white rounded-md shadow-sm bg-art-accent flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span>{SPOTLIGHT_CREATIONS[spotlightIndex].tag}</span>
                  </div>
                </div>

                {/* Annotation metadata details height balanced to prevent layout shift */}
                <div className="pt-4 text-left min-h-[5.2rem] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={spotlightIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <h3 className="font-display font-black text-lg text-art-brown italic">
                          {SPOTLIGHT_CREATIONS[spotlightIndex].title}
                        </h3>
                        <p className="text-xs text-art-muted mt-1 leading-snug line-clamp-2">
                          {SPOTLIGHT_CREATIONS[spotlightIndex].description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-art-muted/70 font-mono block uppercase font-bold leading-none">Est. Cost</span>
                        <span className="text-base font-black font-mono text-art-accent mt-1 block">
                          {SPOTLIGHT_CREATIONS[spotlightIndex].price}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Pill/Dot indicators for manual showcase selection */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {SPOTLIGHT_CREATIONS.map((_, idx) => (
                    <button
                      key={`dot-${idx}`}
                      onClick={() => setSpotlightIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        spotlightIndex === idx ? "w-6 bg-art-accent" : "w-1.5 bg-art-border hover:bg-art-muted/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Action footer of card */}
                <div className="mt-4 pt-3.5 border-t border-art-border/60 flex items-center justify-between text-[11px] text-art-muted font-mono leading-none">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-art-accent text-art-accent" />
                    <span className="font-bold text-art-brown">{SPOTLIGHT_CREATIONS[spotlightIndex].rating} rating</span>
                  </span>
                  <button
                    onClick={() => handleNavigate("menu")}
                    className="text-art-accent hover:text-art-brown font-extrabold flex items-center gap-1 transition-colors cursor-pointer group/builder font-mono"
                  >
                    <span>Browse Menu</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/builder:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. Artisanal Menu Grid Section */}
      <MenuSection onAddToCart={handleAddToCart} />

      {/* 5. Google Reviews and Custom Reviews Input Section */}
      <ReviewsSection />

      {/* 6. Live AI Assistant (Chef Pierre) */}
      <AssistantDrawer />

      {/* 7. Footer Contact and Interactive Iframe Maps Section */}
      <Footer />

      {/* 8. PRE-ORDER INQUIRY SUCCESS RECEIPT DIALOG MODAL */}
      <AnimatePresence>
        {checkoutReceipt && checkoutReceipt.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-art-brown/30 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{
                type: "spring",
                damping: 14,
                stiffness: 170,
                mass: 0.85
              }}
              className="bg-white border border-art-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden text-art-brown"
            >
              {/* Receipt Background visual decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-art-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-start pb-4 border-b border-art-border">
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👨‍🍳</span>
                    <span className="font-display font-medium text-lg text-art-brown italic">Pierre's Preorder Ledger</span>
                  </div>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-art-accent font-bold mt-1">Estimations Voucher</p>
                </div>
                <button
                  onClick={handleClearCheckout}
                  className="p-1 px-1.5 rounded-lg bg-art-cream/60 hover:bg-art-cream text-art-brown cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Receipt Body containing custom items */}
              <div className="my-6 space-y-4 max-h-[40vh] overflow-y-auto pr-2 text-left">
                <p className="text-xs text-art-muted leading-relaxed">
                  Excellent choice! Chef Pierre has received your pre-order specifications and drafted your sweet estimations receipt. Show this at our <strong className="text-art-brown">Shalimar Garden</strong> checkout for processing:
                </p>

                <div className="p-4 rounded-2xl bg-art-bg/85 border border-art-border space-y-3">
                  <div className="flex justify-between items-center text-xs text-art-muted font-mono">
                    <span>VOUCHER CODE</span>
                    <span className="text-art-accent font-black">{checkoutReceipt.referenceCode}</span>
                  </div>

                  <hr className="border-art-border border-dashed" />

                  <ul className="space-y-2.5">
                    {cart.map((i) => (
                      <li key={i.id} className="text-xs flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <p className="font-bold text-art-brown leading-tight text-left">
                            {i.name} <span className="text-[10px] text-art-muted font-mono font-normal">x{i.quantity}</span>
                          </p>
                          {i.details && (
                            <p className="text-[10px] text-art-muted mt-1 leading-normal italic text-left">
                              {i.details}
                            </p>
                          )}
                        </div>
                        <span className="font-mono font-bold text-art-brown mt-0.5 shrink-0">₹{i.price * i.quantity}</span>
                      </li>
                    ))}
                  </ul>

                  <hr className="border-art-border border-dashed" />

                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-art-muted font-mono">Tray Total:</span>
                    <span className="font-black text-art-brown text-base font-mono">₹{totalCartPrice}</span>
                  </div>
                </div>

                {/* Driving navigation tips */}
                <div className="flex gap-2.5 p-3.5 rounded-xl bg-white border border-art-border text-[11px] text-art-muted">
                  <MapPin className="w-4.5 h-4.5 text-art-accent shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    We are baking this fully eggless! Drop by <strong className="text-art-brown">Pasteleria Shalimar Garden ( Sahibabad )</strong> or call us directly with your Voucher Code to confirm precise pick-up hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-art-border">
                <button
                  onClick={handleClearCheckout}
                  className="flex-1 py-3 border border-art-border hover:bg-art-cream/20 text-art-muted hover:text-art-brown rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                >
                  Clear Order & Close
                </button>
                <a
                  href={`tel:+919871500000`}
                  className="flex-1 py-3 bg-art-accent hover:bg-art-brown text-white font-serif font-bold text-center rounded-xl text-xs transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Call to Confirm</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
