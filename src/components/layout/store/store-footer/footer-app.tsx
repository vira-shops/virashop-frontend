import { AndroindIcon, BazarIcon, DownloadIcon } from '@/components/shared';
import { Button, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';

export function FooterApp() {
  return (
    <div className="container pb-10">
      <div
        className={cn(
          'relative isolate overflow-hidden',
          'flex flex-col items-center gap-6',
          'bg-primary-500 rounded-xl px-6 py-12',
          'md:flex-row md:justify-between',
        )}
      >
        {/* Decorative download icons */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <DownloadIcon className="absolute -right-12 -bottom-12 size-20 rotate-[-20deg] text-white/10" />

          <DownloadIcon className="absolute -top-3 right-[28%] size-16 rotate-12 text-white/10" />

          <DownloadIcon className="absolute right-[42%] bottom-[10px] size-14 rotate-25 text-white/10" />

          <DownloadIcon className="absolute right-[12%] bottom-[-6px] size-9 rotate-[-20deg] text-white/10" />

          <DownloadIcon className="absolute -top-3 -right-2 size-8 rotate-15 text-white/10" />
        </div>

        {/* Title */}
        <Typography
          variant="h2"
          className="relative flex gap-1 text-center text-white md:text-right"
        >
          دانلود اپلیکیشن
          <span className="text-black">ویراشاپس</span>
        </Typography>

        {/* Download buttons */}
        <div className="relative flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="lg"
            href="#"
            leftIcon={<BazarIcon className="size-11" aria-hidden="true" />}
            className="bg-white/20 text-white"
          >
            دانلود از بازار
          </Button>
          <Button
            variant="ghost"
            size="lg"
            href="#"
            leftIcon={<AndroindIcon className="size-11" aria-hidden="true" />}
            className="bg-white/20 text-white"
          >
            دانلود مستقیم
          </Button>
        </div>
      </div>
    </div>
  );
}
