import { Flower2, Send } from 'lucide-react';
import { openTelegramOrder, TELEGRAM_FALLBACK_LINK } from '../utils/telegram';

interface FooterProps {
  onNavigateSection: (sectionId: string, category?: string) => void;
}

export default function Footer({ onNavigateSection }: FooterProps) {
  const catalogLinks = [
    { name: 'Подарки', category: 'gifts' },
    { name: 'Цветы', category: 'flowers' },
    { name: 'Боксы', category: 'boxes' },
    { name: 'Дополнения', category: 'additions' },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-text-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 mb-6 cursor-pointer inline-flex"
            >
              <Flower2 className="w-6 h-6 text-primary-light" strokeWidth={1.5} />
              <span className="font-serif text-2xl tracking-[0.2em] font-light uppercase">
                Lavéra
              </span>
            </div>
            <p className="text-white/60 text-base mb-6 max-w-sm">
              Подарки, которые говорят за тебя. Все заказы и консультации координируются персональным консьерж-менеджером.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => openTelegramOrder({ notes: 'Вопрос из подвала сайта' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2AABEE]/20 hover:bg-[#2AABEE] text-[#2AABEE] hover:text-white transition-all text-xs font-medium"
                title="Telegram Консьерж"
              >
                <Send className="w-4 h-4" />
                <span>Написать в Telegram</span>
              </button>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-medium mb-6 uppercase tracking-wider text-white/80">Каталог</h4>
            <ul className="space-y-3">
              {catalogLinks.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigateSection('catalog', item.category)}
                    className="text-white/60 hover:text-white transition-colors text-sm text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-medium mb-6 uppercase tracking-wider text-white/80">Информация</h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleScrollTo('delivery-payment')}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    Доставка
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('delivery-payment')}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    Оплата
                  </button>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleScrollTo('faq')}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <a
                    href={TELEGRAM_FALLBACK_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2AABEE] hover:underline transition-colors text-sm flex items-center gap-1"
                  >
                    <span>Telegram-чат</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs pb-16 md:pb-0">
          <p>© {new Date().getFullYear()} LAVÉRA. Все права защищены. Премиальный сервис подарков.</p>
          <div className="flex gap-6">
            <span className="text-white/50">Согласование фото перед доставкой</span>
            <span className="text-white/50">Оплата любым российским банком</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
