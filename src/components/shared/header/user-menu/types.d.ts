export interface UserMenuUser {
  fullName: string;
  phone: string;
}

export interface UserMenuProps {
  user: UserMenuUser;
  onSignOut: () => void;
  /** «ورود به داشبورد» target — omit to hide the item. */
  dashboardHref?: string;
  /** Disables the sign-out item and shows a pending label while the request is in flight. */
  isPending?: boolean;
  className?: string;
}
