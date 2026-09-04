import type { ComponentType, SVGProps } from 'react';
import { NoteIcon, ShopIcon, TaskSquareIcon } from '@icons';

export interface MakeFutureCard {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
}

export const MAKE_FUTURE_ARIA_LABEL = 'آینده خود را با ما بسازید';

export const MAKE_FUTURE_CARDS: MakeFutureCard[] = [
  { icon: ShopIcon, title: 'فروشنده شوید' },
  { icon: TaskSquareIcon, title: 'ویزیتور شوید' },
  { icon: NoteIcon, title: 'اعتبار سنجی چک' },
];
