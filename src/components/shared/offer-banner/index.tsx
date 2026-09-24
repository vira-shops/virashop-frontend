import * as React from 'react';
import Image from 'next/image';

export const OfferBanner: React.FC = () => {
  return (
    <section aria-label="تخفیف‌ها" className="container">
      <div className="rounded-9 relative overflow-hidden">
        <Image
          src="/images/landing/hero/offer-banner.png"
          alt="تخفیف‌های ویژه ویراشاپس"
          width={1224}
          height={392}
          sizes="(max-width: 768px) 100vw, 1312px"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
};

OfferBanner.displayName = 'OfferBanner';
