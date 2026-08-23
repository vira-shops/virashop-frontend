export type ButtonVariant = 'fill' | 'outline' | 'ghost';

export type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export interface ButtonProps extends ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
