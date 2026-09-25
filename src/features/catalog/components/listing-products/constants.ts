export const MOBILE_SKELETON_COUNT = 6;

/**
 * The mobile row follows the listing mock: no price line, no dotted rule.
 * Both are hidden through the card's overrides rather than by changing the
 * shared card, so every other card in the app is untouched.
 */
export const MOBILE_CARD_OVERRIDES = {
  separatorClassName: 'hidden',
  priceRowClassName: 'hidden',
} as const;
