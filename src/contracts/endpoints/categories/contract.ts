import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import { PATHS } from '@/routes/paths';
import { PopularCategoriesResponseSchema } from './schemas';

/**
 * Mock imagery reuses the existing big-offer assets so the retail landing
 * renders before real category/product photography exists.
 */
const PRODUCT_IMAGES = [
  '/images/landing/big-offer/01.png',
  '/images/landing/big-offer/02.png',
  '/images/landing/big-offer/03.png',
  '/images/landing/big-offer/04.png',
  '/images/landing/big-offer/05.png',
];

const PRODUCT_TITLES: Record<string, string[]> = {
  food: [
    'برنج ایرانی طارم ۱۰ کیلویی',
    'روغن سرخ‌کردنی آفتابگردان',
    'ماکارونی فرمی ۵۰۰ گرمی',
    'رب گوجه‌فرنگی ۸۰۰ گرمی',
    'عدس پلویی ممتاز',
    'عسل طبیعی کوهستان',
    'روغن زیتون فرابکر',
    'ماست موسیر سنتی',
  ],
  protein: [
    'سینه مرغ تازه',
    'فیله گوشت گوسفندی',
    'میگو جنوب',
    'تخم‌مرغ بسته ۶ عددی',
    'ماهی قزل‌آلا',
    'سوسیس آلمانی',
    'کباب لقمه آماده',
    'ران بوقلمون',
  ],
  dairy: [
    'شیر پرچرب پاستوریزه',
    'ماست سون',
    'پنیر لیقوان',
    'کره حیوانی',
    'دوغ محلی',
    'خامه صبحانه',
    'ماست چکیده',
    'بستنی سنتی',
  ],
  snacks: [
    'چیپس سیب‌زمینی',
    'پفک نمکی',
    'بیسکویت مادر',
    'شکلات شیری',
    'آجیل مخلوط',
    'پاستیل میوه‌ای',
    'پاپ‌کورن کره‌ای',
    'تخمه ژاپنی',
  ],
  beverages: [
    'نوشابه کوکاکولا',
    'آبمیوه پرتقال',
    'ماءالشعیر لمون',
    'چای کیسه‌ای',
    'نسکافه ۳ در ۱',
    'آب معدنی نیم لیتری',
    'نوشیدنی انرژی‌زا',
    'شربت خاکشیر',
  ],
  detergents: [
    'پودر لباسشویی',
    'مایع ظرفشویی',
    'صابون شست‌وشو',
    'شامپو بدن',
    'جرم‌گیر دستشویی',
    'دستمال کاغذی',
    'اسپری خوشبوکننده',
    'مایع دستشویی',
  ],
  fruits: [
    'سیب قرمز دماوند',
    'پرتقال تامسون',
    'موز اکوادور',
    'خیار گلخانه‌ای',
    'گوجه‌فرنگی بوته‌ای',
    'سبزی خوردن تازه',
    'لیمو شیرین',
    'کیوی سبز',
  ],
  sweets: [
    'شیرینی نخودچی',
    'باقلوا',
    'زولبیا و بامیه',
    'کیک یزدی',
    'گز اصفهان',
    'سوهان عسلی',
    'پشمک',
    'نان برنجی',
  ],
};

/**
 * Subcategory groups (سرگروه) per category, each carrying its own leaf items —
 * the shared tree rendered by the desktop mega menu and the mobile sidebar.
 */
const SUBCATEGORY_GROUPS: Record<
  string,
  { id: string; title: string; items: { id: string; title: string }[] }[]
