/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Mail, 
  Phone, 
  X, 
  ChevronRight, 
  Menu,
  ArrowUpRight,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

// --- Types ---

interface Artwork {
  id: number;
  title: string;
  medium: string;
  size: string;
  price: string;
  imageUrl: string;
  isSoldOut?: boolean;
}

// --- Mock Data ---

const ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: "Little Ganesha",
    medium: "Acrylic on Canvas",
    size: "6 x 6 inches",
    price: "Rs 399 INR",
    imageUrl: "https://image2url.com/r2/default/images/1772970566259-96ec78fb-0864-4dfc-8976-3f3aeaab52b1.jpeg",
    isSoldOut: true
  },
  {
    id: 2,
    title: "Shivlingam",
    medium: "Acrylic on Canvas",
    size: "6 inches",
    price: "Rs 449 INR",
    imageUrl: "https://image2url.com/r2/default/images/1773464538670-ca20e25e-00a6-4182-9d53-0943590e9c2b.jpeg"
  },
  {
    id: 3,
    title: "Green Forest",
    medium: "Acrylic on Canvas",
    size: "6 x 8 inches",
    price: "Rs 299 INR",
    imageUrl: "https://image2url.com/r2/default/images/1773464793063-ef1a1b5b-29e5-42a6-98ec-9cc2aaed586d.jpeg"
  },
  {
    id: 4,
    title: "Ember Moon",
    medium: "Acrylic on Canvas",
    size: "6 x 8 inches",
    price: "Rs 299 INR",
    imageUrl: "https://image2url.com/r2/default/images/1772970727278-ac8b5bb9-9805-4f28-8ac6-a1eb0559eee6.jpeg"
  },
  {
    id: 5,
    title: "Golden Passage",
    medium: "Acrylic on Canvas",
    size: "10 x 12 inches",
    price: "Rs 349 INR",
    imageUrl: "https://image2url.com/r2/default/images/1772970769348-24ce8a19-1376-44d2-a99a-01ea7e000c21.jpeg"
  },
  {
    id: 6,
    title: "Starlit Tides",
    medium: "Acrylic on Canvas",
    size: "6 x 6 inches",
    price: "Rs 199 INR",
    imageUrl: "https://image2url.com/r2/default/images/1772971007598-8ec239d9-3309-4b7b-a7d3-3b5b28a65294.jpeg"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-beige-50/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-end items-center">


        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-base font-medium uppercase tracking-widest text-stone-900 hover:text-stone-500 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-stone-900 hover:text-stone-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-beige-50 border-t border-beige-200 p-6 md:hidden flex flex-col space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif tracking-widest uppercase text-center"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/hero/1920/1080?blur=2" 
          alt="Studio Background" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beige-50/0 via-beige-50/50 to-beige-50" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif mb-8 leading-tight italic"
        >
          art by Ash
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-lg text-stone-600 mb-12 font-light leading-relaxed"
        >
          Exploring the intersection of nature, spirituality, and inner peace through expressive forms, blending traditional techniques with acrylic on canvas.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#gallery" 
            className="inline-flex items-center px-10 py-4 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-stone-800 transition-all group"
          >
            View Gallery
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-400"
      >
        <div className="w-[1px] h-12 bg-stone-300 mx-auto" />
      </motion.div>
    </section>
  );
};

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <section id="gallery" className="py-24 px-6 bg-beige-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl mb-4">The Collection</h2>
            <p className="text-stone-500 max-w-md">A curated selection of recent works available for acquisition.</p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ARTWORKS.map((artwork, index) => (
            <motion.div 
              key={artwork.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className="relative aspect-[4/5] overflow-hidden bg-stone-200 cursor-pointer mb-6"
                onClick={() => setSelectedArtwork(artwork)}
              >
                {artwork.isSoldOut && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.span 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] px-4 py-2 block"
                    >
                      Sold Out
                    </motion.span>
                  </div>
                )}
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <ArrowUpRight size={20} className="text-stone-900" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl mb-1">{artwork.title}</h3>
                  <p className="text-sm text-stone-500 italic mb-1">{artwork.medium}</p>
                  <p className="text-xs text-stone-400 uppercase tracking-tighter">{artwork.size}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-serif mb-3">{artwork.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-stone-200/50">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 text-center">
            * Shipping charges are not included in the listed price and vary as per delivery location.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-beige-50/95 backdrop-blur-xl"
            onClick={() => setSelectedArtwork(null)}
          >
            <button 
              className="absolute top-8 left-8 flex items-center gap-2 text-stone-900 group z-50"
              onClick={() => setSelectedArtwork(null)}
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs uppercase tracking-widest font-medium">Back</span>
            </button>

            <button 
              className="absolute top-8 right-8 text-stone-900 hover:rotate-90 transition-transform duration-300 z-50"
              onClick={() => setSelectedArtwork(null)}
            >
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[80vh] bg-stone-200 shadow-2xl">
                {selectedArtwork.isSoldOut && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className="bg-stone-900 text-white text-xs uppercase tracking-[0.3em] px-6 py-3 block shadow-xl">
                      Sold Out
                    </span>
                  </div>
                )}
                <img 
                  src={selectedArtwork.imageUrl} 
                  alt={selectedArtwork.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4 block">Artwork Details</span>
                  <h2 className="text-5xl mb-2">{selectedArtwork.title}</h2>
                  <p className="text-xl text-stone-500 italic font-serif">{selectedArtwork.medium}</p>
                </div>

                <div className="grid grid-cols-2 gap-8 py-8 border-y border-beige-200">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Dimensions</p>
                    <p className="text-lg">{selectedArtwork.size}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Investment</p>
                    <p className="text-lg">{selectedArtwork.price}</p>
                    <p className="text-[8px] uppercase tracking-wider text-stone-400 mt-1">* Shipping extra</p>
                  </div>
                </div>

                <div className="space-y-4">


                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[3/4] bg-stone-200 overflow-hidden rounded-sm shadow-lg">
            <img 
              src="https://image2url.com/r2/default/images/1772966231554-3c43a584-9b80-4a59-99b1-2c31a44756e7.jpeg" 
              alt="Ashish Jawrani" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-beige-100 -z-10 hidden md:block" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-4 block">The Artist</span>
            <h2 className="text-5xl mb-6">Ashish Jawrani</h2>
          </div>
          
          <div className="space-y-6 text-stone-600 leading-relaxed text-lg font-light">
            <p>
              I am a passionate artist deeply inspired by nature, serene landscapes, and spiritual depictions of divine figures. Art is more than a creative expression for me — it is a source of inner peace and emotional balance. Through every stroke and color, I seek to capture the calm, beauty, and spirituality that I experience while creating.
            </p>
            <p>
              My goal is to share that sense of relief and tranquility with others, allowing viewers to feel connected, comforted, and inspired through my work.
            </p>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-8">

          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-beige-100">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-20">
          <h2 className="text-5xl mb-4">Get in Touch</h2>
          <p className="text-stone-500 max-w-xl mx-auto">For commissions, gallery inquiries, or customizations, please reach out via email or phone.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-16 md:gap-32">
          <div className="space-y-6 text-left">
            <h3 className="text-2xl uppercase tracking-widest text-stone-400 text-xs font-semibold">Contact Details</h3>
            <div className="space-y-4">
              <a href="mailto:artby.ash29@gmail.com" className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group">
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                artby.ash29@gmail.com
              </a>
              <a href="tel:+91-9907067136" className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group">
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                +91- 9907067136
              </a>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <h3 className="text-2xl uppercase tracking-widest text-stone-400 text-xs font-semibold">Social</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/being_ash_aj/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-stone-900 selection:text-white">
      <Navbar />
      <Hero />
      <Gallery />
      <About />
      <Contact />
    </div>
  );
}
