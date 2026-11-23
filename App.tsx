import React, { useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Language, 
  ProductCategory, 
  BrandName, 
  JerseyCustomization,
  DtfTransferItem,
  AppTheme
} from './types';
import { INITIAL_PRODUCTS, loadCmsArticles } from './data/products';
import { Navbar } from './components/Navbar';
import { BrandTicker } from './components/BrandTicker';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ClubKitConfigurator } from './components/ClubKitConfigurator';
import { DtfLogoTransferSection } from './components/DtfLogoTransferSection';
import { ClubOffersSection } from './components/ClubOffersSection';
import { TeamShopContactSection } from './components/TeamShopContactSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LogoModal } from './components/LogoModal';
import { WishlistModal } from './components/WishlistModal';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('sportwelt_theme');
      return (saved === 'bright' || saved === 'dark') ? (saved as AppTheme) : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const cmsItems = loadCmsArticles();
      return [...INITIAL_PRODUCTS, ...cmsItems];
    } catch {
      return [...INITIAL_PRODUCTS];
    }
  });

  useEffect(() => {
    const handleSync = () => {
      setProducts([...INITIAL_PRODUCTS, ...loadCmsArticles()]);
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const dealProduct = products.find(p => p.isDealOfDay) || products.find(p => (p.discountPercentage || 0) > 0);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState<BrandName | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom logo for user store
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Toggle bright/dark theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'bright' : 'dark'));
  };

  // Persist theme
  useEffect(() => {
    try {
      localStorage.setItem('sportwelt_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sportwelt_cart');
      if (!saved) return [];
      const parsed: CartItem[] = JSON.parse(saved);
      // Retain custom configured kits, DTF transfers, or products that actually exist
      return parsed.filter(item => item.isCustomKit || item.isDtfTransfer || products.some(p => p.id === item.productId));
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sportwelt_wishlist');
      if (!saved) return [];
      const parsed: Product[] = JSON.parse(saved);
      // Only keep items that exist in current catalog
      return parsed.filter(item => products.some(p => p.id === item.id));
    } catch {
      return [];
    }
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('sportwelt_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('sportwelt_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist custom logo
  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem('sportwelt_custom_logo');
      if (savedLogo) setCustomLogoUrl(savedLogo);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveLogo = (url: string | null) => {
    setCustomLogoUrl(url);
    if (url) {
      localStorage.setItem('sportwelt_custom_logo', url);
    } else {
      localStorage.removeItem('sportwelt_custom_logo');
    }
  };

  // Add standard product to cart
  const handleAddToCart = (
    product: Product,
    size: string,
    quantity = 1,
    options?: { colorName?: string; withCrest?: boolean }
  ) => {
    setCart(prev => {
      const colorSuffix = options?.colorName ? ` (${options.colorName.split(' / ')[0]})` : '';
      const finalSize = `${size || product.sizes[0] || 'M'}${colorSuffix}`;

      const existingIndex = prev.findIndex(
        item => !item.isCustomKit && item.productId === product.id && item.size === finalSize
      );

      const pricePerUnit = product.price + (options?.withCrest ? 4.90 : 0);

      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          totalPrice: newQty * pricePerUnit
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${product.id}-${finalSize}-${Date.now()}`,
        productId: product.id,
        product,
        size: finalSize,
        quantity,
        totalPrice: pricePerUnit * quantity,
        isCustomKit: false
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  // Add custom configured club kit to cart
  const handleAddCustomKitToCart = (kit: JerseyCustomization) => {
    const quantities = kit.quantities || {};
    const totalQty = Object.values(quantities).reduce<number>((a: number, b: any) => a + (Number(b) || 0), 0);
    const unitPrice = kit.unitPrice || 49.90;
    const totalPrice = totalQty * unitPrice;

    const newItem: CartItem = {
      id: `custom-kit-${Date.now()}`,
      isCustomKit: true,
      customJersey: kit,
      quantity: totalQty,
      totalPrice,
      size: `${totalQty}x Trikotsatz Mix`
    };

    setCart(prev => [...(prev || []), newItem]);
    setIsCartOpen(true);
  };

  // Add DTF Logo Transfer to cart
  const handleAddDtfToCart = (dtfItem: DtfTransferItem) => {
    const newItem: CartItem = {
      id: dtfItem.id,
      isDtfTransfer: true,
      dtfTransfer: dtfItem,
      quantity: dtfItem.quantity,
      totalPrice: dtfItem.subtotal,
      size: dtfItem.mode === 'gang-sheet' 
        ? `${dtfItem.sheetLengthMeters}m Bogen (56cm)` 
        : `${dtfItem.widthCm}×${dtfItem.heightCm} cm`
    };

    setCart(prev => [...(prev || []), newItem]);
    setIsCartOpen(true);
  };

  // Toggle wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  // Update cart item quantity
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.id !== itemId) return item;
        const unitPrice = item.isCustomKit 
          ? (item.customJersey?.unitPrice || 49.90)
          : item.isDtfTransfer
          ? (item.dtfTransfer?.unitPrice || 2.50)
          : (item.product?.price || 0);
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: Number((newQuantity * unitPrice).toFixed(2))
        };
      })
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  // Clear cart on checkout success
  const handleCheckoutSuccess = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // Scroll helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = (cart || []).reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const cartTotal = (cart || []).reduce((acc, item) => acc + (item?.totalPrice || 0), 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-500 ${
      theme === 'bright' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* 1. Header Navigation with Trust & Deals Bar */}
      <Navbar
        lang={lang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLanguageChange={setLang}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
        customLogoUrl={customLogoUrl}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToSection('produkte-katalog');
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) scrollToSection('produkte-katalog');
        }}
        onScrollToConfigurator={() => scrollToSection('konfigurator')}
        onScrollToDtf={() => scrollToSection('dtf-transfers')}
        onScrollToClubOffers={() => scrollToSection('vereinsangebote')}
        onScrollToAbout={() => scrollToSection('ueber-uns')}
      />

      {/* 2. Top Brands & Partners Interactive Ticker */}
      <BrandTicker
        selectedBrand={selectedBrand}
        onSelectBrand={(b) => {
          setSelectedBrand(b);
          scrollToSection('produkte-katalog');
        }}
      />

      <main className="flex-1">
        {/* 3. Hero Section with Dynamic Deal or Ausrüster Showcase */}
        <HeroBanner
          lang={lang}
          theme={theme}
          dealProduct={dealProduct}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToSection('produkte-katalog');
          }}
          onScrollToConfigurator={() => scrollToSection('konfigurator')}
          onScrollToDtf={() => scrollToSection('dtf-transfers')}
        />

        {/* 4. Product Catalog with Filters, Surfaces & Deals */}
        <ProductGrid
          products={products}
          lang={lang}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          searchQuery={searchQuery}
          onQuickView={setSelectedProduct}
          onAddToCart={handleAddToCart}
          onScrollToConfigurator={() => scrollToSection('konfigurator')}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 5. DTF Logo & Textiltransfer Studio (Einzel-Logos & Gang Sheet Meterware) */}
        <div id="dtf-transfers">
          <DtfLogoTransferSection
            lang={lang}
            theme={theme}
            onAddDtfToCart={handleAddDtfToCart}
          />
        </div>

        {/* 6. Custom Club Kit & T-Shirt Configurator (German Clubs) */}
        <div id="konfigurator">
          <ClubKitConfigurator
            lang={lang}
            onAddKitToCart={handleAddCustomKitToCart}
          />
        </div>

        {/* 7. Club Offers & Sizing Sample Box Request */}
        <div id="vereinsangebote">
          <ClubOffersSection lang={lang} />
        </div>

        {/* 8. Secure Club Shop for Teams in Germany (Contact & Consultation) */}
        <div id="vereinsshop">
          <TeamShopContactSection lang={lang} theme={theme} />
        </div>

        {/* 9. About Sportwelt */}
        <div id="ueber-uns">
          <AboutSection lang={lang} theme={theme} />
        </div>
      </main>

      {/* 8. Footer */}
      <Footer lang={lang} theme={theme} onOpenLogoModal={() => setIsLogoModalOpen(true)} />

      {/* --- MODALS & DRAWERS --- */}
      
      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        lang={lang}
        onAddToCart={(prod, sz, qty, opt) => {
          handleAddToCart(prod, sz, qty, opt);
          setSelectedProduct(null);
        }}
      />

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onStartShopping={() => scrollToSection('produkte-katalog')}
        lang={lang}
      />

      {/* Checkout Modal with German Payment Methods (Kreditkarte SSL 256-Bit) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        cart={cart}
        total={cartTotal}
        onClearCart={handleCheckoutSuccess}
        onSuccess={handleCheckoutSuccess}
        lang={lang}
      />

      {/* Logo Customizer Modal */}
      <LogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        currentLogoUrl={customLogoUrl}
        onSaveLogo={handleSaveLogo}
        lang={lang}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p, sz) => handleAddToCart(p, sz, 1)}
        lang={lang}
      />

      {/* Direct Floating WhatsApp Contact Button (+4917657940581) */}
      <WhatsAppButton
        lang={lang}
        phoneNumber="+4917657940581"
        variant="floating"
      />
    </div>
  );
}
