
import { motion } from 'framer-motion';

const advantages = [
  {
    title: '«Не нужно думать»',
    desc: 'Мы уже собрали красивые комбинации подарков.',
    num: '01'
  },
  {
    title: '«Доставка сегодня»',
    desc: 'Быстро доставим подарок по вашему адресу.',
    num: '02'
  },
  {
    title: '«Персональная открытка»',
    desc: 'Добавьте свой текст — мы красиво оформим его.',
    num: '03'
  },
  {
    title: '«Всё в одном заказе»',
    desc: 'Цветы, подарок и сладости можно заказать вместе.',
    num: '04'
  }
];

export default function Advantages() {
  return (
    <section className="py-24 bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary font-medium tracking-wide text-sm uppercase mb-2 inline-block">
              Преимущества
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-text-dark">Почему LAVÉRA</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {advantages.map((adv, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-default"
            >
              <div className="flex items-start gap-6">
                <span className="text-4xl font-serif text-primary/20 group-hover:text-primary transition-colors duration-500">
                  {adv.num}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-text-dark mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-text-dark/70 text-lg leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
