import { useState } from "react";

import useVocabulariesData from "./hooks/useVocabulariesData";
import useVocabulariesFilter from "./hooks/useVocabulariesFilter";

import VocabulariesFilters from "./components/VocabulariesFilters";
import VocabulariesList from "./components/VocabulariesList";
import PendingOpacity from "@/shared/atoms/PendingBlock";

import { CEFR_LEVELS } from "./utils/Vocabularies";
import type { CefrLevel, VocabularyEntry } from "./types/Vocabularies";
import { vocabularyMessages } from "./messages";

const EMPTY_ENTRIES: VocabularyEntry[] = [];

const Vocabularies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cefrLevel, setCefrLevel] = useState<CefrLevel>(CEFR_LEVELS[0]);

  const vocabulary = useVocabulariesData(cefrLevel);

  const {
    visibleEntries,
    searchQuery,
    hasSearchQuery,
    hasNoResults,
    isSearchPending,
  } = useVocabulariesFilter(
    searchTerm,
    vocabulary.status === "success" ? vocabulary.data : EMPTY_ENTRIES,
  );

  return (
    <main>
      <h1>{vocabularyMessages.title}</h1>

      <VocabulariesFilters
        onChangeSearch={setSearchTerm}
        onChangeCefrLevel={setCefrLevel}
        searchTerm={searchTerm}
        cefrLevel={cefrLevel}
      />

      {vocabulary.status === "loading" && (
        <p>{vocabularyMessages.loading(vocabulary.level)}</p>
      )}

      {vocabulary.status === "error" && (
        <p role="alert">{vocabulary.message}</p>
      )}

      {vocabulary.status === "success" && (
        <>
          <p>
            {vocabularyMessages.showingWords(
              visibleEntries.length,
              vocabulary.data.length,
            )}
          </p>
          {hasNoResults ? (
            <p role="status">
              {hasSearchQuery
                ? vocabularyMessages.noResults(searchQuery)
                : vocabularyMessages.noVocabulary}
            </p>
          ) : (
            <PendingOpacity isPending={isSearchPending}>
              <VocabulariesList entries={visibleEntries} />
            </PendingOpacity>
          )}
        </>
      )}
    </main>
  );
};

export default Vocabularies;
