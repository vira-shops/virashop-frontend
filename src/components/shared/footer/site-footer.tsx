import Image from 'next/image';
import { Typography } from '@/components/ui';
import { PATHS } from '@/routes/paths';
import { SITE_FOOTER_TRUST_BADGES, SITE_FOOTER_COPYRIGHT } from './constants';

/**
 * Site-wide base footer — the blue brand band (description + trust badges)
 * plus the copyright line. Shared by every layout: rendered directly by the
 * home layout and composed INSIDE the store footer for the storefronts.
 */
export function SiteFooter() {
  return (
    <footer>
      <div className="mt-14 bg-blue-50">
        <div className="container flex flex-col items-center justify-center gap-11 pt-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-start justify-center gap-11">
            <Typography variant="h5" align="center" className="text-primary-700 w-full sm:w-fit">
              فروشگاه اینترنتی ویرا شاپس
            </Typography>

            <Typography
              variant="body-sm"
              color="gray"
              align="center"
              className="max-w-footer-paragraph text-center"
            >
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای
              قیمت قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم
              داشته داشته باشد{' '}
              <Typography
                as="span"
                variant="body-sm"
                className="text-primary-50"
                href={PATHS.ABOUT}
              >
                مشاهده بیشتر...
              </Typography>
            </Typography>
          </div>

          <div className="flex w-full items-center justify-between py-12 sm:w-fit sm:justify-center sm:gap-11 md:px-0">
            {SITE_FOOTER_TRUST_BADGES.map(({ src, alt }) => (
              <div
                key={src}
                className="rounded-6 flex size-16 items-center justify-center bg-gray-50 p-2 shadow-sm"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={80}
                  height={80}
                  className="size-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-center py-5">
        <Typography variant="caption-md" align="center" className="text-gray-400">
          {SITE_FOOTER_COPYRIGHT}
        </Typography>
      </div>
    </footer>
  );
}
