import { SearchIcon } from '@icons';
import { TextInput } from '@/components/ui';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = 'جستجو...', onSearch, className }: SearchBarProps) {
  return (
    <TextInput
      placeholder={placeholder}
      rightIcon={<SearchIcon />}
      onChange={(e) => onSearch?.(e.target.value)}
      className={className}
    />
  );
}
