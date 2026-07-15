import { useDeferredValue, useMemo } from "react";

import type { VocabularyEntry } from "../types/Vocabularies";

const useVocabulariesFilter = (
  searchTerm: string,
  entries: VocabularyEntry[],
) => {
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase();

  const visibleEntries = useMemo(() => {
    if (!normalizedSearchTerm) {
      return entries;
    }

    return entries.filter((entry) =>
      entry.word.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [entries, normalizedSearchTerm]);

  return {
    visibleEntries,
    searchQuery: deferredSearchTerm.trim(),
    hasSearchQuery: normalizedSearchTerm.length > 0,
    hasNoResults: visibleEntries.length === 0,
    isSearchPending: searchTerm !== deferredSearchTerm,
  };
};

export default useVocabulariesFilter;
