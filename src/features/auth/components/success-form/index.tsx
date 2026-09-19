import { Button, Typography } from '@/components/ui';
import { TickCircleIcon } from '@icons';

interface SuccessFormProps {
  onCompleteProfile: () => void;
  onSkip: () => void;
}

export function SuccessForm({ onCompleteProfile, onSkip }: SuccessFormProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="bg-success-50 border-success-100 text-success-500 rounded-4 flex size-12 items-center justify-center border">
        <TickCircleIcon className="size-9" />
      </span>

      <div className="flex flex-col items-center gap-2 text-center">
        <Typography variant="h4" className="text-black">
          حساب کاربری شما با موفقیت ایجاد شد!
        </Typography>
        <Typography variant="body-sm" className="text-gray-400">
          اطلاعات شما با موفقیت ثبت گردید. جهت فعال‌سازی کامل غرفه و دسترسی به تمام امکانات،
          می‌توانید همین حالا پروفایل خود را تکمیل کنید
        </Typography>
      </div>

      <div className="flex w-full gap-3">
        <Button type="button" color="primary" size="lg" fullWidth onClick={onCompleteProfile}>
          تکمیل اطلاعات پروفایل
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={onSkip}
          className="border border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
        >
          بعداً انجام میدهم
        </Button>
      </div>
    </div>
  );
}
