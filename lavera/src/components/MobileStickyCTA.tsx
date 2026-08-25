import { ShoppingBag, Send } from 'lucide-react';
import { openTelegramOrder } from '../utils/telegram';

interface MobileStickyCTAProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenGiftBuilder: () => void;
}

export default function MobileStickyCTA({
  cartCount,
  onOpenCart,
  onOpenGiftBuilder
}: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-gray-100 md:hidden z-40 pb-safe shadow-lg">
      <div className="flex gap-2">
        {/* Telegram Direct button */}
        <button
          onClick={() => openTelegramOrder({ notes: 'Быстрый заказ с мобильного' })}
          className="bg-[#2AABEE] text-white p-3.5 rounded-xl shadow-md flex items-center justify-center flex-shrink-0"
          aria-label="Telegram"
        >
          <Send className="w-5 h-5" />
        </button>

        {/* Gift Builder / Order CTA */}
        <button
          onClick={onOpenGiftBuilder}
          className="flex-1 bg-primary text-white py-3.5 px-4 rounded-xl font-medium text-sm shadow-md shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] truncate"
        >
          Собрать подарок
        </button>

        {/* Cart Button */}
        <button
          onClick={onOpenCart}
          className="relative bg-bg-cream border border-gray-200 text-text-dark p-3.5 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0"
          aria-label="Корзина"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
