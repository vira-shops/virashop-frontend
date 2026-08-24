export type ButtonVariant = 'fill' | 'outline' | 'ghost';

export type ButtonColor = 'primary' | 'blue' | 'yellow';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export interface ButtonProps extends ButtonBaseProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  fullRounded?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
