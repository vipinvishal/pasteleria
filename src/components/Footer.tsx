import { MapPin, Phone, Mail, Clock, Compass, Navigation, ExternalLink } from "lucide-react";

export default function Footer() {
  const coordinates = { lat: "28.6644963", lng: "77.387941" };

  return (
    <footer id="location" className="relative bg-white text-art-brown pt-24 pb-12 border-t border-art-border">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* LEFT 5 Cols: Editorial Store Details */}
          <div className="lg:col-span-5 space-y-7">
            <div className="text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-art-brown flex items-center justify-center text-white font-serif font-black text-2xl shadow-md border-2 border-art-accent shrink-0">
                  P
                </div>
                <div className="text-left">
                  <span className="font-display font-black text-3xl tracking-tight text-art-brown italic block leading-none font-serif">
                    Pasteleria
                  </span>
                  <span className="block text-[10px] uppercase tracking-widest text-[#C48C58] font-mono font-bold mt-1">
                    Artisanal Cafe
                  </span>
                </div>
              </div>
              <p className="text-xs text-art-muted mt-4 leading-relaxed max-w-sm">
                Specialized in gourmet 100% eggless cream cakes, custom birthday structures, and crunchy patties. Our boutique kitchen crafts sweet moments with pure love and hygiene.
              </p>
            </div>

            {/* Structured Store stats */}
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-art-brown uppercase tracking-wider font-mono">Boutique Store Address</h4>
                  <p className="text-xs text-art-muted mt-1 leading-relaxed">
                    Shalimar Garden, Sahibabad, Ghaziabad,<br />
                    Uttar Pradesh 201005, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-art-brown uppercase tracking-wider font-mono">Operating Hours</h4>
                  <p className="text-xs text-art-muted mt-1">8:00 AM – 11:30 PM (All Days Open)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-art-brown uppercase tracking-wider font-mono">Pre-Order Call Channels</h4>
                  <p className="text-xs text-art-muted mt-1">
                    <span className="text-art-brown font-mono font-bold">+91 98715 XXXXX</span> <span className="text-art-muted font-normal text-[10px]">(Pickups & Inquiry)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-art-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-art-brown uppercase tracking-wider font-mono">Allergen & Custom Cake Mails</h4>
                  <p className="text-xs text-art-muted mt-1 font-mono">orders@pasteleria.cafe</p>
                </div>
              </div>
            </div>

            {/* Quick-links redirect */}
            <div className="pt-2 text-left">
              <a
                href="https://maps.app.goo.gl/yM3bUXsw9eD9NxdB8"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-art-border hover:border-art-accent/40 text-xs font-bold text-art-brown transition-all hover:scale-[1.01] shadow-sm cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-art-accent" />
                <span>Open Google Maps Pin</span>
                <ExternalLink className="w-3 h-3 text-art-muted ml-1" />
              </a>
            </div>
          </div>

          {/* RIGHT 7 Cols: Interactive Styled Location Map Box */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-art-border p-5 shadow-sm overflow-hidden group">
            <div className="flex justify-between items-center mb-4 text-left">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-art-accent">Geographical Anchor</span>
                <h3 className="font-display font-bold text-sm text-art-brown mt-0.5">Shalimar Garden Shopping District Map</h3>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-art-muted font-mono">
                <Navigation className="w-3.5 h-3.5 text-art-accent" />
                <span>Sahibabad Block</span>
              </div>
            </div>

            {/* Interactive map snippet container */}
            <div className="relative rounded-2xl h-80 overflow-hidden border border-art-border bg-art-bg">
              <iframe
                title="Google Maps Location for Pasteleria Ghaziabad"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14001.328373302685!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1c4bc9f559b%3A0x537bc081d9f017bb!2sPasteleria!5e0!3m2!1sen!2sin!4v1700640000000!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay card details */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-xs border border-art-border text-xs shadow-md hidden sm:flex items-center justify-between text-left">
                <div>
                  <p className="font-bold text-art-brown font-display text-xs">Located at Shalimar Garden</p>
                  <p className="text-[10px] text-art-muted font-mono mt-0.5">Lat/Lng: {coordinates.lat}, {coordinates.lng}</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-art-cream/50 font-mono font-bold text-[9px] text-art-accent uppercase border border-art-border">
                    2 Tier Slices AVAILABLE
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* BOTTOM LEGAL SECTION */}
        <div className="border-t border-art-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-art-muted gap-4 text-left">
          <p>© 2026 Pasteleria. Made with love for Ghaziabad & Delhi-NCR sweet and savory lovers. All rights reserved.</p>
          <div className="flex gap-5 font-mono text-[10px]">
            <span className="text-art-accent font-bold">100% EGGLESS CERTIFIED</span>
            <span>HYGIENIC BAKERY STANDARD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
