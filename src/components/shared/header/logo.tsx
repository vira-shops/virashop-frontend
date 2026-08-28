import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/ui';

interface LogoProps {
  src: string;
  alt: string;
  href?: string;
  className?: string;
}

export function Logo({ src, alt, href = '/', className }: LogoProps) {
  return (
    <Link href={href} className={cn('flex items-center', className)}>
      <Image src={src} alt={alt} width={164} height={40} priority />
    </Link>
  );
}
