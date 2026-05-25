import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Star, UtensilsCrossed, Cake, Cookie, Pizza, Coffee, Info, Check, Plus } from "lucide-react";
import { MenuItem } from "../types";
import { MENU_ITEMS, CATEGORIES } from "../data";

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

// Icon mapper helper
const getCategoryIcon = (id: string) => {
  switch (id) {
    case "cakes":
      return <Cake className="w-4 h-4" />;
    case "pastries":
      return <Cookie className="w-4 h-4" />;
    case "savory":
      return <Pizza className="w-4 h-4" />;
    case "beverages":
      return <Coffee className="w-4 h-4" />;
    default:
      return <UtensilsCrossed className="w-4 h-4" />;
  }
};

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAllergenTooltip, setActiveAllergenTooltip] = useState<string | null>(null);
  const [justAddedItem, setJustAddedItem] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddClick = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedItem(item.id);
    setTimeout(() => setJustAddedItem(null), 1200);
  };

  return (
    <section id="menu" className="py-24 bg-art-bg border-t border-art-border relative">
      {/* Editorial aesthetic background shapes */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-[#E9DCC9]/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-0 w-96 h-96 bg-art-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-art-accent font-mono text-xs uppercase tracking-widest font-bold px-3 py-1 bg-art-cream/30 rounded-full border border-art-border">
            Artisanal Culinary Craft
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl text-art-brown italic tracking-tight mt-3">
            Our Freshly Baked Menu
          </h2>
          <div className="w-16 h-[1.5px] bg-art-accent mx-auto mt-4 rounded-full" />
          <p className="text-art-muted max-w-xl mx-auto mt-4 text-xs sm:text-sm leading-relaxed font-sans">
            All our pastries and cakes are crafted <strong className="text-art-brown font-semibold">100% Chef-Spiced & Eggless</strong> in-house. We serve Delhi-NCR with gourmet sweet cravings and savory delights.
          </p>
        </div>

        {/* Search and Filter Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/70 p-5 rounded-2xl border border-art-border/60 shadow-sm animate-fade-in">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold tracking-tight transition-colors duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "text-white shadow-md shadow-art-accent/15"
                      : "bg-art-cream/40 text-art-muted hover:bg-art-cream/80 hover:text-art-brown border border-art-border"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-art-accent to-[#ce9661]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      style={{ originY: "0px" }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {getCategoryIcon(cat.id)}
                    <span>{cat.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-art-muted" />
            <input
              type="text"
              placeholder="Search sweets & savory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white outline-none border border-art-border focus:border-art-accent rounded-full py-2.5 pl-11 pr-5 text-xs text-art-brown placeholder:text-art-muted transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Dynamic Items Grid */}
        <motion.div
          layout="position"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                  y: { duration: 0.25 }
                }}
                className="group relative flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-art-border hover:border-art-accent/40 transition-all hover:shadow-xl hover:shadow-art-brown/5 duration-300"
              >
                <div>
                  {/* Item Image with zoom, tilt and reflection sweep premium effect */}
                  <div className="relative h-48 overflow-hidden bg-art-cream/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-108 group-hover:rotate-1 group-hover:brightness-105 group-hover:contrast-105 transition-all duration-700 ease-out"
                    />
                    
                    {/* Golden-white premium sweep shine reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

                    {/* Tags Layer */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={`tag-${item.id}-${tag}-${tIdx}`}
                          className={`text-[9px] font-mono font-bold tracking-tight px-2 py-1 rounded-md shadow-sm ${
                            tag === "Best Seller" || tag === "Chef Special"
                              ? "bg-art-brown text-white"
                              : "bg-white/95 text-art-brown border border-art-border"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Allergens Trigger */}
                    {item.allergens && item.allergens.length > 0 && (
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => setActiveAllergenTooltip(activeAllergenTooltip === item.id ? null : item.id)}
                          className="p-1 px-1.5 rounded-md bg-white/95 border border-art-border text-art-brown hover:text-art-accent transition-colors cursor-pointer"
                          title="Show allergen details"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Allergen tooltip balloon */}
                        {activeAllergenTooltip === item.id && (
                          <div className="absolute right-0 mt-1.5 w-32 p-2 rounded-lg bg-white border border-art-border text-[10px] text-art-muted z-10 shadow-lg leading-tight">
                            <span className="font-bold text-art-brown block mb-0.5">Allergens:</span>
                            {item.allergens.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Rating / Category */}
                  <div className="p-4 pb-0 flex items-center justify-between text-[11px] font-mono font-bold">
                    <span className="text-art-accent uppercase tracking-widest">{item.category}</span>
                    <div className="flex items-center gap-1 text-art-accent">
                      <Star className="w-3 h-3 fill-art-accent text-art-accent" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {/* Name and description text */}
                  <div className="px-4 py-2">
                    <h3 className="font-display font-bold text-base text-art-brown hover:text-art-accent transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-art-muted mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Price and dynamic add tray triggers */}
                <div className="p-4 pt-2 border-t border-art-border flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest font-bold text-art-muted font-mono leading-none">
                      Pricing
                    </span>
                    <span className="text-lg font-black text-art-brown font-mono">
                      ₹{item.price}
                      {item.category === "cakes" && <span className="text-xs font-normal text-art-muted">/kg</span>}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddClick(item)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                      justAddedItem === item.id
                        ? "bg-green-600 text-white shadow-green-950/10 scale-95"
                        : "bg-art-accent/10 hover:bg-art-accent border border-art-accent/30 text-art-brown hover:text-white hover:scale-102 active:scale-95 duration-200"
                    }`}
                  >
                    {justAddedItem === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tray It</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-art-border shadow-sm">
            <UtensilsCrossed className="w-10 h-10 text-art-cream mx-auto mb-3" />
            <p className="text-art-brown font-serif font-bold italic">No artisanal treats found</p>
            <p className="text-xs text-art-muted mt-1">Try clearing your filters or testing another search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}
