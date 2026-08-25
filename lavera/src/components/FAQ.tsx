import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Send } from 'lucide-react';
import { openTelegramOrder } from '../utils/telegram';

const faqs = [
  {
    q: "Как оформить заказ через Telegram-менеджера?",
    a: "Вы можете выбрать готовый подарок в каталоге, воспользоваться экспресс-подбором или конструктором подарка. При нажатии на кнопку «Заказать» вас автоматически переведет в защищенный чат с личным консьерж-менеджером в Telegram с предзаполненными параметрами вашего заказа. Менеджер сразу примет заказ в работу."
  },
  {
    q: "Как происходит оплата заказа?",
    a: "Оплата происходит после полного согласования всех деталей с вашим менеджером в Telegram. Сначала флористы и кондитеры собирают заказ, менеджер присылает вам фото/видео готового подарка и открытки, и только после вашего одобрения высылает реквизиты или ссылку на оплату любым российским банком (СБП, перевод, картой любого банка)."
  },
  {
    q: "Можно ли заказать доставку сегодня?",
    a: "Да, мы осуществляем доставку день в день при оформлении заказа до 18:00. Среднее время сборки и бережной доставки курьером — от 2 до 4 часов."
  },
  {
    q: "Можно ли выбрать точное время доставки?",
    a: "Конечно. Вы можете указать удобный 30-минутный интервал при согласовании с менеджером в Telegram."
  },
  {
    q: "Можно ли добавить персональный текст на открытку?",
    a: "Да, это абсолютно бесплатно! Наш каллиграф от руки перенесет ваш текст чернилами на фактурную дизайнерскую открытку."
  },
  {
    q: "Можно ли сделать анонимную доставку?",
    a: "Абсолютно. Мы гарантируем 100% конфиденциальность. Курьер не разглашает имя отправителя, и получатель узнает только то, что написано в открытке."
  },
  {
    q: "Можно ли изменить состав готового набора?",
    a: "Да! Вы можете попросить менеджера в Telegram заменить сорт цветов, добавить сладости или свечи, изменить размер букета под ваш персональный бюджет."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wide text-sm uppercase mb-2 inline-block">
            Ответы на вопросы
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark">Частые вопросы</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-b border-gray-100 pb-4"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex justify-between items-center py-4 text-left group"
              >
                <span className={`text-base md:text-lg font-medium transition-colors ${openIdx === idx ? 'text-primary font-semibold' : 'text-text-dark group-hover:text-primary'}`}>
                  {faq.q}
                </span>
                <span className="ml-4 flex-shrink-0 text-text-dark/50">
                  {openIdx === idx ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-text-dark/70 text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 p-6 rounded-3xl bg-bg-cream border border-gray-100 text-center space-y-3">
          <h4 className="font-serif text-lg text-text-dark">Остались вопросы или нестандартный запрос?</h4>
          <p className="text-xs text-text-dark/60 max-w-md mx-auto">
            Наш менеджер ответит вам в Telegram в течение 2-3 минут и поможет с выбором.
          </p>
          <button
            onClick={() => openTelegramOrder({ notes: 'Вопрос из раздела FAQ' })}
            className="inline-flex items-center gap-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white px-6 py-2.5 rounded-full text-xs font-medium transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Написать менеджеру в Telegram</span>
          </button>
        </div>
      </div>
    </section>
  );
}
