import { AddressesList, getRouteChannel, type BuyerRouteParams } from '@/features/buyer-dashboard';
import { addressesMetadata } from '@/config/metadata';

export const metadata = addressesMetadata;

export default async function BuyerAddressesPage(props: BuyerRouteParams) {
  return <AddressesList channel={await getRouteChannel(props)} />;
}
