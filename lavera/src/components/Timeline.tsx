
import { motion } from 'framer-motion';
import { MousePointerClick, Gift, Truck, CheckCircle2, Heart } from 'lucide-react';

const steps = [
  { icon: MousePointerClick, title: 'Заказ' },
  { icon: Gift, title: 'Собираем подарок' },
  { icon: Truck, title: 'Передаём курьеру' },
  { icon: CheckCircle2, title: 'Доставляем' },
  { icon: Heart, title: 'Она получает сюрприз ❤️', highlight: true },
];

export default function Timeline() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-text-dark">Как это работает</h2>
        </div>

        <div className="relative">
          {/* Connector line - hidden on mobile, visible on md */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center w-full md:w-1/5"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm transition-transform hover:scale-105 ${
                  step.highlight ? 'bg-primary text-white shadow-primary/20' : 'bg-bg-cream text-primary border border-gray-100'
                }`}>
                  <step.icon strokeWidth={1.5} className={step.highlight ? 'w-8 h-8' : 'w-7 h-7'} />
                </div>
                <h4 className={`text-sm md:text-base font-medium ${step.highlight ? 'text-primary' : 'text-text-dark'}`}>
                  {step.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
