
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1591886811413-5b8d0092d8f9?q=80&w=600&auto=format&fit=crop", // bouquet
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop", // box
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop", // strawberries/sweets
  "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600&auto=format&fit=crop", // packaging
  "https://images.unsplash.com/photo-1511216113885-304b77f9cd4c?q=80&w=600&auto=format&fit=crop", // postcard
  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop"  // aesthetic delivery
];

export default function InstagramBlock() {
  return (
    <section className="py-24 bg-bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark mb-4">LAVÉRA в деталях</h2>
          <p className="text-text-dark/60 max-w-md">Вдохновляйтесь нашими работами и создавайте незабываемые эмоции.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-colors bg-white">
          <Camera className="w-5 h-5" />
          <span>@lavera.gifts</span>
        </button>
      </div>

      {/* Scrolling Gallery or Grid. Let's do a masonry-like or strict grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="aspect-square overflow-hidden bg-gray-100 group cursor-pointer relative"
            >
              <img 
                src={src} 
                alt="Instagram post" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
