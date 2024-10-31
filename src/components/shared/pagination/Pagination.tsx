import { getPageNumbers } from './utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  loading: boolean;
  fetchPosts: (newPage: number) => Promise<void>;
}

export const Pagination = ({
  page,
  totalPages,
  loading,
  fetchPosts,
}: PaginationProps) => {
  const pageNumbers = getPageNumbers(page, totalPages);

  const handlePrevious = () => fetchPosts(page - 1);
  const handleNext = () => fetchPosts(page + 1);

  return (
    <div className="flex justify-center items-center mt-5 space-x-2">
      <button
        onClick={handlePrevious}
        disabled={page === 1 || loading}
        className="px-3 py-2 bg-gray-700 text-gray-100 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {pageNumbers.map((pageNum, index) =>
        pageNum === '...' ? (
          <span key={`dots-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => fetchPosts(pageNum as number)}
            disabled={loading || page === pageNum}
            className={`px-2 py-1 rounded ${
              page === pageNum
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-100'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {pageNum}
          </button>
        )
      )}

      <button
        onClick={handleNext}
        disabled={page === totalPages || loading}
        className="px-3 py-2 bg-gray-700 text-gray-100 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
