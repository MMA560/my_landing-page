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

export interface ProductOut {
    id: number;
    name: string;
    description?: string;
    price: number;
    mainImage?: string;

    availableSizes: FrontendSizeOption[];
    availableColors: FrontendColorVariant[];
    galleryImages: Record<string, FrontendGalleryImage[]>; // Key is color value, value is list of images
    detailsSections: FrontendProductDetailSection[];
    highlights: FrontendProductHighlightItem[];
    videoInfo?: FrontendProductVideoData;
    faqs: FrontendFAQItem[]; // <-- الحقل الجديد

    oldPrice?: number;
    discount?: number;
    tags?: { name: string; id: string }[];
    nameEn?: string;
    label?: string;
}