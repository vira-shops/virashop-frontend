import { PropsWithChildren } from '@/types/children';
import { dana, poppins } from '@/config/fonts/fonts';
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
        <ToastProvider>
          <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
