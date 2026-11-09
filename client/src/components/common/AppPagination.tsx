import type { ReactNode } from "react";
import type { PaginationMeta } from "@/types/pagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface AppPaginationProps {
  pagination?: PaginationMeta | null;
  onPageChange: (page: number) => void;
  page?: number;
  maxVisiblePages?: number;
  showWhenSinglePage?: boolean;
  className?: string;
}

function AppPagination({
  pagination,
  onPageChange,
  page: controlledPage,
  maxVisiblePages = 5,
  showWhenSinglePage = false,
  className,
}: AppPaginationProps) {
  if (!pagination) return null;

  const { totalPages, hasPrevPage, hasNextPage } = pagination;
  const currentPage = controlledPage ?? pagination.page;

  if (totalPages <= 1 && !showWhenSinglePage) {
    return null;
  }

  const handlePageChange = (nextPage: number) => {
    if (nextPage === currentPage) return;

    scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(nextPage);
  };

  const renderPageItems = () => {
    const items: ReactNode[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let p = 1; p <= totalPages; p++) {
        items.push(
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === currentPage}
              onClick={() => handlePageChange(p)}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      // First page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => handlePageChange(1)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      // Left ellipsis
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      // Middle window around currentPage
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let p = startPage; p <= endPage; p++) {
        items.push(
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === currentPage}
              onClick={() => handlePageChange(p)}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      // Right ellipsis
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      // Last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <div className={cn("pt-4", className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={!hasPrevPage}
              className={
                !hasPrevPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {renderPageItems()}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={!hasNextPage}
              className={
                !hasNextPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default AppPagination;
