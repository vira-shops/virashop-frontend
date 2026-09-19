'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from '@/types/children';
import { ArrowLeftIcon, ViraLogoIcon } from '@icons';
import { Button, Typography } from '@/components/ui';

const SUPPORT_PHONE_HREF = 'tel:03537246317';

export function AuthLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <div className="flex min-h-svh flex-col bg-gray-50">
      <header className="container flex items-center justify-between py-6">
        <Typography
          variant="body-10"
          href={SUPPORT_PHONE_HREF}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-black"
        >
          <span className="text-caption-lg">تماس با پشتیبانی</span>
        </Typography>

        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeftIcon className="size-9" />}
          className="text-gray-600 transition-colors hover:bg-transparent hover:text-black"
        >
          برگشت
        </Button>
      </header>

      <main className="container flex flex-1 flex-col items-center justify-center pb-10">
        <Link href="/" aria-label="ویراشاپ" className="text-black">
          <ViraLogoIcon className="h-14 w-auto" />
        </Link>
        <div className="rounded-5 mt-6 w-full max-w-110 border border-neutral-100 bg-white p-11">
          {children}
        </div>
      </main>
    </div>
  );
}
