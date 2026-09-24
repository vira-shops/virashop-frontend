import { Button, Typography } from '@/components/ui';
import { TickCircleIcon } from '@icons';

interface SuccessFormProps {
  onCompleteProfile: () => void;
  onSkip: () => void;
}

export function SuccessForm({ onCompleteProfile, onSkip }: SuccessFormProps) {
  return (
    <div className="flex flex-col items-center gap-9">
      <span className="bg-success-50 border-success-100 text-success-500 rounded-4 flex size-[62px] items-center justify-center border">
        <TickCircleIcon className="size-[28px]" />
      </span>

      <div className="flex flex-col items-center gap-5 text-center">
        <Typography variant="h3" className="text-black">
          حساب کاربری شما با موفقیت ایجاد شد!
        </Typography>
        <Typography variant="body-sm" className="text-gray-400">
          اطلاعات شما با موفقیت ثبت گردید. جهت فعال‌سازی کامل غرفه و دسترسی به تمام امکانات،
          می‌توانید همین حالا پروفایل خود را تکمیل کنید
        </Typography>
      </div>

      <div className="mt-5 flex w-full flex-col gap-9 sm:flex-row">
        <Button type="button" color="primary" size="xl" fullWidth onClick={onCompleteProfile}>
          تکمیل اطلاعات پروفایل
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xl"
          fullWidth
          onClick={onSkip}
          className="border border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
        >
          بعداً انجام می‌دهم
        </Button>
      </div>
    </div>
  );
}
