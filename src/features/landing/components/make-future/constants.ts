import { NoteIcon, ShopIcon, TaskSquareIcon } from '@icons';
import type { MakeFutureCard } from './types';

export const MAKE_FUTURE_TITLE = 'آینده خود را با ما بسازید';
export const MAKE_FUTURE_ARIA_LABEL = MAKE_FUTURE_TITLE;

export const MAKE_FUTURE_CARDS: MakeFutureCard[] = [
  { icon: ShopIcon, title: 'فروشنده شوید' },
  { icon: TaskSquareIcon, title: 'ویزیتور شوید' },
  { icon: NoteIcon, title: 'اعتبار سنجی چک' },
];
