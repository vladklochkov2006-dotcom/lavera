import { ShoppingBag } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-100 md:hidden z-30 pb-safe shadow-lg">
      <div className="flex gap-2.5">
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
          className="relative bg-bg-cream border border-gray-200 text-text-dark px-4 py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-1.5 flex-shrink-0 active:scale-[0.98] transition-all"
          aria-label="Корзина"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs font-medium">Корзина</span>
          {cartCount > 0 && (
            <span className="w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
