import { ProfileForm } from '@/features/buyer-dashboard';
import { profileMetadata } from '@/config/metadata';

export const metadata = profileMetadata;

export default function BuyerProfilePage() {
  return <ProfileForm />;
}
