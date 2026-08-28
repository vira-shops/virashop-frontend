import { WhatsappIcon, TelegramIcon, InstagramIcon } from '@icons';
import { PATHS } from '@/routes/paths';

export const trustBadges = [
  { src: '/images/landing/footer/footer-1.svg', alt: 'نشان اعتماد ۱' },
  { src: '/images/landing/footer/footer-2.svg', alt: 'نشان اعتماد ۲' },
  { src: '/images/landing/footer/footer-3.svg', alt: 'نشان اعتماد ۳' },
] as const;

export const footerLinks = [
  { label: 'درباره ما', href: PATHS.ABOUT },
  { label: 'تماس با ما', href: PATHS.CONTACT },
  { label: 'بلاگ', href: PATHS.BLOG },
] as const;

export const socialIcons = [
  { key: 'whatsapp' as const, ariaLabel: 'WhatsApp' },
  { key: 'telegram' as const, ariaLabel: 'Telegram' },
  { key: 'instagram' as const, ariaLabel: 'Instagram' },
] as const;

export const socialIconMap: Record<string, React.ReactNode> = {
  whatsapp: <WhatsappIcon />,
  telegram: <TelegramIcon />,
  instagram: <InstagramIcon />,
};
