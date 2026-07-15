import { useEffect, useState } from "react";

import type { CefrLevel, VocabularyEntry } from "../types/Vocabularies";
import { vocabularyMessages } from "../messages";

type VocabularyState =
  | {
      status: "loading";
      level: CefrLevel;
    }
  | {
      status: "success";
      level: CefrLevel;
      data: VocabularyEntry[];
    }
  | {
      status: "error";
      level: CefrLevel;
      message: string;
    };

const vocabularyLoaders = {
  A1: () => import("../data/A1.json"),
  A2: () => import("../data/A2.json"),
  B1: () => import("../data/B1.json"),
  B2: () => import("../data/B2.json"),
  C1: () => import("../data/C1.json"),
} satisfies Record<CefrLevel, () => Promise<{ default: VocabularyEntry[] }>>;

const useVocabulariesData = (cefrLevel: CefrLevel) => {
  const [vocabulary, setVocabulary] = useState<VocabularyState>({
    status: "loading",
    level: cefrLevel,
  });

  useEffect(() => {
    let cancelled = false;

    const loadVocabulary = async () => {
      setVocabulary({ status: "loading", level: cefrLevel });

      try {
        const module = await vocabularyLoaders[cefrLevel]();

        if (!cancelled) {
          setVocabulary({
            status: "success",
            level: cefrLevel,
            data: module.default,
          });
        }
      } catch (error) {
        console.error(`Failed to load ${cefrLevel} vocabulary`, error);
        if (!cancelled) {
          setVocabulary({
            status: "error",
            level: cefrLevel,
            message: vocabularyMessages.failedToLoad(cefrLevel),
          });
        }
      }
    };

    void loadVocabulary();

    return () => {
      cancelled = true;
    };
  }, [cefrLevel]);

  return vocabulary;
};

export default useVocabulariesData;
