import { PropsWithChildren } from '@/types/children';
import { Header } from '@/components/layout/home/header';
import { Footer } from '@/components/layout/home/footer';

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
