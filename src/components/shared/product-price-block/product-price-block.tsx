import * as React from 'react';
import { Badge, Typography } from '@/components/ui';
import { toFaDigits } from '@/utils/format';
import { cn } from '@/utils/ui';
import type { ProductPriceBlockProps } from './types';

const UNIT = 'تومان';

/**
 * PDP price block — retail: price + compareAtPrice (strikethrough) + discount
 * badge. Wholesale: cash/pack price, MOQ/pack info, installment and a tiers
 * table. One component, branching on whether `wholesale` is present.
 */
export const ProductPriceBlock: React.FC<ProductPriceBlockProps> = ({
  price,
  compareAtPrice,
  discountPercent,
  wholesale,
  formatPrice = (value) => String(value),
  className,
}) => {
  if (!wholesale) {
    return (
      <div className={cn('flex flex-col gap-3', className)}>
        <div className="flex items-center gap-3">
          <Typography variant="h4" className="text-black">
            {formatPrice(price)} {UNIT}
          </Typography>
          {Boolean(discountPercent) && (
            <Badge variant="soft" color="warning-red" size="sm" radius="sm">
              {toFaDigits(discountPercent!)}٪ تخفیف
            </Badge>
          )}
        </div>
        {compareAtPrice != null && compareAtPrice > price && (
          <Typography variant="body-sm" className="text-gray-300 line-through">
            {formatPrice(compareAtPrice)} {UNIT}
          </Typography>
        )}
      </div>
    );
  }

  const { moq, maxQty, packMultiple, cashPrice, packPrice, installment, tiers } = wholesale;

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div className="flex flex-wrap items-center gap-6">
        {cashPrice != null && (
          <div className="flex flex-col gap-1">
            <Typography variant="caption-md" className="text-gray-300">
              قیمت نقدی (هر واحد)
            </Typography>
            <Typography variant="h5" className="text-black">
              {formatPrice(cashPrice)} {UNIT}
            </Typography>
          </div>
        )}
        {packPrice != null && (
          <div className="flex flex-col gap-1">
            <Typography variant="caption-md" className="text-gray-300">
              قیمت بسته
            </Typography>
            <Typography variant="h6" className="text-gray-700">
              {formatPrice(packPrice)} {UNIT}
            </Typography>
          </div>
        )}
      </div>

      <Typography variant="caption-md" className="text-gray-500">
        حداقل سفارش {toFaDigits(moq)} عدد · مضرب بسته {toFaDigits(packMultiple)} عدد
        {maxQty != null && ` · حداکثر ${toFaDigits(maxQty)} عدد`}
      </Typography>

      {installment && (
        <Typography variant="caption-md" className="text-primary-600">
          امکان خرید اقساطی {toFaDigits(installment.months)} ماهه با کارمزد ماهانه{' '}
          {toFaDigits(installment.monthlyFeePercent)}٪
        </Typography>
      )}

      {tiers.length > 0 && (
        <div className="border-t border-dotted border-gray-200 pt-4">
          <Typography variant="caption-md" className="mb-2 text-gray-700">
            قیمت پلکانی
          </Typography>
          <table className="w-full text-start">
            <tbody>
              {tiers.map((tier, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-2">
                    <Typography variant="caption-md" className="text-gray-500">
                      {tier.maxQty != null
                        ? `${toFaDigits(tier.minQty)} تا ${toFaDigits(tier.maxQty)} عدد`
                        : `بیش از ${toFaDigits(tier.minQty)} عدد`}
                    </Typography>
                  </td>
                  <td className="py-2 text-end">
                    <Typography variant="caption-md" className="text-black">
                      {formatPrice(tier.unitPrice)} {UNIT}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

ProductPriceBlock.displayName = 'ProductPriceBlock';
