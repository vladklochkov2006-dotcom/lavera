import { motion } from 'framer-motion';
import { Send, CreditCard, Camera, ShieldCheck } from 'lucide-react';
import { openTelegramOrder } from '../utils/telegram';

export default function DeliveryPaymentSection() {
  const steps = [
    {
      icon: Send,
      step: '01',
      title: 'Быстрый заказ в Telegram',
      desc: 'Вы выбираете готовый подарок на сайте или описываете свои пожелания персональному консьерж-менеджеру.'
    },
    {
      icon: Camera,
      step: '02',
      title: 'Согласование фото перед отправкой',
      desc: 'Флористы и кондитеры собирают сет, а менеджер присылает детальные фото и видео готовой композиции вам в чат.'
    },
    {
      icon: CreditCard,
      step: '03',
      title: 'Безопасная оплата',
      desc: 'Оплата производится после полного согласования состава: любым российским банком (СБП, перевод, картой).'
    },
    {
      icon: ShieldCheck,
      step: '04',
      title: 'Премиум-доставка',
      desc: 'Вежливый курьер бережно доставляет подарок в транспортировочном боксе точно в назначенный временной слот.'
    }
  ];

  return (
    <section id="delivery-payment" className="py-24 bg-bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wide text-sm uppercase mb-2 inline-block">
            Сервис и забота
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark mb-4">
            Как мы работаем & Оплата
          </h2>
          <p className="text-text-dark/60 max-w-xl mx-auto text-base">
            Персональный консьерж-сервис: от подбора до вручения с фотоотчетом в Telegram.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 relative group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-2xl text-primary/20 group-hover:text-primary transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="font-serif text-xl text-text-dark mb-2">
                {item.title}
              </h3>
              <p className="text-text-dark/70 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Telegram CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => openTelegramOrder({ notes: 'Вопрос по заказу и оплате' })}
            className="inline-flex items-center gap-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white px-8 py-4 rounded-full font-medium text-base shadow-lg shadow-[#2AABEE]/25 transition-all transform hover:-translate-y-1"
          >
            <Send className="w-5 h-5" />
            <span>Задать вопрос менеджеру в Telegram</span>
          </button>
        </div>

      </div>
    </section>
  );
}
