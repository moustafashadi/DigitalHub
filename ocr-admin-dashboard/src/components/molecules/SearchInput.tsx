import useDebounce from "../../hooks/useDebounce";

// Input + Icon

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceDelay?: number;
}

export default function SearchInput({
    value,
    onChange,
    placeholder,
    debounceDelay
}: SearchInputProps) {
    const debouncedValue = useDebounce(value, debounceDelay);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="relative">
      {/* search icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={debouncedValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    )
}
