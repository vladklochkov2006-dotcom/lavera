import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send, ShoppingBag, Plus, Minus, Heart, ArrowRight } from 'lucide-react';
import { OrderItem, openTelegramOrder } from '../utils/telegram';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenCatalog: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCatalog
}: CartDrawerProps) {
  const [cardMessage, setCardMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Сегодня (ближайшее время)');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutTelegram = () => {
    openTelegramOrder({
      items,
      cardMessage,
      deliveryDate,
      isAnonymous
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-xl text-text-dark">
                    Корзина ({totalCount})
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-text-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg font-serif text-text-dark">Корзина пуста</h4>
                    <p className="text-sm text-text-dark/60 max-w-xs mx-auto">
                      Выберите подарок из каталога или соберите индивидуальный набор с менеджером.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenCatalog();
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark underline underline-offset-4 pt-2"
                    >
                      <span>Перейти в каталог</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items list */}
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3 bg-bg-cream rounded-2xl border border-gray-100 items-center"
                        >
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-text-dark truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-primary font-medium mt-0.5">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </p>
                            
                            {/* Counter */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs hover:border-primary transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-semibold px-1">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs hover:border-primary transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Clear cart */}
                    <div className="text-right">
                      <button
                        onClick={onClearCart}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Очистить корзину
                      </button>
                    </div>

                    {/* Delivery Time Selection */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text-dark">
                        Когда доставить:
                      </label>
                      <select
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-primary"
                      >
                        <option value="Сегодня (ближайшее время 2-3 ч)">Сегодня (ближайшее время 2-3 ч)</option>
                        <option value="Сегодня вечер (18:00 - 22:00)">Сегодня вечер (18:00 - 22:00)</option>
                        <option value="Завтра утром (09:00 - 13:00)">Завтра утром (09:00 - 13:00)</option>
                        <option value="Завтра днем (13:00 - 18:00)">Завтра днем (13:00 - 18:00)</option>
                        <option value="Точная дата (уточню с менеджером)">Точная дата (уточню с менеджером)</option>
                      </select>
                    </div>

                    {/* Free Postcard Field */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold uppercase tracking-wider text-text-dark flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-primary" />
                          Бесплатная открытка:
                        </label>
                        <span className="text-[11px] text-primary">ручная подпись</span>
                      </div>
                      <textarea
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                        placeholder="Текст открытки для получателя..."
                        rows={2}
                        className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-primary"
                      />
                    </div>

                    {/* Anonymous toggle */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="anon-toggle"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-primary focus:ring-primary w-4 h-4"
                      />
                      <label htmlFor="anon-toggle" className="text-xs text-text-dark/80 cursor-pointer">
                        🤫 Сделать доставку полностью анонимной
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-bg-cream space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-dark/70">Итого:</span>
                    <span className="text-2xl font-serif text-text-dark font-medium">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>

                  <div className="text-[11px] text-text-dark/60 leading-tight">
                    * Менеджер согласует фото букета/бокса в Telegram перед отправкой и вышлет ссылку на оплату.
                  </div>

                  <button
                    onClick={handleCheckoutTelegram}
                    className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white py-4 px-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2AABEE]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Оформить заказ в Telegram</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
