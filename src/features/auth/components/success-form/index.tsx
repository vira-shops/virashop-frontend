import { Button, Typography } from '@/components/ui';
import { TickCircleIcon } from '@icons';
import { SKIP_BUTTON_CLASS, SUCCESS_FORM_COPY as COPY } from './constants';
import type { SuccessFormProps } from './types';

export function SuccessForm({ onCompleteProfile, onSkip }: SuccessFormProps) {
  return (
    <div className="flex flex-col items-center gap-9">
      <span className="bg-success-50 border-success-100 text-success-500 rounded-4 flex size-[62px] items-center justify-center border">
        <TickCircleIcon className="size-[28px]" />
      </span>

      <div className="flex flex-col items-center gap-5 text-center">
        <Typography variant="h3" className="text-black">
          {COPY.title}
        </Typography>
        <Typography variant="body-sm" className="text-gray-400">
          {COPY.description}
        </Typography>
      </div>

      <div className="mt-5 flex w-full flex-col gap-9 sm:flex-row">
        <Button type="button" color="primary" size="xl" fullWidth onClick={onCompleteProfile}>
          {COPY.completeProfile}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xl"
          fullWidth
          onClick={onSkip}
          className={SKIP_BUTTON_CLASS}
        >
          {COPY.skip}
        </Button>
      </div>
    </div>
  );
}
