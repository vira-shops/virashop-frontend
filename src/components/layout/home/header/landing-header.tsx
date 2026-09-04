import { Button, Typography } from '@/components/ui';
import { Logo, MobileMenu } from '@/components/shared';
import { landingHeaderConfig } from './constants';

export function LandingHeader() {
  const { logo, brandName, ctas, navItems } = landingHeaderConfig;

  return (
    <header className="border-b border-gray-100 bg-white py-4">
      {/* Desktop */}
      <div className="container mx-auto hidden items-center justify-between sm:flex">
        <Logo src={logo.src} alt={logo.alt} />

        <nav className="flex items-center gap-11">
          {navItems.map(({ label, href }) => (
            <Typography
              key={href}
              variant="caption-lg"
              href={href}
              className="text-gray-300 transition-all hover:text-gray-600"
            >
              {label}
            </Typography>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {ctas.map(({ label, href, color }) => (
            <Button key={href} href={href} color={color}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile — hamburger + logo centered */}
      <div className="container flex items-center justify-center gap-9 sm:hidden">
        <MobileMenu items={navItems} logo={logo} brandName={brandName} ctas={ctas} />
        <Logo src={logo.src} alt={logo.alt} className="ml-14 flex flex-1 justify-center" />
      </div>
    </header>
  );
}
