export interface Product {
  id: string;
  name: string;
  category: 'gifts' | 'flowers' | 'boxes' | 'additions';
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  shortDesc: string;
  composition: string[];
  budgetTier: 'low' | 'medium' | 'high'; // 'До 5 000 ₽', '5–10 000 ₽', 'От 10 000 ₽'
  occasions: string[]; // 'День рождения', 'Просто так', 'Годовщина', 'Извиниться', etc.
  isPopular?: boolean;
  isNew?: boolean;
}

export const CATEGORIES = [
  { id: 'all', name: 'Все варианты' },
  { id: 'gifts', name: 'Подарки' },
  { id: 'flowers', name: 'Цветы' },
  { id: 'boxes', name: 'Боксы' },
  { id: 'additions', name: 'Дополнения' },
] as const;

export const PRODUCTS: Product[] = [
  // 1. БОКСЫ
  {
    id: 'box-velvet-romance',
    name: 'Премиум-бокс «Velvet Romance»',
    category: 'boxes',
    categoryLabel: 'Подарочный бокс',
    price: 8900,
    oldPrice: 10500,
    image: '/products/box-velvet-romance.jpg',
    shortDesc: 'Пионовидные розы Kahala, клубника в бельгийском шоколаде с золотом и свеча.',
    description: 'Идеальный флагманский сет. Сочетание свежих ароматных роз эквадорского сорта и нежнейшей клубники в ручном шоколадном декоре в фирменной бархатной коробке с золотым тиснением.',
    composition: [
      'Пионовидные розы сорта Kahala (7 шт.)',
      'Клубника в бельгийском шоколаде Callebaut (8 шт.) с сусальным золотом',
      'Бархатная круглая коробка винного оттенка с золотым логотипом',
      'Фирменная каллиграфическая открытка'
    ],
    budgetTier: 'medium',
    occasions: ['День рождения', 'Годовщина', 'Просто так'],
    isPopular: true
  },
  {
    id: 'box-royal-blush',
    name: 'Гранд-бокс «Royal Blush»',
    category: 'boxes',
    categoryLabel: 'Премиум бокс',
    price: 14500,
    image: '/products/box-royal-blush.jpg',
    shortDesc: 'Пудровые розы, эустома, французские макаруны и диффузор для дома.',
    description: 'Роскошный сет для выражения самых глубоких чувств. Изысканная пудровая подача, французские десерты и селективный аромат для дома.',
    composition: [
      'Французские макаруны ручной работы (12 шт.)',
      'Пышные кустовые розы и эустома в пудровых тонах',
      'Парфюмированный диффузор для дома LAVÉRA',
      'Шляпная коробка пудрового оттенка с золотым тиснением'
    ],
    budgetTier: 'high',
    occasions: ['День рождения', 'Годовщина', 'Извиниться'],
    isPopular: true
  },
  {
    id: 'box-sweet-delight',
    name: 'Мини-бокс «Sweet Delight»',
    category: 'boxes',
    categoryLabel: 'Подарочный бокс',
    price: 4600,
    image: '/products/box-sweet-delight.jpg',
    shortDesc: 'Свежая клубника в бельгийском шоколаде и нежная садовая роза.',
    description: 'Легкий и элегантный комплимент, когда хочется сделать приятный сюрприз без повода или поздравить близкого человека с самого утра.',
    composition: [
      'Клубника в бельгийском молочном и белом шоколаде (6 шт.)',
      'Свежая садовая роза пудрового оттенка',
      'Фирменная коробочка с золотым тиснением LAVÉRA',
      'Мини-открытка с вашим текстом'
    ],
    budgetTier: 'low',
    occasions: ['Просто так', 'День рождения'],
    isNew: true
  },

  // 2. ЦВЕТЫ
  {
    id: 'flowers-powder-cloud',
    name: 'Букет «Пудровое Облако»',
    category: 'flowers',
    categoryLabel: 'Цветы',
    price: 6800,
    oldPrice: 7900,
    image: '/products/flowers-powder-cloud.jpg',
    shortDesc: 'Пышный авторский букет из нежных гортензий, роз O\'Hara и эвкалипта.',
    description: 'Воздушный объемный букет в фирменной многослойной матовой упаковке. Нежная палитра и свежесрезанные стойкие цветы, которые будут радовать больше недели.',
    composition: [
      'Голубая и пудровая гортензия',
      'Розы сорта O\'Hara (7 шт.)',
      'Эвкалипт цинерея',
      'Матовая дизайнерская бумага с золотым кантом',
      'Шелковая винная лента и аквабокс'
    ],
    budgetTier: 'medium',
    occasions: ['День рождения', 'Годовщина', 'Просто так', 'Извиниться'],
    isPopular: true
  },
  {
    id: 'flowers-mon-amour-roses',
    name: 'Монобукет «Mon Amour» 25 пионовидных роз',
    category: 'flowers',
    categoryLabel: 'Цветы',
    price: 11900,
    image: '/products/flowers-mon-amour-roses.jpg',
    shortDesc: '25 отборных роз Red Piano с бархатными лепестками и глубоким ароматом.',
    description: 'Классика роскоши. Сортовые пионовидные розы с крупными бутонами раскрываются в пышные шары, источая благородный медово-фруктовый аромат.',
    composition: [
      '25 отборных пионовидных роз сорта Red Piano',
      'Французская шелковая лента винного цвета',
      'Многослойная кремовая упаковка с золотой отделкой',
      'Фирменная открытка с каллиграфией'
    ],
    budgetTier: 'high',
    occasions: ['Годовщина', 'Извиниться', 'День рождения'],
    isPopular: true
  },
  {
    id: 'flowers-spring-tender',
    name: 'Букет-комплимент «Gentle Touch»',
    category: 'flowers',
    categoryLabel: 'Цветы',
    price: 3900,
    image: '/products/flowers-spring-tender.jpg',
    shortDesc: 'Изящный букет из нежных французских роз и персиковых диантусов.',
    description: 'Идеальный выбор для утреннего сюрприза или спонтанного знака внимания. Лаконичный, утонченный и очень стойкий.',
    composition: [
      'Французские розы (5 шт.)',
      'Диантусы персиковые (4 шт.)',
      'Дизайнерская калька с золотым логотипом LAVÉRA',
      'Открытка с пожеланием'
    ],
    budgetTier: 'low',
    occasions: ['Просто так', 'День рождения'],
    isNew: true
  },

  // 3. ПОДАРКИ
  {
    id: 'gift-strawberry-deluxe',
    name: 'Сет «Strawberries & Champagne»',
    category: 'gifts',
    categoryLabel: 'Подарочный сет',
    price: 7400,
    image: '/products/gift-strawberry-deluxe.jpg',
    shortDesc: '16 ягод клубники в рубиновом и белом шоколаде с золотом 23 карата.',
    description: '16 крупных ягод свежайшей сочной клубники, покрытых бельгийским шоколадом Callebaut, декорированных сусальным золотом, фисташкой и сублимированной малиной.',
    composition: [
      '16 крупных ягод свежей клубники в премиальном шоколаде',
      'Декор из пищевого золота 23 карата и фисташки',
      'Подарочная коробка с шелковой лентой',
      'Открытка с авторским текстом'
    ],
    budgetTier: 'medium',
    occasions: ['День рождения', 'Годовщина', 'Просто так'],
    isPopular: true
  },
  {
    id: 'gift-spa-harmony',
    name: 'Подарочный набор «La Femme»',
    category: 'gifts',
    categoryLabel: 'Подарочный набор',
    price: 9200,
    image: '/products/gift-spa-harmony.jpg',
    shortDesc: 'Шелковая маска для сна Mulberry, миндальное крем-масло, свеча и лаванда.',
    description: 'Набор для абсолютного расслабления и заботы. Натуральный шелк Mulberry 100%, нежнейший уход и изысканный аромат французской лаванды.',
    composition: [
      'Маска для сна из 100% натурального шелка Mulberry',
      'Крем-масло для тела с ароматом ванили и миндаля (200 мл)',
      'Ароматическая свеча из соевого воска',
      'Букетик натуральной французской лаванды',
      'Фирменная коробка LAVÉRA с бархатным бантом'
    ],
    budgetTier: 'medium',
    occasions: ['День рождения', 'Просто так', 'Годовщина']
  },
  {
    id: 'gift-ultimate-luxury',
    name: 'Премиум-сет «Total Love VIP»',
    category: 'gifts',
    categoryLabel: 'Эксклюзив',
    price: 21000,
    image: '/products/gift-ultimate-luxury.jpg',
    shortDesc: 'Гранд-бокс из 51 пионовидной розы, сет клубники и селективный парфюм.',
    description: 'Подарок максимального уровня, который производит ошеломляющий эффект. Полная персонализация, закрытая VIP-доставка.',
    composition: [
      'Бархатная шляпная коробка с 51 отборной пионовидной розой',
      'Золотой сет клубники в бельгийском шоколаде',
      'Селективный нишевый парфюм LAVÉRA Florale',
      'Каллиграфическое письмо с сургучной печатью',
      'VIP-доставка'
    ],
    budgetTier: 'high',
    occasions: ['Годовщина', 'День рождения', 'Извиниться'],
    isPopular: true
  },

  // 4. ДОПОЛНЕНИЯ
  {
    id: 'add-calligraphy-card',
    name: 'Каллиграфическая открытка ручной работы',
    category: 'additions',
    categoryLabel: 'Дополнение',
    price: 0,
    image: '/products/add-calligraphy-card.jpg',
    shortDesc: 'Бесплатно к любому заказу! Напишем ваши слова от руки.',
    description: 'Мы бережно перенесем ваши сокровенные слова на фактурную бумагу ручного литья чернилами и каллиграфическим пером.',
    composition: ['Хлопковый дизайнерский конверт', 'Бумага ручного литья', 'Сургучная печать с логотипом L'],
    budgetTier: 'low',
    occasions: ['День рождения', 'Просто так', 'Годовщина', 'Извиниться']
  },
  {
    id: 'add-macarons-box',
    name: 'Набор французских макарун (6 шт.)',
    category: 'additions',
    categoryLabel: 'Дополнение',
    price: 1200,
    image: '/products/add-macarons-box.jpg',
    shortDesc: 'Хрустящая миндальная корочка и нежнейший ганаш: фисташка, маракуйя, лаванда.',
    description: 'Свежие французские десерты в фирменной коробочке с золотым логотипом LAVÉRA.',
    composition: ['6 свежих макарун разных вкусов', 'Элегантная коробочка с золотым тиснением и лентой'],
    budgetTier: 'low',
    occasions: ['День рождения', 'Просто так', 'Годовщина']
  },
  {
    id: 'add-scented-candle',
    name: 'Ароматическая свеча «Fig & Warm Sandalwood»',
    category: 'additions',
    categoryLabel: 'Дополнение',
    price: 2400,
    image: '/products/gift-spa-harmony.jpg',
    shortDesc: '100% соевый воск, деревянный фитиль с уютным потрескиванием.',
    description: 'Утонченный шлейфовый аромат инжира, теплого сандала и белого кедра наполняет комнату уютом.',
    composition: ['Соевый воск', 'Деревянный фитиль', 'Стеклянный матовый стакан', 'Время горения ~45 часов'],
    budgetTier: 'low',
    occasions: ['День рождения', 'Просто так', 'Годовщина']
  }
];

export const HERO_CURATED_OPTIONS: Record<string, Product[]> = {
  'low': PRODUCTS.filter(p => p.budgetTier === 'low').slice(0, 3),
  'medium': PRODUCTS.filter(p => p.budgetTier === 'medium').slice(0, 3),
  'high': PRODUCTS.filter(p => p.budgetTier === 'high').slice(0, 3),
};
