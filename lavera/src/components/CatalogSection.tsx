import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Send, Eye, Sparkles, Filter, Check, Plus } from 'lucide-react';
import { Product, CATEGORIES, PRODUCTS } from '../data/products';
import { openTelegramOrder } from '../utils/telegram';

interface CatalogSectionProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenGiftBuilder: () => void;
}

export default function CatalogSection({
  activeCategory,
  onSelectCategory,
  onOpenProductModal,
  onAddToCart,
  onOpenGiftBuilder
}: CatalogSectionProps) {
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filter products by category and budget
  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const budgetMatch = budgetFilter === 'all' || product.budgetTier === budgetFilter;
    return categoryMatch && budgetMatch;
  });

  const handleAddToCartWithFeedback = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const handleQuickTelegramOrder = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    openTelegramOrder({
      productName: product.name,
      productPrice: product.price,
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

  return (
    <section id="catalog" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-primary font-medium tracking-wide text-xs md:text-sm uppercase mb-2 inline-block">
            Коллекция LAVÉRA
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-text-dark mb-3">
            Каталог подарков и цветов
          </h2>
          <p className="text-text-dark/60 max-w-xl mx-auto text-xs sm:text-sm md:text-base">
            Каждая композиция собирается вручную из свежайших цветов и десертов премиум-качества.
          </p>
        </div>

        {/* Category Tabs & Budget Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 md:mb-10 border-b border-gray-100 pb-5">
          {/* Category Tabs - Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? PRODUCTS.length 
                : PRODUCTS.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 sm:px-4 md:px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                      : 'bg-bg-cream text-text-dark/80 hover:bg-gray-100 hover:text-text-dark'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200/70 text-text-dark/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Budget Filter buttons */}
          <div className="flex items-center gap-2 text-xs justify-between sm:justify-start">
            <span className="text-text-dark/50 hidden lg:inline flex items-center gap-1 text-[11px]">
              <Filter className="w-3.5 h-3.5" />
              Бюджет:
            </span>
            <div className="flex bg-bg-cream p-1 rounded-xl border border-gray-100 w-full sm:w-auto justify-between sm:justify-start">
              {[
                { id: 'all', label: 'Все' },
                { id: 'low', label: 'До 5 000 ₽' },
                { id: 'medium', label: '5–10 000 ₽' },
                { id: 'high', label: 'От 10 000 ₽' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBudgetFilter(b.id as any)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-colors flex-1 sm:flex-initial text-center ${
                    budgetFilter === b.id
                      ? 'bg-white text-primary shadow-xs font-semibold'
                      : 'text-text-dark/70 hover:text-text-dark'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-in-a-row on Mobile, 3-in-a-row on Tablets, 3/4-in-a-row on Desktops */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
              onClick={() => onOpenProductModal(product)}
              className="group bg-bg-cream rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1">
                  <span className="bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                  {product.isPopular && (
                    <span className="bg-primary text-white px-2 py-0.5 rounded-full text-[9px] md:text-[11px] font-medium tracking-wide">
                      Хит
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[9px] md:text-[11px] font-medium tracking-wide">
                      New
                    </span>
                  )}
                </div>

                {/* Quick Details Overlay (Desktop only) */}
                <div className="hidden md:flex absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                  <span className="bg-white/95 text-text-dark px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md transform group-hover:scale-105 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Подробнее</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-1 mb-1">
                    <span className="text-sm sm:text-base md:text-xl font-serif text-text-dark font-semibold">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-[10px] md:text-xs text-gray-400 line-through">
                        {product.oldPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xs sm:text-sm md:text-base text-text-dark group-hover:text-primary transition-colors mb-1 line-clamp-1 font-medium">
                    {product.name}
                  </h3>

                  <p className="text-[11px] md:text-xs text-text-dark/65 line-clamp-1 md:line-clamp-2 mb-3 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-gray-200/50">
                  {/* Mobile layout: Primary button + Cart icon button side-by-side */}
                  <div className="flex md:hidden gap-1.5">
                    <button
                      onClick={(e) => handleQuickTelegramOrder(e, product)}
                      className="flex-1 bg-[#2AABEE] text-white py-2 px-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
                      title="Заказать в Telegram"
                    >
                      <Send className="w-3 h-3" />
                      <span>Заказать</span>
                    </button>
                    <button
                      onClick={(e) => handleAddToCartWithFeedback(e, product)}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-text-dark active:scale-[0.95] transition-transform flex-shrink-0"
                      title="В корзину"
                    >
                      {addedId === product.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Desktop layout: Stacked full buttons */}
                  <div className="hidden md:flex flex-col gap-2">
                    <button
                      onClick={(e) => handleQuickTelegramOrder(e, product)}
                      className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Быстрый заказ</span>
                    </button>

                    <button
                      onClick={(e) => handleAddToCartWithFeedback(e, product)}
                      className="w-full bg-white hover:bg-primary hover:text-white text-text-dark border border-gray-200 hover:border-primary py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">В корзине!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>В корзину</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 md:py-16 bg-bg-cream rounded-2xl md:rounded-3xl">
            <p className="text-base md:text-lg font-serif text-text-dark mb-1.5">В выбранной категории нет товаров с таким бюджетом</p>
            <p className="text-xs md:text-sm text-text-dark/60 mb-5">Сбросьте фильтры или обратитесь к менеджеру для индивидуальной сборки.</p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setBudgetFilter('all');
              }}
              className="px-5 py-2.5 bg-primary text-white rounded-full text-xs font-medium"
            >
              Показать все товары
            </button>
          </div>
        )}

        {/* Custom Order Callout Banner */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl">
          <div className="space-y-2 md:space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-[11px] md:text-xs font-medium backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-rose-200" />
              Индивидуальный сервис
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif">
              Не нашли то, что искали?
            </h3>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl">
              Соберите свой уникальный бокс в нашем конструкторе или обратитесь за персональной консультацией.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto">
            <button
              onClick={onOpenGiftBuilder}
              className="px-5 py-3 bg-white text-primary rounded-xl font-medium text-xs sm:text-sm hover:bg-white/90 transition-all text-center shadow-lg"
            >
              Собрать свой набор
            </button>
            <button
              onClick={() => openTelegramOrder({ notes: 'Консультация по индивидуальному заказу' })}
              className="px-5 py-3 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl font-medium text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Консультация</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
