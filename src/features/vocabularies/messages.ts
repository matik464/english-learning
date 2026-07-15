export const vocabularyMessages = {
  title: "Vocabularies",
  loading: (level: string) => `Loading ${level} vocabulary...`,
  showingWords: (visible: number, total: number) =>
    `Showing ${visible} of ${total} words`,
  noResults: (searchQuery: string) => `No results found for "${searchQuery}".`,
  noVocabulary: "No vocabulary entries available.",
  failedToLoad: (level: string) => `Failed to load ${level} vocabulary.`,
  searchLabel: "Search",
  searchPlaceholder: "Search for a word in the vocabulary",
  cefrLevelLabel: "CEFR Level",
};
