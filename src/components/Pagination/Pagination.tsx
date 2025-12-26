import { CustomLink } from "data/types";
import React, { FC } from "react";
import twFocusClass from "utils/twFocusClass";
import Link from "components/Link";

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
    href: "/",
  },
  {
    label: "2",
    href: "/",
  },
  {
    label: "3",
    href: "/",
  },
  {
    label: "4",
    href: "/",
  },
];

export interface PaginationProps {
  className?: string;
  pages?: CustomLink[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ className = "", pages, currentPage, totalPages, onPageChange }) => {
  const renderItem = (pag: CustomLink, index: number) => {
    if (currentPage && index === currentPage - 1) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          onClick={() => onPageChange && onPageChange(index + 1)}
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        onClick={() => onPageChange && onPageChange(index + 1)}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        href={pag.href}
      >
        {pag.label}
      </Link>
    );
  };

  return (
    <nav
      className={`nc-Pagination cursor-pointer inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {pages?.map((page, index) => (
        <React.Fragment key={index}>
          {renderItem(page, index)}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Pagination;
