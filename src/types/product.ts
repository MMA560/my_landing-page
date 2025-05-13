// src/types/product.ts

export type FrontendSizeOption = {
    value: string;
    label: string;
};

export type FrontendColorVariant = {
    value: string;
    label: string;
    image: string; // صورة مصغرة لخيار اللون نفسه
};

export type FrontendGalleryImage = {
    src: string;
    alt: string;
};

export type FrontendProductDetailSection = {
    title: string;
    items: string[]; // List[str]
};

export type FrontendProductHighlightItem = {
    title: string;
    description: string;
    iconName: string;
};

export type FrontendProductVideoData = {
    title: string;
    videoUrl: string;
    thumbnail: string;
    overlayText?: string;
    descriptionTitle?: string;
    description: string;
    features: string[];
};

export type FrontendFAQItem = {
    question: string;
    answer: string;
};

// Type for inventory, mapping color -> size -> quantity
export type FrontendProductInventory = Record<string, Record<string, number>>;

export interface ProductOut {
    id: number;
    name: string;
    description?: string;
    price: number;
    mainImage?: string; // قد لا يكون مستخدماً إذا كان galleryImages كافياً

    availableSizes: FrontendSizeOption[];
    availableColors: FrontendColorVariant[];
    galleryImages: Record<string, FrontendGalleryImage[]>; // Key is color value, value is list of images
    detailsSections: FrontendProductDetailSection[];
    highlights: FrontendProductHighlightItem[];
    videoInfo?: FrontendProductVideoData;
    faqs: FrontendFAQItem[];

    oldPrice?: number;
    discount?: number;
    tags?: { name: string; id: string }[];
    nameEn?: string;
    label?: string;

    // Inventory fields
    inventory: FrontendProductInventory;
    // إضافة حقل معرفات بنود المخزون لكل تركيبة لون ومقاس
    inventoryIds: Record<string, Record<string, number>>; // <-- تمت إضافة هذا السطر
}

// يمكنك إضافة تعريفات أنواع أخرى هنا إذا كانت ضرورية (مثل أنواع الطلبات، المراجعات، إلخ)
// export type Order = { ... };
// export type BackendReview = { ... };