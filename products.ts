import { Product, ProductColor, BrandName } from '../types';

export const STANDARD_COLORS: ProductColor[] = [
  { name: 'Blau', hex: '#2563EB' },
  { name: 'Rot', hex: '#DC2626' },
  { name: 'Schwarz', hex: '#18181B' },
  { name: 'Orange', hex: '#EA580C' },
  { name: 'Grün', hex: '#16A34A' },
  { name: 'Weiß', hex: '#FFFFFF' }
];

// All pre-populated sample articles have been deleted.
// New products will be dynamically loaded from Decap CMS / admin (/content/articles) or local storage.
export const INITIAL_PRODUCTS: Product[] = [];

/**
 * Dynamically loads articles created via Decap CMS (content/articles/*.md or *.json)
 * and optional local storage articles.
 */
export function loadCmsArticles(): Product[] {
  const products: Product[] = [];

  try {
    // Vite glob import of Decap CMS markdown & JSON article files
    const modules = import.meta.glob(['/content/articles/*.md', '/content/articles/*.json'], {
      eager: true,
      query: '?raw'
    }) as Record<string, string>;

    for (const [path, rawContent] of Object.entries(modules)) {
      if (!rawContent || typeof rawContent !== 'string') continue;
      const slug = path.split('/').pop()?.replace(/\.(md|json)$/, '') || `article-${Date.now()}`;

      let title = slug;
      let price = 0;
      let originalPrice: number | undefined = undefined;
      let image = '';
      let description = '';
      let category = 'shirts';
      let subcategory = 'Artikel';
      let brand: BrandName | undefined = undefined;
      let sizes = ['S', 'M', 'L', 'XL', 'XXL'];
      let inStock = true;
      let badge: string | undefined = undefined;
      let isFeatured = false;
      let isDealOfDay = false;

      if (path.endsWith('.json')) {
        try {
          const json = JSON.parse(rawContent);
          title = json.title || title;
          price = Number(json.price) || 0;
          originalPrice = json.originalPrice ? Number(json.originalPrice) : undefined;
          image = json.image || '';
          description = json.description || json.body || '';
          category = json.category || 'shirts';
          subcategory = json.subcategory || 'Artikel';
          brand = json.brand;
          if (Array.isArray(json.sizes)) sizes = json.sizes;
          if (json.inStock !== undefined) inStock = Boolean(json.inStock);
          badge = json.badge;
          isFeatured = Boolean(json.isFeatured);
          isDealOfDay = Boolean(json.isDealOfDay);
        } catch (e) {
          console.error('Failed to parse CMS JSON article', path, e);
        }
      } else {
        // Markdown with YAML Frontmatter
        const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
        let body = rawContent;
        if (match) {
          const yamlBlock = match[1];
          body = match[2]?.trim() || '';
          const lines = yamlBlock.split(/\r?\n/);
          for (const line of lines) {
            const idx = line.indexOf(':');
            if (idx > 0) {
              const k = line.slice(0, idx).trim();
              let v = line.slice(idx + 1).trim();
              if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
                v = v.slice(1, -1);
              }
              if (k === 'title') title = v;
              else if (k === 'price') price = Number(v) || 0;
              else if (k === 'originalPrice') originalPrice = Number(v) || undefined;
              else if (k === 'image') image = v;
              else if (k === 'description') description = v;
              else if (k === 'category') category = v;
              else if (k === 'subcategory') subcategory = v;
              else if (k === 'brand') brand = v as BrandName;
              else if (k === 'badge') badge = v;
              else if (k === 'isFeatured') isFeatured = v === 'true';
              else if (k === 'isDealOfDay') isDealOfDay = v === 'true';
            }
          }
        }
        if (!description) description = body;
      }

      products.push({
        id: slug,
        name: title,
        germanName: title,
        price,
        originalPrice,
        rating: 5.0,
        reviewsCount: 1,
        image: image || 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
        galleryImages: image ? [image] : [],
        description: description || 'Neuer Artikel aus dem Vereinsshop.',
        germanDescription: description || 'Neuer Artikel aus dem Vereinsshop.',
        category: (category as any) || 'shirts',
        subcategory,
        brand,
        badge,
        isFeatured,
        isDealOfDay,
        sizes,
        colors: STANDARD_COLORS,
        inStock,
        features: ['Offizieller Sportwelt Artikel', 'Schnelle Lieferung', 'Hochwertige Vereinsqualität'],
        germanFeatures: ['Offizieller Sportwelt Artikel', 'Schnelle Lieferung', 'Hochwertige Vereinsqualität']
      });
    }
  } catch (err) {
    console.warn('Error loading Decap CMS articles:', err);
  }

  // Also support custom articles stored in localStorage (if any)
  try {
    const local = localStorage.getItem('sportwelt_custom_articles');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed)) {
        products.push(...parsed);
      }
    }
  } catch {}

  return products;
}

export const TOP_BRANDS = [
  { name: 'Nike', slug: 'Nike', logoText: 'NIKE', color: '#000000' },
  { name: 'adidas', slug: 'adidas', logoText: 'ADIDAS', color: '#000000' },
  { name: 'Puma', slug: 'Puma', logoText: 'PUMA', color: '#000000' },
  { name: 'Jako', slug: 'Jako', logoText: 'JAKO', color: '#0047BA' },
  { name: 'Erima', slug: 'Erima', logoText: 'ERIMA', color: '#E30613' },
  { name: 'Craft', slug: 'Craft', logoText: 'CRAFT', color: '#000000' },
  { name: 'Joma', slug: 'Joma', logoText: 'JOMA', color: '#004B9B' },
  { name: 'Derbystar', slug: 'Derbystar', logoText: 'DERBYSTAR', color: '#000000' },
  { name: 'Uhlsport', slug: 'Uhlsport', logoText: 'UHLSPORT', color: '#000000' },
  { name: 'Sportwelt', slug: 'Sportwelt', logoText: 'SPORTWELT PRO', color: '#059669' }
];

export const CLUB_PRESET_CRESTS = [
  { id: 'crest-eagle', name: 'SV Adler (Klassisch)', icon: '🦅', color: '#1E3A8A' },
  { id: 'crest-lion', name: 'FC Löwen (Mut & Kraft)', icon: '🦁', color: '#DC2626' },
  { id: 'crest-shield-gold', name: 'DJK Borussia Schild', icon: '🛡️', color: '#CA8A04' },
  { id: 'crest-star', name: 'Stern 1920 e.V.', icon: '⭐', color: '#16A34A' },
  { id: 'crest-ball', name: 'Kickers United', icon: '⚽', color: '#0F172A' },
  { id: 'crest-crown', name: 'VfB Viktoria', icon: '👑', color: '#7C3AED' }
];

export const SAMPLE_CLUB_LOGOS = [
  {
    id: 'logo-sportwelt-default',
    name: 'Sportwelt Offiziell (Standard)',
    preview: '⚡ SPORTWELT',
    subtitle: 'Fußball & Teamsport Deutschland'
  }
];
