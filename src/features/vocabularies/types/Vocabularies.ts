import type { CEFR_LEVELS } from "../utils/Vocabularies";

export type CefrLevel = (typeof CEFR_LEVELS)[number];

export type VocabularyEntry = {
  word: string;
  pos: string;
  raw: string;
};
