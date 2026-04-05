export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    sale_price?: number;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    inventory_status?: string;
    sku?: string;
    category?: ProductCategory;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review_text?: string;
    product?: Product;
  };
}

export type InventoryStatus = 'In Stock' | 'Out of Stock' | 'Low Stock' | 'Pre-order';