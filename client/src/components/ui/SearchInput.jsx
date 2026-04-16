const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  width = 'w-full md:w-[75%]',
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        ${width} mx-auto block
        p-4 rounded-xl mb-8
        border-2
        bg-white/90 dark:bg-slate-800/90
        text-text-light dark:text-text-dark
        border-yellow-400 dark:border-yellow-500
        shadow-xl
        text-lg
        placeholder:text-gray-500 dark:placeholder:text-gray-400
        focus:outline-none
        focus:ring-4 focus:ring-yellow-300
        focus:border-yellow-500
        transition-all duration-300
      `}
    />
  );
};

export default SearchInput;
