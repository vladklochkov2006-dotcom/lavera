import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CatalogSection from './components/CatalogSection';
import Timeline from './components/Timeline';
import Advantages from './components/Advantages';
import DeliveryPaymentSection from './components/DeliveryPaymentSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';
import ProductDetailModal from './components/ProductDetailModal';
import GiftBuilderModal from './components/GiftBuilderModal';
import CartDrawer from './components/CartDrawer';
import { Product } from './data/products';
import { OrderItem } from './utils/telegram';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGiftBuilderOpen, setIsGiftBuilderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, _cardMessage?: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            category: product.categoryLabel,
            imageUrl: product.image
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Section navigation
  const handleNavigateSection = (sectionId: string, category?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden relative bg-bg-cream selection:bg-primary selection:text-white">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenGiftBuilder={() => setIsGiftBuilderOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeCategory={activeCategory}
      />

      {/* Main Content */}
      <main className="flex-grow w-full pb-20 md:pb-0">
        {/* Hero Section with Interactive Selector */}
        <Hero
          onOpenGiftBuilder={() => setIsGiftBuilderOpen(true)}
          onOpenProductModal={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          onNavigateToCatalog={(category) => handleNavigateSection('catalog', category || 'all')}
        />

        {/* Interactive Catalog Section */}
        <CatalogSection
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onOpenProductModal={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          onOpenGiftBuilder={() => setIsGiftBuilderOpen(true)}
        />

        {/* How It Works Timeline */}
        <Timeline />

        {/* Why LAVÉRA Advantages */}
        <Advantages />

        {/* Delivery & Payment concierge details */}
        <DeliveryPaymentSection />

        {/* FAQ with updated payment & Telegram details */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenGiftBuilder={() => setIsGiftBuilderOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <GiftBuilderModal
        isOpen={isGiftBuilderOpen}
        onClose={() => setIsGiftBuilderOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCatalog={() => handleNavigateSection('catalog', 'all')}
      />
    </div>
  );
}

export default App;