> = {
  food: [
    {
      id: 'food-staples',
      title: 'کالای اساسی',
      items: [
        { id: 'food-staples-1', title: 'نان حجیم' },
        { id: 'food-staples-2', title: 'ماکارونی فرمی' },
        { id: 'food-staples-3', title: 'شکر سفید' },
        { id: 'food-staples-4', title: 'برنج ایرانی طارم' },
      ],
    },
    {
      id: 'food-oils',
      title: 'روغن و چاشنی',
      items: [
        { id: 'food-oils-1', title: 'روغن زیتون فرابکر' },
        { id: 'food-oils-2', title: 'روغن کنجد' },
        { id: 'food-oils-3', title: 'سرکه سیب' },
        { id: 'food-oils-4', title: 'آب‌لیموی طبیعی' },
      ],
    },
    {
      id: 'food-pasta',
      title: 'پاستا و نودل',
      items: [
        { id: 'food-pasta-1', title: 'اسپاگتی شماره ۵' },
        { id: 'food-pasta-2', title: 'نودل حصیری' },
        { id: 'food-pasta-3', title: 'رشته آشی' },
        { id: 'food-pasta-4', title: 'لازانیا' },
      ],
    },
    {
      id: 'food-tea',
      title: 'چای و نوشیدنی گرم',
      items: [
        { id: 'food-tea-1', title: 'چای سیاه ممتاز' },
        { id: 'food-tea-2', title: 'چای کیسه‌ای' },
        { id: 'food-tea-3', title: 'نسکافه ۳ در ۱' },
        { id: 'food-tea-4', title: 'شکلات داغ فوری' },
      ],
    },
    {
      id: 'food-sauces',
      title: 'سس و رب',
      items: [
        { id: 'food-sauces-1', title: 'سس مایونز' },
        { id: 'food-sauces-2', title: 'سس سویا' },
        { id: 'food-sauces-3', title: 'خردل دیجون' },
        { id: 'food-sauces-4', title: 'رب گوجه‌فرنگی' },
      ],
    },
    {
      id: 'food-honey',
      title: 'عسل و ارده',
      items: [
        { id: 'food-honey-1', title: 'عسل کوهستان' },
        { id: 'food-honey-2', title: 'ارده کنجد خالص' },
        { id: 'food-honey-3', title: 'شیره انگور' },
        { id: 'food-honey-4', title: 'مربای آلبالو' },
      ],
    },
  ],
  protein: [
    {
      id: 'protein-red-meat',
      title: 'گوشت قرمز',
      items: [
        { id: 'protein-red-meat-1', title: 'گوشت گوساله راسته' },
        { id: 'protein-red-meat-2', title: 'راسته گوسفندی' },
        { id: 'protein-red-meat-3', title: 'گوشت چرخ‌کرده مخلوط' },
        { id: 'protein-red-meat-4', title: 'فیله گوسفندی' },
      ],
    },
    {
      id: 'protein-poultry',
      title: 'مرغ و ماکیان',
      items: [
        { id: 'protein-poultry-1', title: 'سینه مرغ بدون استخوان' },
        { id: 'protein-poultry-2', title: 'ران مرغ' },
        { id: 'protein-poultry-3', title: 'فیله بوقلمون' },
        { id: 'protein-poultry-4', title: 'مرغ کامل کشتار روز' },
      ],
    },
    {
      id: 'protein-seafood',
      title: 'آبزیان',
      items: [
        { id: 'protein-seafood-1', title: 'میگوی جنوب' },
        { id: 'protein-seafood-2', title: 'فیله قزل‌آلا' },
        { id: 'protein-seafood-3', title: 'ماهی هوکو' },
        { id: 'protein-seafood-4', title: 'میگو آب‌شیرین' },
      ],
    },
    {
      id: 'protein-eggs',
      title: 'تخم‌مرغ',
      items: [
        { id: 'protein-eggs-1', title: 'تخم‌مرغ مازاد' },
        { id: 'protein-eggs-2', title: 'تخم‌مرغ محلی' },
        { id: 'protein-eggs-3', title: 'تخم بلدرچین' },
        { id: 'protein-eggs-4', title: 'سفیده پاستوریزه' },
      ],
    },
    {
      id: 'protein-sausage',
      title: 'سوسیس و کالباس',
      items: [
        { id: 'protein-sausage-1', title: 'کالباس آلمانی' },
        { id: 'protein-sausage-2', title: 'سوسیس کوکتل' },
        { id: 'protein-sausage-3', title: 'فرانکفورتر' },
        { id: 'protein-sausage-4', title: 'ژامبون مرغ' },
      ],
    },
    {
      id: 'protein-ready',
      title: 'غذای آماده',
      items: [
        { id: 'protein-ready-1', title: 'کباب لقمه آماده' },
        { id: 'protein-ready-2', title: 'شامی خانگی' },
        { id: 'protein-ready-3', title: 'برگر دست‌ساز' },
        { id: 'protein-ready-4', title: 'ناگت مرغ' },
      ],
    },
  ],
  dairy: [
    {
      id: 'dairy-milk',
      title: 'شیر',
      items: [
        { id: 'dairy-milk-1', title: 'شیر پرچرب پاستوریزه' },
        { id: 'dairy-milk-2', title: 'شیر کم‌چرب' },
        { id: 'dairy-milk-3', title: 'شیر بی‌لاکتوز' },
        { id: 'dairy-milk-4', title: 'شیر کاکائو' },
      ],
    },
    {
      id: 'dairy-yogurt',
      title: 'ماست و دوغ',
      items: [
        { id: 'dairy-yogurt-1', title: 'ماست سون' },
        { id: 'dairy-yogurt-2', title: 'ماست چکیده' },
        { id: 'dairy-yogurt-3', title: 'دوغ محلی گازدار' },
        { id: 'dairy-yogurt-4', title: 'ماست موسیر' },
      ],
    },
    {
      id: 'dairy-cheese',
      title: 'پنیر',
      items: [
        { id: 'dairy-cheese-1', title: 'پنیر لیقوان' },
        { id: 'dairy-cheese-2', title: 'پنیر فتا' },
        { id: 'dairy-cheese-3', title: 'پنیر خامه‌ای' },
        { id: 'dairy-cheese-4', title: 'پنیر پیتزا رنده‌شده' },
      ],
    },
    {
      id: 'dairy-butter',
      title: 'کره و خامه',
      items: [
        { id: 'dairy-butter-1', title: 'کره حیوانی' },
        { id: 'dairy-butter-2', title: 'خامه صبحانه' },
        { id: 'dairy-butter-3', title: 'خامه قنادی' },
        { id: 'dairy-butter-4', title: 'کره گیاهی' },
      ],
    },
    {
      id: 'dairy-ice-cream',
      title: 'بستنی',
      items: [
        { id: 'dairy-ice-cream-1', title: 'بستنی سنتی زعفرانی' },
        { id: 'dairy-ice-cream-2', title: 'بستنی قیفی' },
        { id: 'dairy-ice-cream-3', title: 'بستنی موزی' },
      ],
    },
    {
      id: 'dairy-local',
      title: 'لبنیات سنتی',
      items: [
        { id: 'dairy-local-1', title: 'کشک محلی' },
        { id: 'dairy-local-2', title: 'ماست دبه' },
        { id: 'dairy-local-3', title: 'روغن حیوانی' },
      ],
    },
  ],
  snacks: [
    {
      id: 'snacks-chips',
      title: 'چیپس و پفک',
      items: [
        { id: 'snacks-chips-1', title: 'چیپس سیب‌زمینی نمکی' },
        { id: 'snacks-chips-2', title: 'چیپس مرغ و بادمجان' },
        { id: 'snacks-chips-3', title: 'پفک نمکی' },
        { id: 'snacks-chips-4', title: 'چیپس ذرت' },
      ],
    },
    {
      id: 'snacks-biscuit',
      title: 'بیسکویت و کیک',
      items: [
        { id: 'snacks-biscuit-1', title: 'بیسکویت مادر' },
        { id: 'snacks-biscuit-2', title: 'ویفر شکلاتی' },
        { id: 'snacks-biscuit-3', title: 'کیک کشمشی' },
        { id: 'snacks-biscuit-4', title: 'بیسکویت جو' },
      ],
    },
    {
      id: 'snacks-chocolate',
      title: 'شکلات',
      items: [
        { id: 'snacks-chocolate-1', title: 'شکلات شیری' },
        { id: 'snacks-chocolate-2', title: 'شکلات تلخ ۷۰٪' },
        { id: 'snacks-chocolate-3', title: 'شکلات مغزدار' },
      ],
    },
    {
      id: 'snacks-nuts',
      title: 'آجیل و خشکبار',
      items: [
        { id: 'snacks-nuts-1', title: 'آجیل مخلوط شور' },
        { id: 'snacks-nuts-2', title: 'پسته اکبری' },
        { id: 'snacks-nuts-3', title: 'بادام درختی' },
        { id: 'snacks-nuts-4', title: 'کشمش پلویی' },
      ],
    },
    {
      id: 'snacks-candy',
      title: 'آب‌نبات و پاستیل',
      items: [
        { id: 'snacks-candy-1', title: 'پاستیل میوه‌ای' },
        { id: 'snacks-candy-2', title: 'آبنبات نعنایی' },
        { id: 'snacks-candy-3', title: 'آب‌نبات چوبی' },
      ],
    },
    {
      id: 'snacks-popcorn',
      title: 'پاپ‌کورن',
      items: [
        { id: 'snacks-popcorn-1', title: 'پاپ‌کورن کره‌ای' },
        { id: 'snacks-popcorn-2', title: 'پاپ‌کورن پنیری' },
        { id: 'snacks-popcorn-3', title: 'پاپ‌کورن کارامل' },
      ],
    },
  ],
  beverages: [
    {
      id: 'beverages-soda',
      title: 'نوشابه',
      items: [
        { id: 'beverages-soda-1', title: 'نوشابه کوکاکولا' },
        { id: 'beverages-soda-2', title: 'نوشابه زمزم' },
        { id: 'beverages-soda-3', title: 'نوشابه لیمو' },
        { id: 'beverages-soda-4', title: 'نوشابه پرتقالی' },
      ],
    },
    {
      id: 'beverages-juice',
      title: 'آبمیوه',
      items: [
        { id: 'beverages-juice-1', title: 'آبمیوه پرتقال' },
        { id: 'beverages-juice-2', title: 'آبمیوه سیب' },
        { id: 'beverages-juice-3', title: 'آبمیوه انبه' },
        { id: 'beverages-juice-4', title: 'شربت آلبالو' },
      ],
    },
    {
      id: 'beverages-energy',
      title: 'نوشیدنی انرژی‌زا',
      items: [
        { id: 'beverages-energy-1', title: 'انرژی‌زا کلاسیک' },
        { id: 'beverages-energy-2', title: 'انرژی‌زا گازدار' },
        { id: 'beverages-energy-3', title: 'ماءالشعیر انرژی‌زا' },
      ],
    },
    {
      id: 'beverages-water',
      title: 'آب معدنی',
      items: [
        { id: 'beverages-water-1', title: 'آب معدنی نیم لیتری' },
        { id: 'beverages-water-2', title: 'آب معدنی ۱.۵ لیتری' },
        { id: 'beverages-water-3', title: 'آب معدنی گازدار' },
      ],
    },
    {
      id: 'beverages-tea',
      title: 'چای سرد',
      items: [
        { id: 'beverages-tea-1', title: 'چای سرد لیمو' },
        { id: 'beverages-tea-2', title: 'چای سرد هلوی' },
        { id: 'beverages-tea-3', title: 'چای سرد انبه' },
      ],
    },
    {
      id: 'beverages-herbal',
      title: 'عرقیجات',
      items: [
        { id: 'beverages-herbal-1', title: 'عرق نعنا' },
        { id: 'beverages-herbal-2', title: 'عرق کاسنی' },
        { id: 'beverages-herbal-3', title: 'عرق بیدمشک' },
        { id: 'beverages-herbal-4', title: 'شربت خاکشیر' },
      ],
    },
  ],
  detergents: [
    {
      id: 'detergents-laundry',
      title: 'شوینده لباس',
      items: [
        { id: 'detergents-laundry-1', title: 'پودر لباسشویی' },
        { id: 'detergents-laundry-2', title: 'مایع لباسشویی' },
        { id: 'detergents-laundry-3', title: 'نرم‌کننده لباس' },
      ],
    },
    {
      id: 'detergents-dish',
      title: 'مایع ظرفشویی',
      items: [
        { id: 'detergents-dish-1', title: 'مایع ظرفشویی لیمویی' },
        { id: 'detergents-dish-2', title: 'مایع ظرفشویی سیب' },
        { id: 'detergents-dish-3', title: 'قرص ماشین ظرفشویی' },
      ],
    },
    {
      id: 'detergents-cleaner',
      title: 'جرم‌گیر و سفیدکننده',
      items: [
        { id: 'detergents-cleaner-1', title: 'جرم‌گیر دستشویی' },
        { id: 'detergents-cleaner-2', title: 'سفیدکننده وایتکس' },
        { id: 'detergents-cleaner-3', title: 'اسپری سطوح' },
      ],
    },
    {
      id: 'detergents-personal',
      title: 'بهداشت شخصی',
      items: [
        { id: 'detergents-personal-1', title: 'شامپو بدن' },
        { id: 'detergents-personal-2', title: 'صابون شست‌وشو' },
        { id: 'detergents-personal-3', title: 'مایع دستشویی' },
        { id: 'detergents-personal-4', title: 'دهان‌وشویه' },
      ],
    },
    {
      id: 'detergents-paper',
      title: 'دستمال کاغذی',
      items: [
        { id: 'detergents-paper-1', title: 'دستمال کاغذی جیبی' },
        { id: 'detergents-paper-2', title: 'دستمال آشپزخانه' },
        { id: 'detergents-paper-3', title: 'دستمال توالت' },
        { id: 'detergents-paper-4', title: 'دستمال مرطوب' },
      ],
    },
    {
      id: 'detergents-air',
      title: 'خوشبوکننده هوا',
      items: [
        { id: 'detergents-air-1', title: 'اسپری خوشبوکننده' },
        { id: 'detergents-air-2', title: 'ژل معطر' },
        { id: 'detergents-air-3', title: 'بخور اتاق' },
      ],
    },
  ],
  fruits: [
    {
      id: 'fruits-apple',
      title: 'سیب',
      items: [
        { id: 'fruits-apple-1', title: 'سیب قرمز دماوند' },
        { id: 'fruits-apple-2', title: 'سیب سبز گلاب' },
        { id: 'fruits-apple-3', title: 'سیب ژاپنی' },
      ],
    },
    {
      id: 'fruits-citrus',
      title: 'مرکبات',
      items: [
        { id: 'fruits-citrus-1', title: 'پرتقال تامسون' },
        { id: 'fruits-citrus-2', title: 'نارنگی یافا' },
        { id: 'fruits-citrus-3', title: 'لیمو شیرین' },
        { id: 'fruits-citrus-4', title: 'گریپ‌فروت' },
      ],
    },
    {
      id: 'fruits-banana',
      title: 'موز',
      items: [
        { id: 'fruits-banana-1', title: 'موز اکوادور' },
        { id: 'fruits-banana-2', title: 'موز درجه یک' },
      ],
    },
    {
      id: 'fruits-vegetables',
      title: 'سبزیجات',
      items: [
        { id: 'fruits-vegetables-1', title: 'فلفل دلمه‌ای' },
        { id: 'fruits-vegetables-2', title: 'هویج' },
        { id: 'fruits-vegetables-3', title: 'بادمجان' },
        { id: 'fruits-vegetables-4', title: 'کدو سبز' },
      ],
    },
    {
      id: 'fruits-tomato',
      title: 'گوجه و خیار',
      items: [
        { id: 'fruits-tomato-1', title: 'گوجه‌فرنگی بوته‌ای' },
        { id: 'fruits-tomato-2', title: 'خیار گلخانه‌ای' },
        { id: 'fruits-tomato-3', title: 'گوجه گیلاسی' },
        { id: 'fruits-tomato-4', title: 'خیار سنتی' },
      ],
    },
    {
      id: 'fruits-leafy',
      title: 'سبزی خوردن',
      items: [
        { id: 'fruits-leafy-1', title: 'سبزی خوردن تازه' },
        { id: 'fruits-leafy-2', title: 'سبزی سوپ' },
        { id: 'fruits-leafy-3', title: 'نعنا و ترخون' },
      ],
    },
  ],
  sweets: [
    {
      id: 'sweets-traditional',
      title: 'سنتی',
      items: [
        { id: 'sweets-traditional-1', title: 'شیرینی نخودچی' },
        { id: 'sweets-traditional-2', title: 'باقلوا' },
        { id: 'sweets-traditional-3', title: 'زولبیا و بامیه' },
        { id: 'sweets-traditional-4', title: 'نان برنجی' },
      ],
    },
    {
      id: 'sweets-nogh',
      title: 'نبات و پولکی',
      items: [
        { id: 'sweets-nogh-1', title: 'نبات چوبی' },
        { id: 'sweets-nogh-2', title: 'نبات زعفرانی' },
        { id: 'sweets-nogh-3', title: 'پولکی آلبالو' },
      ],
    },
    {
      id: 'sweets-cake',
      title: 'کیک و کلوچه',
      items: [
        { id: 'sweets-cake-1', title: 'کیک یزدی' },
        { id: 'sweets-cake-2', title: 'کیک هویج' },
        { id: 'sweets-cake-3', title: 'کلوچه کشمشی' },
        { id: 'sweets-cake-4', title: 'رولت خامه‌ای' },
      ],
    },
    {
      id: 'sweets-gaz',
      title: 'گز و سوهان',
      items: [
        { id: 'sweets-gaz-1', title: 'گز اصفهان' },
        { id: 'sweets-gaz-2', title: 'سوهان عسلی' },
        { id: 'sweets-gaz-3', title: 'گز آردی' },
      ],
    },
    {
      id: 'sweets-pastry',
      title: 'شیرینی خشک',
      items: [
        { id: 'sweets-pastry-1', title: 'شیرینی پاپیونی' },
        { id: 'sweets-pastry-2', title: 'شیرینی نارگیلی' },
        { id: 'sweets-pastry-3', title: 'شیرینی زبان' },
      ],
    },
    {
      id: 'sweets-chocolate',
      title: 'شکلات و پاستیل',
      items: [
        { id: 'sweets-chocolate-1', title: 'شکلات کاکائویی' },
        { id: 'sweets-chocolate-2', title: 'تافی توفی' },
        { id: 'sweets-chocolate-3', title: 'راک شکلات' },
      ],
    },
  ],
};

