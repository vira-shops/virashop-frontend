import type { Viewport } from 'next';
import type { PropsWithChildren } from '@/types/children';
import { configMetadata } from '@/config/metadata';
import RootLayout from '@/layouts/root-layout';
import './globals.css';

export const metadata = configMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function Layout({ children }: PropsWithChildren) {
  return <RootLayout>{children}</RootLayout>;
}
