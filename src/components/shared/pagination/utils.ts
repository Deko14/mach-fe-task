export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxPagesToShow: number = 2
) => {
  const pages: (number | '...')[] = [];

  // Always show the first page
  pages.push(1);

  let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(
    totalPages - 1,
    currentPage + Math.floor(maxPagesToShow / 2)
  );

  // Adjust start and end if too close to edges
  if (currentPage <= Math.floor(maxPagesToShow / 2)) {
    endPage = Math.min(totalPages - 1, maxPagesToShow);
  } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
    startPage = Math.max(2, totalPages - maxPagesToShow + 1);
  }

  // Add ellipses and middle page numbers
  if (startPage > 2) pages.push('...');
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  if (endPage < totalPages - 1) pages.push('...');

  // Always show the last page
  pages.push(totalPages);

  return pages;
};