const ICON_BY_CATEGORY: Record<string, string> = {
  food: 'BottleIcon',
  protein: 'FishIcon',
  dairy: 'CackeIcon',
  snacks: 'CheeseIcon',
  beverages: 'BottleIcon',
  detergents: 'LeafIcon',
  fruits: 'LeafIcon',
  sweets: 'CackeIcon',
};

/**
 * Popular-categories mock — the single source for the mock payload. Exported so
 * tests (e.g. the store header suite) read the same data the fetcher serves in
 * mock mode instead of keeping a mirrored copy.
 */
export const POPULAR_CATEGORIES_MOCK = [
  {
    slug: 'food',
    title: 'مواد غذایی',
    productCount: 128,
  },
  {
    slug: 'protein',
    title: 'پروتئینی',
    productCount: 64,
  },
  {
    slug: 'dairy',
    title: 'لبنیات',
    productCount: 45,
  },
  {
    slug: 'snacks',
    title: 'تنقلات',
    productCount: 87,
  },
  {
    slug: 'beverages',
    title: 'نوشیدنی‌ها',
    productCount: 52,
  },
  {
    slug: 'detergents',
    title: 'شویندگان',
    productCount: 73,
  },
  {
    slug: 'fruits',
    title: 'میوه و سبزیجات',
    productCount: 96,
  },
  {
    slug: 'sweets',
    title: 'شیرینی‌جات',
    productCount: 38,
  },
].map((category, categoryIndex) => ({
  id: category.slug,
  ...category,
  image: PRODUCT_IMAGES[categoryIndex % PRODUCT_IMAGES.length],
  imageAlt: `دسته‌بندی ${category.title}`,
  href: PATHS.RETAIL.CATEGORY(category.slug),
  icon: ICON_BY_CATEGORY[category.slug],
  subcategories: (SUBCATEGORY_GROUPS[category.slug] ?? []).map((group) => ({
    id: group.id,
    title: group.title,
    href: PATHS.RETAIL.CATEGORY(`${category.slug}/${group.id}`),
    items: group.items.map((item) => ({
      id: item.id,
      title: item.title,
      href: PATHS.RETAIL.CATEGORY(`${category.slug}/${group.id}/${item.id}`),
    })),
  })),
  products: (PRODUCT_TITLES[category.slug] ?? []).map((title, productIndex) => ({
    id: `${category.slug}-${productIndex + 1}`,
    title,
    image: PRODUCT_IMAGES[(categoryIndex + productIndex) % PRODUCT_IMAGES.length],
    imageAlt: title,
    href: PATHS.RETAIL.PRODUCT(`${category.slug}-${productIndex + 1}`),
  })),
}));

export const categoriesContracts = {
  categories: {
    getPopular: {
      method: 'GET',
      path: '/categories/popular',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(PopularCategoriesResponseSchema),
      mockData: mockDataWrapper(POPULAR_CATEGORIES_MOCK),
    },
  },
} as const satisfies Contracts;
