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
    <Link href={href} className={cn('flex h-9 w-21.5 items-center md:h-12 md:w-41', className)}>
      <Image
        src={src}
        alt={alt}
        width={86}
        height={20}
        priority
        className="h-full w-full object-contain"
      />
    </Link>
  );
}
