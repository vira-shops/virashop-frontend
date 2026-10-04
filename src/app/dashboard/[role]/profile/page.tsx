import { ProfileForm, getRouteChannel, type BuyerRouteParams } from '@/features/buyer-dashboard';
import { profileMetadata } from '@/config/metadata';

export const metadata = profileMetadata;

export default async function BuyerProfilePage(props: BuyerRouteParams) {
  return <ProfileForm channel={await getRouteChannel(props)} />;
}
