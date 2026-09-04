import { Typography } from '@/components/ui';
import { Logo, SearchBar, UserActions, StoreHeaderConfig } from '@/components/shared';

interface StoreHeaderDesktopProps {
  config: StoreHeaderConfig;
}

export function StoreHeaderDesktop({ config }: StoreHeaderDesktopProps) {
  const { logo, brandName, navItems, userActions } = config;

  return (
    <div className="hidden items-center gap-12 md:flex">
      <Logo src={logo.src} alt={logo.alt} />

      <Typography variant="body-xl" className="font-bold whitespace-nowrap">
        {brandName}
      </Typography>

      <SearchBar className="flex-1" />

      <nav className="flex items-center gap-11">
        {navItems.map(({ label, href }) => (
          <Typography key={href} variant="caption-lg" href={href} color="primary">
            {label}
          </Typography>
        ))}
      </nav>

      <UserActions actions={userActions} />
    </div>
  );
}
