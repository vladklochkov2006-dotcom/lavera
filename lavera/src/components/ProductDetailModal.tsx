import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { openTelegramOrder } from '../utils/telegram';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, cardMessage?: string) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [cardMessage, setCardMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleTelegramOrder = () => {
    openTelegramOrder({
      productName: product.name,
      productPrice: product.price * quantity,
      cardMessage: cardMessage,
      items: [{
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        category: product.categoryLabel,
        imageUrl: product.image
      }]
    });
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, cardMessage);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 md:bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-text-dark transition-colors backdrop-blur-sm"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="w-full md:w-1/2 h-72 md:h-auto relative bg-gray-100 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-primary uppercase tracking-wider">
              {product.categoryLabel}
            </div>
            {product.oldPrice && (
              <div className="absolute bottom-4 left-4 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Выгода {(product.oldPrice - product.price).toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>

          {/* Right: Content & Order Flow */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl md:text-3xl font-serif text-text-dark font-medium">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-serif text-text-dark mb-3">
                {product.name}
              </h2>

              <p className="text-text-dark/70 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Composition */}
              {product.composition && product.composition.length > 0 && (
                <div className="mb-6 bg-bg-cream p-4 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-dark/70 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Состав и детали:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-dark/80">
                    {product.composition.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Free postcard input */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-primary" />
                    Текст для открытки (бесплатно):
                  </span>
                  <span className="text-primary font-normal lowercase text-[11px]">от руки каллиграфом</span>
                </label>
                <textarea
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Напишите пару теплых слов (или оставьте пустым, если напишете сами)..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50/50"
                />
              </div>

              {/* Quantity selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-dark/70">
                  Количество:
                </span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-sm font-medium transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-sm font-medium transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Direct Order Button */}
              <button
                onClick={handleTelegramOrder}
                className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2AABEE]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="w-4 h-4" />
                <span>Оформить заказ</span>
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Добавлено в корзину!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Добавить в корзину ({(product.price * quantity).toLocaleString('ru-RU')} ₽)</span>
                  </>
                )}
              </button>

              {/* Guarantees micro-badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-text-dark/60 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-primary" />
                  Доставка от 2 часов
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  Фото перед отправкой
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
