import { Button, Typography } from '@/components/ui';
import { Logo, MobileMenu } from '@/components/shared';
import { landingHeaderConfig } from './constants';

export function LandingHeader() {
  const { logo, brandName, ctas, navItems } = landingHeaderConfig;

  return (
    <header className="border-b border-gray-100 bg-white px-4 py-4 sm:px-20">
      {/* Desktop */}
      <div className="hidden items-center justify-between sm:flex">
        <Logo src={logo.src} alt={logo.alt} />

        <nav className="flex items-center gap-4">
          {navItems.map(({ label, href }) => (
            <Typography
              key={href}
              variant="caption-lg"
              href={href}
              className="text-gray-400 transition-all hover:text-gray-600"
            >
              {label}
            </Typography>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {ctas.map(({ label, href, color }) => (
            <Button key={href} href={href} color={color}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile — hamburger + logo centered */}
      <div className="flex items-center justify-center gap-3 sm:hidden">
        <MobileMenu items={navItems} logo={logo} brandName={brandName} ctas={ctas} />
        <Logo src={logo.src} alt={logo.alt} className="flex flex-1 justify-center" />
      </div>
    </header>
  );
}
