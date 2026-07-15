import { memo } from "react";

import type { VocabularyEntry } from "../../types/Vocabularies";

type VocabulariesListProps = {
  entries: VocabularyEntry[];
};

const VocabulariesList = memo(({ entries }: VocabulariesListProps) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={`${entry.word}-${entry.pos}`}>
          <strong>{entry.word}</strong> — {entry.pos}
        </li>
      ))}
    </ul>
  );
});

export default VocabulariesList;
