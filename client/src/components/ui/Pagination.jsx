const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className='flex justify-center items-center gap-4'>
      {/* PREV */}
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className='px-4 py-2 rounded-lg font-semibold bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed'
      >
        ← Prev
      </button>

      {/* PAGE INFO */}
      <span className='text-text-light dark:text-text-dark font-medium'>
        Page {page} of {totalPages}
      </span>

      {/* NEXT */}
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className='px-4 py-2 rounded-lg font-semibold bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed'
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
