import type { Metadata } from 'next';
import { loginMetadata } from '@/config/metadata';
import { AuthLayout } from '@/layouts/auth-layout';
import { AuthWizard } from '@/features/auth';

export const metadata: Metadata = loginMetadata;

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthWizard initialMode="login" />
    </AuthLayout>
  );
}
