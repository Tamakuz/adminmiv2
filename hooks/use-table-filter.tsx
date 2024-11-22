"use client";

import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { useCallback, useMemo } from "react";

export const GENDER_OPTIONS = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

export function useTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString.withDefault(""));
  const [genderFilter, setGenderFilter] = useQueryState("gender", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setGenderFilter("");
    setPage(1);
  }, [setSearchQuery, setGenderFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!genderFilter || page !== 1;
  }, [searchQuery, genderFilter, page]);

  return {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
