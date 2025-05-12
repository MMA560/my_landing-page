// src/data/mockProduct.ts
import { ProductOut } from "@/types/product";

export const MOCK_PRODUCT_DATA: ProductOut = {
    id: 1,
    name: "كوتشي NIKE SV5",
    nameEn: "NIKE SV5",
    label: "كفاءة وأناقة",
    description: "كوتشي نايك مصمم لراحتك في كل خطوة، مثالي للمهام اليومية والخروجات، يجمع بين الشكل العصري والأداء العملي بخامات عالية الجودة.",
    price: 490.00,
    oldPrice: 550.00,
    discount: 15,
    tags: [
        { name: "رجالي", id: "men" },
        { name: "مناسب للمهام اليومية", id: "daily" },
        { name: "نعل P.V.C بيور", id: "pvc-sole" },
        { name: "فرش طبي", id: "medical-insole" },
        { name: "تلبيس مظبوط", id: "perfect-fit" },
    ],
    availableSizes: [
        { value: "41", label: "41" },
        { value: "42", label: "42" },
        { value: "43", label: "43" },
        { value: "44", label: "44" },
        { value: "45", label: "45" },
    ],
    availableColors: [
        { value: "black", label: "أسود", image: "https://i.imgur.com/0isafsF.png" },
        { value: "black-tan-beige", label: "أسود مطعم بيج", image: "https://i.imgur.com/qsHKkR3.png" },
        { value: "blue-tan-beige", label: "أزرق مطعم بيج", image: "https://i.imgur.com/WbdKmPn.png" },
    ],
    galleryImages: {
        "black": [
            { src: "https://i.imgur.com/gkXVquK.png", alt: "شوز أسود - واجهة" },
            { src: "https://i.imgur.com/0isafsF.png", alt: "شوز أسود - جانب" },
            { src: "https://i.imgur.com/qsHKkR3.png", alt: "شوز أسود مطعم بيج - جانب" },
            { src: "https://i.imgur.com/WbdKmPn.png", alt: "شوز أزرق مطعم بيج - جانب" },

        ],
        "black-tan-beige": [
            { src: "https://i.imgur.com/qsHKkR3.png", alt: "شوز أسود مطعم بيج - جانب" },
            { src: "https://i.imgur.com/gkXVquK.png", alt: "شوز أسود - واجهة" },
            { src: "https://i.imgur.com/WbdKmPn.png", alt: "شوز أزرق مطعم بيج - جانب" },
        ],
        "blue-tan-beige": [
            { src: "https://i.imgur.com/WbdKmPn.png", alt: "شوز أزرق مطعم بيج - جانب" },
            { src: "https://i.imgur.com/gkXVquK.png", alt: "شوز أسود - واجهة" }, // يمكن تكرار صور أخرى أو إضافة صور خاصة بهذا اللون
            { src: "https://i.imgur.com/qsHKkR3.png", alt: "شوز أسود مطعم بيج - جانب" },
        ]
    },
    detailsSections: [
        {
            title: "الخامات والتصنيع",
            items: [
                "سطح خارجي بخامات مستوردة قوية وسهلة التنظيف",
                "نعل خارجي P.V.C بيور يوفر مرونة وثبات عالي",
                "فرش داخلي طبي مريح بيدعم القدم طوال اليوم",
                "تلبيس مضبوط بيضمن ثبات الكوتشي على القدم بدون زحلقة",
            ],
        },
        {
            title: "الميزات والفوائد",
            items: [
                "مناسب للخروجات، الشغل، والمشاوير اليومية",
                "خفيف الوزن وسهل في اللبس والخلع",
                "تصميم أنيق وعملي بلون موحد أو مطعّم بيج",
                "متوفر بـ3 ألوان: أسود – أسود×بيج – أزرق×بيج، وبالمقاسات من 41 لـ45",
            ],
        },
    ],
    highlights: [
        {
            title: "خامات مستوردة فاخرة",
            description: "كوتشي Nike SV5 مصنوع من خامات عالية الجودة مستوردة بعناية لضمان المتانة والشكل الأنيق في كل استخدام.",
            iconName: "leather",
        },
        {
            title: "راحة تدوم طوال اليوم",
            description: "فرش طبي داخلي يوفر دعم مثالي لقدميك، لتتحرك براحة تامة مهما طال يومك.",
            iconName: "comfort",
        },
        {
            title: "نعل P.V.C بيور",
            description: "نعل قوي ومرن مقاوم للاهتراء يمنحك ثبات وثقة على أي سطح.",
            iconName: "handmade",
        },
        {
            title: "تصميم عملي وخفيف",
            description: "كوتشي مثالي للمشاوير اليومية والخروجات، بتلبيسة مظبوطة تضمن الثبات والانسيابية في الحركة.",
            iconName: "eco",
        },
    ],
    videoInfo: {
        title: "فيديو المنتج",
        videoUrl: "https://i.imgur.com/DHsgVM2.mp4",
        thumbnail: "https://i.imgur.com/gkXVquK.png",
        overlayText: "شاهد نظرة عامة على المنتج",
        descriptionTitle: "الدقة في التصنيع",
        description: 'انطلق بثقة وأناقة مع كوتشي **NIKE SV5** – الخيار الأمثل لكل المهام اليومية والخروجات. في هذا الفيديو، نأخذك في جولة سريعة لاكتشاف روعة التصميم، جودة الخامات المستوردة، والنعل الـP.V.C البيور الذي يضمن راحة القدم مع كل خطوة. شاهِد كيف يجمع هذا الحذاء بين الفخامة والعملية، بفرش طبي وتلبيس مظبوط يناسب مختلف الأذواق. متوفر بمقاسات من 41 إلى 45 وبألوان جذابة: أسود، أسود مطعّم بيج، وأزرق مطعّم بيج.',
        features: [
            "اطلالة انيقة تخطف الانظار",
            "خامات عالية الجودة",
            "معايير تصميم عالية",
        ],
    },
    faqs: [
        {
            question: "ما المقاسات المتوفرة؟",
            answer: "كوتشي Nike SV5 متوفر بالمقاسات من 41 حتى 45، بتلبيس مظبوط يريحك من أول مرة. لو كنت بين مقاسين، بننصح تختار المقاس الأكبر لضمان راحة أكبر.",
        },
        {
            question: "إزاي أطلب الكوتشي؟",
            answer: "بكل سهولة! اختار اللون والمقاس، وسجّل بياناتك في الفورم، وهنتواصل معاك لتأكيد الطلب والدفع عند الاستلام.",
        },
        {
            question: "إزاي أعتني بالكوتشي؟",
            answer: "نظّفه بقطعة قماش ناعمة كل فترة، ويفضل تبعده عن الحرارة العالية أو الشمس المباشرة. ولما تكون مش لابسه، حطه في مكان جاف مع دعامة للحفاظ على شكله.",
        },
        {
            question: "الشحن بيستغرق قد إيه وبتكلفة كام؟",
            answer: "مدة التوصيل بتكون من 2 إلى 4 أيام عمل حسب موقعك، وتكلفة الشحن بتُحسب عند تأكيد الطلب بناءً على المحافظة.",
        }
    ],
    // NEW: Inventory data
    inventory: {
        "black": {
            "41": 5,
            "42": 8,
            "43": 0, // Out of stock for black 43
            "44": 12,
            "45": 3,
        },
        "black-tan-beige": {
            "41": 10,
            "42": 6,
            "43": 7,
            "44": 0, // Out of stock for black-tan-beige 44
            "45": 4,
        },
        "blue-tan-beige": {
            "41": 15,
            "42": 10,
            "43": 9,
            "44": 11,
            "45": 5,
        },
    }
};