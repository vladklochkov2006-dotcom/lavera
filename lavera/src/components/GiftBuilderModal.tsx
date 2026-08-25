import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Check, Heart } from 'lucide-react';
import { openTelegramOrder } from '../utils/telegram';

interface GiftBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FLOWER_OPTIONS = [
  { id: 'roses-kahala', name: 'Пионовидные розы Kahala', price: 4500, desc: '9 премиальных стойких роз' },
  { id: 'hydrangea-cloud', name: 'Пышные гортензии и эустома', price: 3800, desc: 'Воздушный объемный микс' },
  { id: 'mon-roses-red', name: '15 красных пионовидных роз', price: 6200, desc: 'Классика страсти и элегантности' },
  { id: 'none-flowers', name: 'Без цветов (только подарочный бокс)', price: 0, desc: 'Подарок без флористики' },
];

const SWEET_OPTIONS = [
  { id: 'strawberry-box', name: 'Клубника в бельгийском шоколаде (8 шт.)', price: 2900, desc: 'Callebaut: молочный, белый и рубиновый' },
  { id: 'macarons-mix', name: 'Французские макаруны (8 шт.)', price: 1600, desc: 'Фисташка, малина, маракуйя, лаванда' },
  { id: 'strawberry-gold', name: 'VIP Клубника с золотом 23 карата (16 шт.)', price: 5400, desc: 'Максимальный восторг и эстетика' },
  { id: 'none-sweets', name: 'Без сладостей', price: 0, desc: 'Только цветы и дополнения' },
];

const ADDITION_OPTIONS = [
  { id: 'candle-sandal', name: 'Соевая свеча «Fig & Sandalwood»', price: 2400, desc: 'Деревянный потрескивающий фитиль' },
  { id: 'silk-mask', name: 'Маска из натурального шелка Mulberry', price: 3200, desc: 'Невероятная нежность и сон' },
  { id: 'diffuser-home', name: 'Парфюмированный диффузор для дома', price: 2800, desc: 'Стойкий селективный аромат' },
  { id: 'none-additions', name: 'Без дополнений', price: 0, desc: 'Базовый сет' },
];

export default function GiftBuilderModal({ isOpen, onClose }: GiftBuilderModalProps) {
  const [selectedFlower, setSelectedFlower] = useState(FLOWER_OPTIONS[0]);
  const [selectedSweet, setSelectedSweet] = useState(SWEET_OPTIONS[0]);
  const [selectedAddition, setSelectedAddition] = useState(ADDITION_OPTIONS[0]);
  const [cardMessage, setCardMessage] = useState('');
  const [boxColor, setBoxColor] = useState('Пудровый бархат');

  if (!isOpen) return null;

  const totalPrice = selectedFlower.price + selectedSweet.price + selectedAddition.price + 1500; // 1500 base packaging + velvet box

  const handleOrderTelegram = () => {
    openTelegramOrder({
      customGiftDetails: {
        flower: selectedFlower.id === 'none-flowers' ? undefined : selectedFlower.name,
        sweet: selectedSweet.id === 'none-sweets' ? undefined : selectedSweet.name,
        addition: selectedAddition.id === 'none-additions' ? undefined : selectedAddition.name,
        boxColor: boxColor,
        totalPrice: totalPrice,
      },
      cardMessage: cardMessage
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full z-10 my-6 max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-bg-cream/50">
            <div>
              <span className="text-primary font-medium tracking-wide text-xs uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Интерактивный конструктор
              </span>
              <h2 className="text-2xl font-serif text-text-dark mt-0.5">
                Собрать идеальный подарок
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-text-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-8 flex-1">
            {/* Step 1: Flowers */}
            <div>
              <label className="block text-sm font-serif font-medium text-text-dark mb-3">
                1. Выберите цветочную основу:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FLOWER_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFlower(f)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      selectedFlower.id === f.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm text-text-dark">{f.name}</span>
                        {selectedFlower.id === f.id && (
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-dark/60 mt-1">{f.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary mt-3 block">
                      {f.price === 0 ? 'Без цветов' : `+${f.price.toLocaleString('ru-RU')} ₽`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sweets */}
            <div>
              <label className="block text-sm font-serif font-medium text-text-dark mb-3">
                2. Добавьте сладости ручной работы:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SWEET_OPTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSweet(s)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      selectedSweet.id === s.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm text-text-dark">{s.name}</span>
                        {selectedSweet.id === s.id && (
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-dark/60 mt-1">{s.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary mt-3 block">
                      {s.price === 0 ? 'Без сладостей' : `+${s.price.toLocaleString('ru-RU')} ₽`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Additions */}
            <div>
              <label className="block text-sm font-serif font-medium text-text-dark mb-3">
                3. Дополните подарок деталями:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ADDITION_OPTIONS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAddition(a)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      selectedAddition.id === a.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm text-text-dark">{a.name}</span>
                        {selectedAddition.id === a.id && (
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-dark/60 mt-1">{a.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary mt-3 block">
                      {a.price === 0 ? 'Без дополнений' : `+${a.price.toLocaleString('ru-RU')} ₽`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Box Styling & Postcard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-dark mb-2">
                  Цвет бархатной коробки:
                </label>
                <div className="flex gap-2">
                  {['Пудровый бархат', 'Винный бордо', 'Глубокий изумруд', 'Слоновая кость'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBoxColor(c)}
                      className={`text-xs py-2 px-2.5 rounded-xl border flex-1 text-center transition-colors ${
                        boxColor === c ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {c.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-dark mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-primary" />
                    Текст для открытки:
                  </span>
                  <span className="text-primary text-[11px] font-normal">бесплатно</span>
                </label>
                <input
                  type="text"
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Ваши сокровенные слова..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Footer Summary & Order */}
          <div className="p-6 border-t border-gray-100 bg-bg-cream flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-text-dark/60">
                Включает фирменную упаковку, ленту и открытку
              </div>
              <div className="text-2xl font-serif text-text-dark font-medium">
                {totalPrice.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleOrderTelegram}
                className="w-full md:w-auto bg-[#2AABEE] hover:bg-[#229ED9] text-white py-3.5 px-6 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2AABEE]/25 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Согласовать состав в Telegram</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
