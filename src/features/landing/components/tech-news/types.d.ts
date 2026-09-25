import type { NewsCardProps } from '@/components/shared';
import type { TechNewsItem } from '@/contracts/endpoints/posts/schemas';

/** Maps one API news item onto the shared NewsCard. */
export type TechNewsToCard = (
  item: TechNewsItem,
) => Pick<NewsCardProps, 'image' | 'title' | 'excerpt' | 'href' | 'linkLabel'>;
