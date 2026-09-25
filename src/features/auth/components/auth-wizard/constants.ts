import type { AuthWizardCopy, StepWidthMap } from './types';

/** Each step's content width from the design: the card hugs its step. */
export const STEP_WIDTH: StepWidthMap = {
  credentials: 'sm:w-84',
  otp: 'sm:w-87',
  role: 'sm:w-84',
  success: 'sm:w-[469px]',
  booth: 'sm:w-94',
};

export const AUTH_WIZARD_COPY: AuthWizardCopy = {
  welcome: (firstName) => `خوش آمدید، ${firstName}!`,
  boothSubmitted: 'غرفه شما ثبت شد و در انتظار تایید ادمین است',
};
