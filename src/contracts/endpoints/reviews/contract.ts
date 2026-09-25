import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import {
  MyQuestionsResponseSchema,
  MyReviewsResponseSchema,
  type MyQuestion,
  type MyReview,
  type ReviewProduct,
} from './schemas';

/** The buyer's own reviews and questions. NOT LIVE YET — the hooks force these mocks. */

const PEPSI: ReviewProduct = {
  slug: 'pepsi-cola',
  channel: 'RETAIL',
  name: 'نوشابه کولا پپسی',
  image: '/images/landing/big-offer/01.png',
};

export const MY_REVIEWS_MOCK: MyReview[] = [
  {
    id: 1,
    product: PEPSI,
    rating: 4,
    title:
      'عنوان متن لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    pros: ['در مجموع با توجه به قیمت در شگفت انگیز می ارزه مزه اش هم خوبه', 'ارزش خرید داره'],
    cons: ['طعمش زیاد جالب نیست'],
    status: 'PENDING',
    createdAt: '2021-08-12T09:30:00Z',
  },
];

export const MY_QUESTIONS_MOCK: MyQuestion[] = [
  {
    id: 1,
    product: PEPSI,
    question: 'تولیدی از کجاست ؟',
    answers: ['مشهد', 'مشهد و اصفهان'],
    createdAt: '2021-08-12T09:30:00Z',
  },
];

export const reviewsContracts = {
  reviews: {
    /** `GET /reviews/me` — reviews the buyer wrote. */
    getMine: {
      method: 'GET',
      path: '/reviews/me',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(MyReviewsResponseSchema),
      mockData: mockDataWrapper(MY_REVIEWS_MOCK),
    },

    /** `GET /questions/me` — questions the buyer asked, with answers. */
    getMyQuestions: {
      method: 'GET',
      path: '/questions/me',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(MyQuestionsResponseSchema),
      mockData: mockDataWrapper(MY_QUESTIONS_MOCK),
    },
  },
} as const satisfies Contracts;
