// src/data/productData.ts
// هذا الملف يحتوي على البيانات الثابتة للمنتجات الأولية.

import { FrontendProductInventory, ProductOut } from "@/types/product";

// تعريف نوع داخلي لبيانات عنصر المخزون كما يأتي من الواجهة الخلفية
type InventoryItemFromBackend = {
    product_id: number;
    color: string;
    size: string;
    quantity: number;
    product_inventory_id: number;
};

// دالة مساعدة لتحويل بيانات المخزون من الـ API إلى الشكل المطلوب للواجهة الأمامية
// هذه الدالة تستخدم داخل المكون الرئيسي عند جلب بيانات المخزون
export const transformInventoryData = (
    data: InventoryItemFromBackend[]
): { inventory: FrontendProductInventory; inventoryIds: Record<string, Record<string, number>> } => {
    const inventory: FrontendProductInventory = {};
    const inventoryIds: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
        if (!inventory[item.color]) {
            inventory[item.color] = {};
            inventoryIds[item.color] = {};
        }
        inventory[item.color][item.size] = item.quantity;
        inventoryIds[item.color][item.size] = item.product_inventory_id;
    });
    return { inventory, inventoryIds };
};


// تعريف البيانات الثابتة الأولية لجميع المنتجات
// يتم تضمين حقول المخزون هنا بقيم أولية (فارغة)، وسيتم تحديثها لاحقاً بشكل غير متزامن في المكون
export const PRODUCTS_DATA: ProductOut[] = [
    // المنتج الأول: كوتشي NIKE SV5 (ID: 1)
    {
        id: 1,
        name: "كوتشي NIKE SV5",
        nameEn: "NIKE SV5",
        label: "كفاءة وأناقة",
        description: "كوتشي نايك مصمم لراحتك في كل خطوة، مثالي للمهام اليومية والخروجات، يجمع بين الشكل العصري والأداء العملي بخامات عالية الجودة.",
        price: 490.00,
        oldPrice: 550.00,
        discount: 15, // يمكن حساب الخصم تلقائيًا في المكون أو تحديده هنا
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
                { src: "https://i.imgur.com/gkXVquK.png", alt: "شوز أسود - واجهة" },
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
        // القيم الأولية للمخزون والمعرفات، سيتم تحديثها لاحقاً بشكل غير متزامن
        inventory: {},
        inventoryIds: {},
    },
    // المنتج الثاني: كوتشي New Balance SV32 (ID: 2)
    {
        id: 2,
        name: "كوتشي New Balance SV32",
        nameEn: "New Balance SV32",
        label: "تصميمات راقية وعصرية", // label جديد مناسب
        description: "كوتشي New Balance SV32 – راحة وأناقة بخامات مستوردة ونعل طبي مرن، متوفر بمقاسات 41–45 و3 ألوان عصرية.", // الوصف التسويقي الجديد
        price: 500.00, // سعر مقترح
        oldPrice: 600.00, // سعر قديم مقترح للخصم
        discount: 10, // يمكن حسابه تلقائيًا
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
            { value: "black", label: "أسود", image: "https://i.imgur.com/Yeo9wbf.png" },
            { value: "beige", label: "بيج", image: "https://i.imgur.com/S2hliod.png" },
            { value: "gray", label: "رمادي", image: "https://i.imgur.com/fB2KRWB.png" }, // نستخدم هذه الصورة للون الرمادي كما يبدو فيها
        ],
        galleryImages: {
            "black": [
                { src: "https://i.imgur.com/8Y8UZXW.png", alt: "شوز - زاوية علوية عامة" }, // صورة عامة يمكن استخدامها
                { src: "https://i.imgur.com/Yeo9wbf.png", alt: "شوز أسود - جانب" },
                { src: "https://i.imgur.com/S2hliod.png", alt: "شوز بيج - جانب" },
                { src: "https://i.imgur.com/fB2KRWB.png", alt: "شوز رمادي - جانب" },
            ],
            "beige": [
                { src: "https://i.imgur.com/S2hliod.png", alt: "شوز بيج - جانب" },
                { src: "https://i.imgur.com/8Y8UZXW.png", alt: "شوز - زاوية علوية عامة" },
                { src: "https://i.imgur.com/Yeo9wbf.png", alt: "شوز أسود - جانب" },
                { src: "https://i.imgur.com/fB2KRWB.png", alt: "شوز رمادي - جانب" },
            ],
            "gray": [
                { src: "https://i.imgur.com/fB2KRWB.png", alt: "شوز رمادي - جانب" },
                { src: "https://i.imgur.com/8Y8UZXW.png", alt: "شوز - زاوية علوية عامة" },
                { src: "https://i.imgur.com/Yeo9wbf.png", alt: "شوز أسود - جانب" },
                { src: "https://i.imgur.com/S2hliod.png", alt: "شوز بيج - جانب" },
            ],
        },
        detailsSections: [
            {
                title: "الخامات والتصنيع",
                items: [
                    "سطح خارجي بخامات فوندي مستوردة عالية الجودة",
                    "نعل خارجي P.V.C بيور طري ومرن لامتصاص الصدمات",
                    "فرش داخلي طبي يوفر دعمًا مثاليًا للقدم",
                    "تلبيس مضبوط يضمن الثبات والراحة",
                ],
            },
            {
                title: "الميزات والفوائد",
                items: [
                    "مناسب لجميع المهام اليومية والخروجات",
                    "تصميم عصري وأنيق يناسب مختلف الإطلالات",
                    "خفيف الوزن ومريح للارتداء لفترات طويلة",
                    "متوفر بـ3 ألوان عصرية: أسود، بيج، رمادي، وبالمقاسات من 41 لـ45",
                ],
            },
        ],
        highlights: [
            {
                title: "خامات فوندي مستوردة",
                description: "مصنوع من خامات فوندي مستوردة تضمن جودة ومتانة استثنائية مع مظهر عصري.",
                iconName: "leather", // يمكن استخدام نفس الأيقونات أو إضافة أيقونات جديدة
            },
            {
                title: "نعل P.V.C مرن",
                description: "نعل بيور مرن يمتص الصدمات ويوفر راحة فائقة مع كل خطوة.",
                iconName: "handmade",
            },
            {
                title: "فرش طبي داعم",
                description: "فرش طبي مصمم لراحة القدم والدعم المستمر، حتى في الأيام الطويلة.",
                iconName: "comfort",
            },
            {
                title: "تلبيس مثالي",
                description: "تلبيس مظبوط يضمن ثبات الكوتشي على القدم ويمنحك انسيابية في الحركة.",
                iconName: "eco",
            },
        ],
        videoInfo: {
            title: "فيديو المنتج - New Balance SV32",
            videoUrl: "https://i.imgur.com/DHsgVM2.mp4", // نفس الفيديو أو فيديو جديد للمنتج
            thumbnail: "https://i.imgur.com/8Y8UZXW.png", // نفس الصورة المصغرة أو صورة جديدة
            overlayText: "اكتشف أناقة وراحة New Balance SV32",
            descriptionTitle: "تصميم وجودة New Balance SV32",
            description: 'في هذا الفيديو، نتعرف عن قرب على كوتشي **New Balance SV32** الرجالي. شاهد التفاصيل الدقيقة للخامات الفوندي المستوردة، والمرونة الفائقة لنعل الـP.V.C البيور، والفرش الطبي المريح. اكتشف كيف يجمع هذا الكوتشي بين الأداء العملي والمظهر العصري، مما يجعله الخيار الأمثل لإطلالتك اليومية. متوفر بمقاسات من 41 إلى 45، وبألوان جذابة: أسود، بيج، ورمادي.', // وصف فيديو جديد
            features: [
                "تصميم عصري وعملي",
                "خامات فوندي مستوردة",
                "راحة فائقة طوال اليوم",
            ],
        },
        faqs: [
            {
                question: "ما هي خامات كوتشي New Balance SV32؟",
                answer: "الكوتشي مصنوع من خامات فوندي مستوردة عالية الجودة للسطح الخارجي، ونعل P.V.C بيور مرن، وفرش داخلي طبي مريح.",
            },
            {
                question: "هل التلبيس مظبوط؟",
                answer: "نعم، الكوتشي يأتي بتلبيس مظبوط يناسب المقاس القياسي. المقاسات المتوفرة من 41 إلى 45.",
            },
            {
                question: "كم عدد الألوان المتاحة؟",
                answer: "متوفر بـ 3 ألوان عصرية: أسود، بيج، ورمادي.",
            },
            {
                question: "هل الكوتشي مناسب للمشي لفترات طويلة؟",
                answer: "بالتأكيد، بفضل النعل المرن والفرش الطبي الداعم، الكوتشي يوفر راحة ممتازة ومناسب للارتداء والمشي لفترات طويلة.",
            }
        ],
        // القيم الأولية للمخزون والمعرفات، سيتم تحديثها لاحقاً بشكل غير متزامن
        inventory: {},
        inventoryIds: {},
    },
    {
        id: 3,
        name: "كوتشي Rebook SV30",
        nameEn: "Rebook SV30",
        label: "أناقة عملية لكل يوم", // لافتة جذابة
        description: "كوتشي Rebook SV30 – تصميم عملي أنيق بخامات فوندي مستوردة ونعل P.V.C بيور مرن، مناسب للمهام اليومية والخروجات، متوفر بمقاسات 41–45 وبـ3 ألوان شبابية.", // وصف تسويقي احترافي
        price: 500.00, // سعر مقترح
        oldPrice: 600.00, // سعر قبل الخصم
        discount: 10, // يمكن حسابه تلقائيًا بناءً على السعر والخصم
        tags: [
            { name: "رجالي", id: "men" },
            { name: "خامات مستوردة", id: "imported-material" },
            { name: "نعل P.V.C بيور", id: "pvc-sole" },
            { name: "فرش طبي", id: "medical-insole" },
        ],
        availableSizes: [
            { value: "41", label: "41" },
            { value: "42", label: "42" },
            { value: "43", label: "43" },
            { value: "44", label: "44" },
            { value: "45", label: "45" },
        ],
        availableColors: [
            { value: "black", label: "أسود", image: "https://i.imgur.com/eYoyoSE.png" },
            { value: "blue", label: "أزرق", image: "https://i.imgur.com/efgJzo3.png" },
            { value: "beige", label: "بيج", image: "https://i.imgur.com/RJI30QW.png" },
        ],
        galleryImages: {
            "black": [
                { src: "https://i.imgur.com/iSy0nNI.png", alt: "كوتشي - الصورة الرئيسية" },
                { src: "https://i.imgur.com/eYoyoSE.png", alt: "كوتشي أسود - جانب" },
                { src: "https://i.imgur.com/efgJzo3.png", alt: "كوتشي أزرق - جانب" },
                { src: "https://i.imgur.com/RJI30QW.png", alt: "كوتشي بيج - جانب" },
            ],
            "blue": [
                { src: "https://i.imgur.com/efgJzo3.png", alt: "كوتشي أزرق - جانب" },
                { src: "https://i.imgur.com/iSy0nNI.png", alt: "كوتشي - الصورة الرئيسية" },
                { src: "https://i.imgur.com/eYoyoSE.png", alt: "كوتشي أسود - جانب" },
                { src: "https://i.imgur.com/RJI30QW.png", alt: "كوتشي بيج - جانب" },
            ],
            "beige": [
                { src: "https://i.imgur.com/RJI30QW.png", alt: "كوتشي بيج - جانب" },
                { src: "https://i.imgur.com/iSy0nNI.png", alt: "كوتشي - الصورة الرئيسية" },
                { src: "https://i.imgur.com/eYoyoSE.png", alt: "كوتشي أسود - جانب" },
                { src: "https://i.imgur.com/efgJzo3.png", alt: "كوتشي أزرق - جانب" },
            ],
        },
        detailsSections: [
            {
                title: "الخامات والتصنيع",
                items: [
                    "سطح خارجي بخامات فوندي مستوردة عالية الجودة",
                    "نعل خارجي P.V.C بيور مرن يدعم الحركة ويخفف الضغط",
                    "فرش داخلي طبي مريح وداعم للقدم",
                    "تلبيس مضبوط يمنح الثبات والراحة أثناء الاستخدام",
                ],
            },
            {
                title: "الميزات والفوائد",
                items: [
                    "مناسب لجميع المهام اليومية والخروجات",
                    "تصميم عملي وأنيق يناسب مختلف الأذواق",
                    "وزن خفيف لراحة تدوم طوال اليوم",
                    "متوفر بـ3 ألوان عصرية: أسود، أزرق، بيج، وبالمقاسات من 41 لـ45",
                ],
            },
        ],
        highlights: [
            {
                title: "خامات فوندي مستوردة",
                description: "خامة علوية فاخرة من فوندي المستورد تعزز المتانة والمظهر الراقي.",
                iconName: "leather",
            },
            {
                title: "نعل P.V.C بيور مرن",
                description: "نعل مرن يوفر امتصاص ممتاز للصدمات وراحة أثناء الحركة.",
                iconName: "handmade",
            },
            {
                title: "فرش طبي مريح",
                description: "مصمم خصيصًا لدعم القدم وتقليل الإجهاد اليومي.",
                iconName: "comfort",
            },
            {
                title: "تلبيس مثالي",
                description: "تلبيس مضبوط يمنح الثبات في الحركة طوال اليوم.",
                iconName: "eco",
            },
        ],
        videoInfo: {
            title: "فيديو المنتج - Rebook SV30",
            videoUrl: "https://i.imgur.com/DHsgVM2.mp4",
            thumbnail: "https://i.imgur.com/iSy0nNI.png",
            overlayText: "شوف راحة وأناقة Rebook SV30",
            descriptionTitle: "تعرف على كوتشي Rebook SV30",
            description: "في هذا الفيديو، نعرض تفاصيل كوتشي **Rebook SV30** الرجالي – من الخامات المستوردة الفاخرة إلى النعل المرن والفرش الطبي. مثالي للمهام اليومية والخروجات بفضل التصميم العصري والتلبيس المظبوط. متوفر بمقاسات 41 إلى 45، وبألوان: أسود، أزرق، وبيج.",
            features: [
                "تصميم عملي ومريح",
                "خامات فوندي مستوردة",
                "راحة مثالية طوال اليوم",
            ],
        },
        faqs: [
            {
                question: "ما هي خامات كوتشي Rebook SV30؟",
                answer: "الخامة الأساسية هي فوندي مستوردة، مع نعل خارجي P.V.C بيور وفرش داخلي طبي مريح.",
            },
            {
                question: "هل التلبيس مضبوط؟",
                answer: "نعم، الكوتشي يأتي بتلبيس مظبوط يناسب المقاسات القياسية، من 41 حتى 45.",
            },
            {
                question: "ما الألوان المتوفرة؟",
                answer: "يتوفر الكوتشي بـ 3 ألوان: أسود، أزرق، وبيج.",
            },
            {
                question: "هل يناسب الاستخدام اليومي؟",
                answer: "بكل تأكيد، فهو مصمم ليكون مريحًا وعصريًا في آن واحد، مما يجعله مثاليًا للمهام اليومية والخروجات.",
            },
        ],
        inventory: {},
        inventoryIds: {},
    },
    {
    "id": 4,
    "name": "كوتشي نوفا حريمي SV23",
    "nameEn": "Nova Women SV23",
    "label": "راحة وأناقة كل يوم", 
    "description": "كوتشي نوفا حريمي SV23 – تصميم عصري ومريح بخامات فوندي مستوردة ونعل P.V.C بيور مرن، مناسب للمهام اليومية والخروجات، متوفر بمقاسات 37–41 وبـ3 ألوان أنيقة.", 
    "price": 450.00, 
    "oldPrice": 550.00, 
    "discount": 10, 
    "tags": [
        { "name": "حريمي", "id": "women" },
        { "name": "خامات مستوردة", "id": "imported-material" },
        { "name": "نعل P.V.C بيور", "id": "pvc-sole" },
        { "name": "فرش طبي", "id": "medical-insole" }
    ],
    "availableSizes": [
        { "value": "37", "label": "37" },
        { "value": "38", "label": "38" },
        { "value": "39", "label": "39" },
        { "value": "40", "label": "40" },
        { "value": "41", "label": "41" }
    ],
    "availableColors": [
        { "value": "white_kashmir", "label": "أبيض * كشمير", "image": "https://i.imgur.com/14796gi.png" },
        { "value": "white_black", "label": "أبيض * أسود", "image": "https://i.imgur.com/Lml7c7U.png" },
        { "value": "white_gray", "label": "أبيض * رمادي", "image": "https://i.imgur.com/6WHCAZB.png" }
    ],
    "galleryImages": {
        "white_kashmir": [
            { "src": "https://i.imgur.com/px4idyr.png", "alt": "كوتشي - الصورة الرئيسية" },
            { "src": "https://i.imgur.com/14796gi.png", "alt": "كوتشي كشمير - جانب" },
            { "src": "https://i.imgur.com/Lml7c7U.png", "alt": "كوتشي أسود - جانب" },
            { "src": "https://i.imgur.com/6WHCAZB.png", "alt": "كوتشي رمادي - جانب" }
        ],
        "white_black": [
            { "src": "https://i.imgur.com/Lml7c7U.png", "alt": "كوتشي أسود - جانب" },
            { "src": "https://i.imgur.com/px4idyr.png", "alt": "كوتشي - الصورة الرئيسية" },
            { "src": "https://i.imgur.com/14796gi.png", "alt": "كوتشي كشمير - جانب" },
            { "src": "https://i.imgur.com/6WHCAZB.png", "alt": "كوتشي رمادي - جانب" }
        ],
        "white_gray": [
            { "src": "https://i.imgur.com/6WHCAZB.png", "alt": "كوتشي رمادي - جانب" },
            { "src": "https://i.imgur.com/px4idyr.png", "alt": "كوتشي - الصورة الرئيسية" },
            { "src": "https://i.imgur.com/14796gi.png", "alt": "كوتشي كشمير - جانب" },
            { "src": "https://i.imgur.com/Lml7c7U.png", "alt": "كوتشي أسود - جانب" }
        ]
    },
    "detailsSections": [
        {
            "title": "الخامات والتصنيع",
            "items": [
                "سطح خارجي بخامات فوندي مستوردة عالية الجودة",
                "نعل خارجي P.V.C بيور مرن يدعم الحركة ويخفف الضغط",
                "فرش داخلي طبي مريح وداعم للقدم",
                "تلبيس مضبوط يمنح الثبات والراحة أثناء الاستخدام"
            ]
        },
        {
            "title": "الميزات والفوائد",
            "items": [
                "مناسب لجميع المهام اليومية والخروجات",
                "تصميم عصري وأنيق يناسب مختلف الأذواق",
                "وزن خفيف لراحة تدوم طوال اليوم",
                "متوفر بـ3 ألوان أنيقة: كشمير، أسود، و رمادي، وبالمقاسات من 37 لـ41"
            ]
        }
    ],
    "highlights": [
        {
            "title": "خامات فوندي مستوردة",
            "description": "خامة علوية فاخرة من فوندي المستورد تعزز المتانة والمظهر الراقي.",
            "iconName": "leather"
        },
        {
            "title": "نعل P.V.C بيور مرن",
            "description": "نعل مرن يوفر امتصاص ممتاز للصدمات وراحة أثناء الحركة.",
            "iconName": "handmade"
        },
        {
            "title": "فرش طبي مريح",
            "description": "مصمم خصيصًا لدعم القدم وتقليل الإجهاد اليومي.",
            "iconName": "comfort"
        },
        {
            "title": "تلبيس مثالي",
            "description": "تلبيس مضبوط يمنح الثبات في الحركة طوال اليوم.",
            "iconName": "eco"
        }
    ],
    "videoInfo": {
        "title": "فيديو المنتج - نوفا حريمي SV23",
        "videoUrl": "https://youtube.com/shorts/OAEHx24EP-c",
        "thumbnail": "https://i.imgur.com/8usIX5g.png",
        "overlayText": "شوف راحة وأناقة نوفا SV23",
        "descriptionTitle": "تعرف على كوتشي نوفا حريمي SV23",
        "description": "في هذا الفيديو، نعرض تفاصيل كوتشي **نوفا حريمي SV23** – من الخامات المستوردة الفاخرة إلى النعل المرن والفرش الطبي. مثالي للمهام اليومية والخروجات بفضل التصميم العصري والتلبيس المظبوط. متوفر بمقاسات 37 إلى 41، وبألوان: كشمير، أسود، و رمادي.",
        "features": [
            "تصميم عصري ومريح",
            "خامات فوندي مستوردة",
            "راحة مثالية طوال اليوم"
        ]
    },
    "faqs": [
        {
            "question": "ما هي خامات كوتشي نوفا حريمي SV23؟",
            "answer": "الخامة الأساسية هي فوندي مستوردة، مع نعل خارجي P.V.C بيور وفرش داخلي طبي مريح."
        },
        {
            "question": "هل التلبيس مضبوط؟",
            "answer": "نعم، الكوتشي يأتي بتلبيس مظبوط يناسب المقاسات القياسية، من 37 حتى 41."
        },
        {
            "question": "ما الألوان المتوفرة؟",
            "answer": "يتوفر الكوتشي بـ 3 ألوان: كشمير، أسود، و رمادي."
        },
        {
            "question": "هل يناسب الاستخدام اليومي؟",
            "answer": "بكل تأكيد، فهو مصمم ليكون مريحًا وعصريًا في آن واحد، مما يجعله مثاليًا للمهام اليومية والخروجات."
        }
    ],
    "inventory": {},
    "inventoryIds": {}
}
,
    
];