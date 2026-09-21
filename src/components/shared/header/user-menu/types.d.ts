export interface UserMenuUser {
  fullName: string;
  phone: string;
}

export interface UserMenuProps {
  user: UserMenuUser;
  onSignOut: () => void;
  /** Disables the sign-out item and shows a pending label while the request is in flight. */
  isPending?: boolean;
  className?: string;
}
