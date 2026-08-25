import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flower2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenGiftBuilder: () => void;
  onNavigateSection: (sectionId: string, category?: string) => void;
  activeCategory: string;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenGiftBuilder,
  onNavigateSection,
  activeCategory
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Главная', type: 'scroll', target: 'top' },
    { name: 'Подарки', type: 'catalog', category: 'gifts' },
    { name: 'Цветы', type: 'catalog', category: 'flowers' },
    { name: 'Боксы', type: 'catalog', category: 'boxes' },
    { name: 'Дополнения', type: 'catalog', category: 'additions' },
    { name: 'Доставка и оплата', type: 'scroll', target: 'delivery-payment' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'scroll') {
      if (item.target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (item.target) {
        const el = document.getElementById(item.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.type === 'catalog' && item.category) {
      onNavigateSection('catalog', item.category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white/50 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 cursor-pointer group"
        >
          <Flower2 className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform duration-500" strokeWidth={1.5} />
          <span className="font-serif text-xl tracking-[0.2em] font-light text-primary uppercase">
            Lavéra
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                item.type === 'catalog' && item.category === activeCategory;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-text-dark/80 hover:text-primary'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
            {/* Custom Gift Builder Button */}
            <button
              onClick={onOpenGiftBuilder}
              className="text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary-dark border border-primary/30 hover:border-primary px-3.5 py-1.5 rounded-full transition-all"
            >
              Собрать подарок
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-text-dark hover:text-primary transition-colors group"
              aria-label="Корзина"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-text-dark"
            aria-label="Корзина"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-text-dark"
            aria-label="Меню"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-bg-cream flex flex-col md:hidden"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <Flower2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <span className="font-serif text-xl tracking-[0.2em] font-light text-primary uppercase">
                  Lavéra
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-text-dark"
                aria-label="Закрыть меню"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex flex-col px-6 py-6 gap-4 flex-1 overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item)}
                  className="text-2xl font-serif font-light text-text-dark text-left py-2 hover:text-primary transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}

              <div className="pt-4 mt-auto">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGiftBuilder();
                  }}
                  className="w-full py-4 bg-primary text-white rounded-2xl text-base font-medium"
                >
                  Собрать идеальный подарок
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
