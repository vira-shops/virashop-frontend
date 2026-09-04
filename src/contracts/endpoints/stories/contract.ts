import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import { StoriesListResponseSchema } from './schemas';

const STORIES_MOCK = [
  { src: '/images/landing/hero/story-1.png', title: 'خشکبار' },
  { src: '/images/landing/hero/story-2.png', title: 'کنسرو' },
  { src: '/images/landing/hero/story-3.png', title: 'کالای اساسی' },
  { src: '/images/landing/hero/story-4.png', title: 'لبنیات' },
  { src: '/images/landing/hero/story-1.png', title: 'نوشیدنی گرم' },
  { src: '/images/landing/hero/story-2.png', title: 'نوشیدنی سرد' },
];

export const storiesContracts = {
  stories: {
    getActive: {
      method: 'GET',
      path: '/stories/active',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(StoriesListResponseSchema),
      mockData: mockDataWrapper(STORIES_MOCK),
    },
  },
} as const satisfies Contracts;
