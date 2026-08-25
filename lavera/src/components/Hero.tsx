import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Eye, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { openTelegramOrder } from '../utils/telegram';

interface HeroProps {
  onOpenGiftBuilder: () => void;
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigateToCatalog: (category?: string) => void;
}

export default function Hero({
  onOpenGiftBuilder,
  onOpenProductModal,
  onAddToCart,
  onNavigateToCatalog
}: HeroProps) {
  const [selectedBudget, setSelectedBudget] = useState('5–10 000 ₽');
  const [selectedOccasion, setSelectedOccasion] = useState('День рождения');
  const [showCuratedOptions, setShowCuratedOptions] = useState(false);
  const [curatedProducts, setCuratedProducts] = useState<Product[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);

  const budgets = ['До 5 000 ₽', '5–10 000 ₽', 'От 10 000 ₽'];
  const occasions = ['День рождения', 'Просто так', 'Годовщина', 'Извиниться'];

  const handleGenerateOptions = () => {
    let tier: 'low' | 'medium' | 'high' = 'medium';
    if (selectedBudget === 'До 5 000 ₽') tier = 'low';
    if (selectedBudget === 'От 10 000 ₽') tier = 'high';

    // Find products matching the tier & occasion
    let matches = PRODUCTS.filter(
      (p) => p.budgetTier === tier && p.occasions.includes(selectedOccasion)
    );

    // Fallback if not enough matches
    if (matches.length < 3) {
      const rest = PRODUCTS.filter((p) => p.budgetTier === tier && !matches.includes(p));
      matches = [...matches, ...rest];
    }

    if (matches.length < 3) {
      const otherTier = PRODUCTS.filter((p) => !matches.includes(p));
      matches = [...matches, ...otherTier];
    }

    setCuratedProducts(matches.slice(0, 3));
    setShowCuratedOptions(true);
  };

  const handleQuickTelegram = (product: Product) => {
    openTelegramOrder({
      productName: product.name,
      productPrice: product.price,
      budget: selectedBudget,
      occasion: selectedOccasion,
      items: [{
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        category: product.categoryLabel,
        imageUrl: product.image
      }]
    });
  };

  const handleAddToCartWithAnimation = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        {/* Left Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium tracking-wide text-xs uppercase mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
              <Sparkles className="w-3.5 h-3.5" />
              Премиальный digital-бутик подарков
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-text-dark leading-tight mb-6">
              Подарки, которые <br />
              <span className="text-primary italic">говорят за тебя</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-text-dark/70 max-w-lg mx-auto md:mx-0"
          >
            «Я хочу сделать ей приятно, но не знаю, что купить». <br className="hidden md:block" />
            Не нужно ничего придумывать. LAVÉRA уже всё сделала за вас — персональный консьерж согласует все детали.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <button
              onClick={onOpenGiftBuilder}
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
            >
              Собрать идеальный подарок
            </button>
            <button
              onClick={() => onNavigateToCatalog('all')}
              className="w-full sm:w-auto px-6 py-4 rounded-full text-base font-medium text-text-dark hover:text-primary transition-colors border border-gray-200 hover:border-primary bg-white/80"
            >
              Смотреть каталог
            </button>
          </motion.div>
        </div>

        {/* Right Visual / Selector */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 w-full max-w-md mx-auto"
        >
          <div className="bg-white p-7 md:p-8 rounded-3xl shadow-2xl shadow-primary/10 border border-primary/10 relative">
            <div className="text-center mb-6">
              <span className="text-[11px] font-semibold text-primary uppercase tracking-widest block mb-1">Экспресс-подбор</span>
              <h3 className="text-xl font-serif text-text-dark">Подберем вариант за 1 минуту</h3>
            </div>
            
            <div className="space-y-5">
              {/* 1. Budget Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-dark/70 mb-2">
                  1. Выберите бюджет
                </label>
                <div className="flex gap-2">
                  {budgets.map((budget) => (
                    <button
                      key={budget}
                      onClick={() => setSelectedBudget(budget)}
                      className={`flex-1 py-2.5 px-2 text-xs rounded-xl border transition-all font-medium ${
                        selectedBudget === budget
                          ? 'border-primary bg-primary text-white shadow-sm'
                          : 'border-gray-200 hover:border-primary/50 text-text-dark/80 bg-gray-50/50'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 2. Occasion Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-dark/70 mb-2">
                  2. Повод
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {occasions.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelectedOccasion(reason)}
                      className={`py-2.5 px-3 text-xs rounded-xl border transition-all font-medium text-left flex items-center justify-between ${
                        selectedOccasion === reason
                          ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                          : 'border-gray-200 hover:border-gray-300 text-text-dark/80 bg-gray-50/50'
                      }`}
                    >
                      <span>{reason}</span>
                      {selectedOccasion === reason && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={handleGenerateOptions}
                  className="w-full bg-text-dark text-white py-3.5 rounded-xl font-medium text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-rose-300" />
                  <span>Показать 3 варианта</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Dynamic Curated Options Drawer / Grid */}
      <AnimatePresence>
        {showCuratedOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto mt-16 pt-12 border-t border-gray-200/80"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-primary">
                  Персональная подборка для вас
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-text-dark">
                  Повод: «{selectedOccasion}» • Бюджет: {selectedBudget}
                </h3>
              </div>
              <button
                onClick={() => onNavigateToCatalog('all')}
                className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
              >
                <span>Смотреть весь каталог</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {curatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/70 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-medium text-primary uppercase">
                      {product.categoryLabel}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-serif text-text-dark font-medium mb-1">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <h4 className="font-serif text-base text-text-dark mb-1.5 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-text-dark/65 line-clamp-2 mb-4">
                        {product.shortDesc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleQuickTelegram(product)}
                        className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Быстрый заказ</span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onOpenProductModal(product)}
                          className="flex-1 bg-gray-50 hover:bg-gray-100 text-text-dark py-2 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 border border-gray-200 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Подробнее</span>
                        </button>
                        <button
                          onClick={() => handleAddToCartWithAnimation(product)}
                          className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-white py-2 px-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                        >
                          {addedId === product.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>В корзине</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3 h-3" />
                              <span>В корзину</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
