
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    text: "Заказал вечером — утром уже доставили. Девушка была в восторге.",
    author: "Александр",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop"
  },
  {
    text: "Вообще не разбираюсь в подарках, выбрал готовый набор за минуту. Очень удобно.",
    author: "Максим",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop"
  },
  {
    text: "Отдельный плюс за открытку — получилось очень красиво.",
    author: "Дмитрий",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop"
  }
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark mb-4">Нам доверяют</h2>
          <p className="text-text-dark/60">Реальные отзывы наших клиентов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group rounded-2xl overflow-hidden bg-bg-cream border border-gray-100 hover:shadow-xl transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={review.image} 
                  alt="Фото подарка" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                  ))}
                </div>
              </div>
              <div className="p-8">
                <p className="text-lg text-text-dark leading-relaxed italic mb-6">
                  «{review.text}»
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-text-dark/50 font-medium">
                    {review.author[0]}
                  </div>
                  <span className="font-medium text-text-dark">{review.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
