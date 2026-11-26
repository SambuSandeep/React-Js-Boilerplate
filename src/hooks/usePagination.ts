import { useCallback, useState } from 'react';

interface Options {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

export function usePagination({ totalItems, pageSize = 10, initialPage = 1 }: Options) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [requestedPage, setRequestedPage] = useState(initialPage);

  const page = Math.min(Math.max(requestedPage, 1), totalPages);

  const goTo = useCallback(
    (next: number) => setRequestedPage(Math.min(Math.max(next, 1), totalPages)),
    [totalPages],
  );

  return {
    page,
    pageSize,
    totalPages,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
    goTo,
    next: () => goTo(page + 1),
    previous: () => goTo(page - 1),
    startIndex: (page - 1) * pageSize,
    endIndex: Math.min(page * pageSize, totalItems),
  };
}
