import { CartLayout } from '@/layouts/cart-layout';
import { CheckoutWizard } from '@/features/cart';
import { cartMetadata } from '@/config/metadata';
import { ChannelSchema } from '@/validations';

interface PageProps {
  searchParams: Promise<{ channel?: string }>;
}

export const metadata = cartMetadata;

export default async function CartPage({ searchParams }: PageProps) {
  const { channel } = await searchParams;
  // Unknown or missing channel falls back to retail rather than 404ing —
  // the cart icon always carries one, but a shared link might not.
  const parsed = ChannelSchema.safeParse(channel);
  const resolved = parsed.success ? parsed.data : 'RETAIL';

  return (
    <CartLayout channel={resolved}>
      <div className="container py-6 md:py-8">
        <CheckoutWizard channel={resolved} />
      </div>
    </CartLayout>
  );
}
