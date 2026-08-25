import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { openTelegramOrder } from '../utils/telegram';

export default function TelegramFloatingButton() {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => openTelegramOrder({ notes: 'Быстрый вопрос' })}
      className="fixed bottom-5 right-5 z-50 w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#2AABEE] text-white shadow-xl shadow-[#2AABEE]/40 flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[#2AABEE]/60 group"
      aria-label="Написать в Telegram"
      title="Написать в Telegram"
    >
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <Send className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300 ml-[-2px] mt-[1px]" />
    </motion.button>
  );
}
