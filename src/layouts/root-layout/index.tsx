import Script from 'next/script';
import { PropsWithChildren } from '@/types/children';
import { dana, poppins } from '@/config/fonts/fonts';
import { env } from '@/config/env';
import { ToastProvider } from '@/components/feedback';
import { QueryClientProviderWrapper } from '@/providers/QueryClientProviderWrapper';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className={` ${dana.variable} ${poppins.variable} `}
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        {env.NODE_ENV === 'development' && (
          // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
          <Script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
            strategy="beforeInteractive"
          />
        )}
        <ToastProvider>
          <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
