import Image from 'next/image';
import { Typography, Button } from '@/components/ui';
import { trustBadges, footerLinks, socialIcons, socialIconMap } from './constants';

export function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-center gap-4 bg-blue-50 px-4 py-4 sm:flex-row sm:justify-between sm:px-20">
        <div className="flex flex-col items-start justify-center gap-4">
          <Typography variant="h5" align="center" className="text-primary-700 w-full sm:w-fit">
            فروشگاه اینترنتی ویرا شاپس
          </Typography>

          <Typography
            variant="body-sm"
            color="gray"
            align="center"
            className="max-w-159 text-center"
          >
            یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای
            قیمت قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم
            داشته داشته باشد{' '}
            <Typography
              as="span"
              variant="body-sm"
              className="text-primary-50 font-bold"
              href="/about"
            >
              مشاهده بیشتر...
            </Typography>
          </Typography>
        </div>

        <div className="flex items-center justify-center gap-4 py-6">
          {trustBadges.map(({ src, alt }) => (
            <div key={src} className="h-20 w-20 rounded-lg bg-gray-50 p-4 shadow-sm">
              <Image src={src} alt={alt} width={64} height={64} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 px-4 py-2 sm:flex-row sm:px-20">
        <div className="flex items-center justify-center gap-6">
          {footerLinks.map(({ label, href }) => (
            <Typography key={href} variant="caption-lg" href={href} color="primary">
              {label}
            </Typography>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          {socialIcons.map(({ key, ariaLabel }) => (
            <Button
              key={key}
              variant="ghost"
              size="md"
              color="primary"
              icon={socialIconMap[key]}
              aria-label={ariaLabel}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
