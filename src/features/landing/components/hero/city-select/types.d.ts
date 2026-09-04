export interface CityOption {
  value: string;
  label: string;
}

export interface CitySelectProps {
  cities: CityOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}
