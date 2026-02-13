/**
 * Google Sheets Configuration
 *
 * This file contains all configuration for fetching product data from Google Sheets.
 * Update SHEET_ID with your actual Google Sheet ID.
 */

export const SHEET_ID = process.env.GOOGLE_SHEET_ID || 'YOUR_GOOGLE_SHEET_ID_HERE';

// Sheet tab names and ranges
export const SHEETS = {
  PRODUCTS: 'Products!A:J',
  IMAGES: 'Images!A:C',
  QUICK_SPECS: 'QuickSpecs!A:D',
  SPECS: 'Specs!A:D',
  FEATURES: 'Features!A:C',
  FULL_FEATURES: 'FullFeatures!A:E',
  APPLICATIONS: 'Applications!A:C',
  FULL_APPLICATIONS: 'FullApplications!A:E',
  DOWNLOADS: 'Downloads!A:D',
  RELATED_PRODUCTS: 'RelatedProducts!A:C',
  FULL_SPECS: 'FullSpecs!A:D',
};

// Column mappings for each sheet (0-indexed)
export const COLUMNS = {
  PRODUCTS: {
    slug: 0,
    name: 1,
    category: 2,
    eyebrow: 3,
    has3DModel: 4,
    shortDesc: 5,
    description: 6,
    badge1: 7,
    badge2: 8,
  },
  IMAGES: {
    productSlug: 0,
    imageURL: 1,
    order: 2,
  },
  QUICK_SPECS: {
    productSlug: 0,
    value: 1,
    label: 2,
    order: 3,
  },
  SPECS: {
    productSlug: 0,
    label: 1,
    value: 2,
    order: 3,
  },
  FEATURES: {
    productSlug: 0,
    text: 1,
    order: 2,
  },
  FULL_FEATURES: {
    productSlug: 0,
    icon: 1,
    title: 2,
    desc: 3,
    order: 4,
  },
  APPLICATIONS: {
    productSlug: 0,
    name: 1,
    order: 2,
  },
  FULL_APPLICATIONS: {
    productSlug: 0,
    icon: 1,
    name: 2,
    desc: 3,
    order: 4,
  },
  DOWNLOADS: {
    productSlug: 0,
    name: 1,
    size: 2,
    order: 3,
  },
  RELATED_PRODUCTS: {
    productSlug: 0,
    relatedSlug: 1,
    order: 2,
  },
  FULL_SPECS: {
    productSlug: 0,
    label: 1,
    value: 2,
    order: 3,
  },
};

// Icon name mapping (from Google Sheets string to lucide-react component name)
export const ICON_MAP = {
  Battery: 'Battery',
  Shield: 'Shield',
  Gauge: 'Gauge',
  Settings: 'Settings',
  Leaf: 'Leaf',
  Wrench: 'Wrench',
  Warehouse: 'Warehouse',
  Factory: 'Factory',
  Package: 'Package',
  Truck: 'Truck',
  Star: 'Star',
  Box: 'Box',
  Zap: 'Zap',
  Clock: 'Clock',
  Cpu: 'Cpu',
  ThermometerSnowflake: 'ThermometerSnowflake',
  Weight: 'Weight',
  Cog: 'Cog',
};

// List of all available icons (for validation)
export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

// Category display order
export const CATEGORY_ORDER = ['Electric Forklifts'];
