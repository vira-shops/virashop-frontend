import type { Metadata } from 'next';
import { registerMetadata } from '@/config/metadata';
import { AuthLayout } from '@/layouts/auth-layout';
import { AuthWizard } from '@/features/auth';

export const metadata: Metadata = registerMetadata;

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthWizard initialMode="signup" />
    </AuthLayout>
  );
}
