// Configuration and helper functions for Telegram Concierge Manager

export const TELEGRAM_MANAGER_USERNAME = 'lavera_manager'; // Telegram username without @
export const TELEGRAM_FALLBACK_LINK = `https://t.me/${TELEGRAM_MANAGER_USERNAME}`;

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  imageUrl?: string;
}

export interface OrderDetails {
  items?: OrderItem[];
  productName?: string;
  productPrice?: number;
  budget?: string;
  occasion?: string;
  customGiftDetails?: {
    flower?: string;
    sweet?: string;
    addition?: string;
    boxColor?: string;
    totalPrice?: number;
  };
  cardMessage?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  isAnonymous?: boolean;
  notes?: string;
}

/**
 * Generates an elegant, natural, human message for Telegram concierge
 */
export function formatTelegramOrderMessage(details: OrderDetails): string {
  const parts: string[] = [];

  // 1. Greeting header based on context
  if (details.customGiftDetails) {
    parts.push('Здравствуйте! Собрал набор на сайте:');
    const gift = details.customGiftDetails;
    if (gift.flower) parts.push(`• Цветы: ${gift.flower}`);
    if (gift.sweet) parts.push(`• Сладости: ${gift.sweet}`);
    if (gift.addition) parts.push(`• Дополнение: ${gift.addition}`);
    if (gift.boxColor) parts.push(`• Бокс: ${gift.boxColor}`);
    if (gift.totalPrice) parts.push(`\nСумма: ${gift.totalPrice.toLocaleString('ru-RU')} ₽`);
  } else if (details.items && details.items.length > 1) {
    parts.push('Здравствуйте! Хочу оформить заказ:');
    details.items.forEach((item) => {
      parts.push(`• ${item.name} (${item.quantity} шт.) — ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽`);
    });
    const total = details.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    parts.push(`\nИтого: ${total.toLocaleString('ru-RU')} ₽`);
  } else if (details.productName) {
    parts.push('Здравствуйте! Хочу заказать:');
    const priceStr = details.productPrice ? ` — ${details.productPrice.toLocaleString('ru-RU')} ₽` : '';
    parts.push(`• ${details.productName}${priceStr}`);
  } else if (details.budget || details.occasion) {
    parts.push('Здравствуйте! Помогите, пожалуйста, подобрать подарок:');
    if (details.occasion) parts.push(`• Повод: ${details.occasion}`);
    if (details.budget) parts.push(`• Бюджет: ${details.budget}`);
  } else {
    parts.push('Здравствуйте! Подскажите, пожалуйста, по заказу в LAVÉRA.');
  }

  // 2. Postcard (if filled)
  if (details.cardMessage && details.cardMessage.trim()) {
    parts.push(`\nТекст открытки: «${details.cardMessage.trim()}»`);
  }

  // 3. Delivery info (if specified)
  if (details.deliveryDate || details.deliveryAddress || details.isAnonymous) {
    parts.push('');
    if (details.deliveryDate) parts.push(`Доставка: ${details.deliveryDate}`);
    if (details.deliveryAddress) parts.push(`Адрес: ${details.deliveryAddress}`);
    if (details.isAnonymous) parts.push('(Анонимная доставка)');
  }

  // 4. Clean extra notes (if any)
  if (details.notes && details.notes.trim() && !details.notes.includes('Консультация')) {
    parts.push(`\nПожелания: ${details.notes.trim()}`);
  }

  return parts.join('\n');
}

/**
 * Creates a Telegram link that automatically opens a chat with the manager and fills in the message
 */
export function getTelegramOrderUrl(details: OrderDetails, username: string = TELEGRAM_MANAGER_USERNAME): string {
  const message = formatTelegramOrderMessage(details);
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens Telegram manager in a new tab with the prepared order text
 */
export function openTelegramOrder(details: OrderDetails, username: string = TELEGRAM_MANAGER_USERNAME): void {
  const url = getTelegramOrderUrl(details, username);
  window.open(url, '_blank', 'noopener,noreferrer');
}
