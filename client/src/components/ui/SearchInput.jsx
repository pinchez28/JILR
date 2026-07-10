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
      className={`${width} mx-auto block p-4 rounded-xl mb-8 border-2 bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border-secondary/50 shadow-xl text-lg placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition-all duration-300`}
    />
  );
};

export default SearchInput;
