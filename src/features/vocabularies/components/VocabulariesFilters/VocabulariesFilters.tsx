import { Input } from "@/shared/atoms/Input";
import { Select } from "@/shared/atoms/Select";
import { FormField } from "@/shared/molecules/FormField";

import { CEFR_LEVELS } from "../../utils/Vocabularies";
import type { CefrLevel } from "../../types/Vocabularies";
import { vocabularyMessages } from "../../messages";

type VocabulariesFiltersProps = {
  onChangeSearch: (searchTerm: string) => void;
  onChangeCefrLevel: (cefrLevel: CefrLevel) => void;
  searchTerm: string;
  cefrLevel: CefrLevel;
};

const isCefrLevel = (value: string): value is CefrLevel =>
  CEFR_LEVELS.includes(value as CefrLevel);

const VocabulariesFilters = ({
  onChangeSearch,
  onChangeCefrLevel,
  searchTerm,
  cefrLevel,
}: VocabulariesFiltersProps) => {
  return (
    <div>
      <FormField
        label={vocabularyMessages.searchLabel}
        hint={vocabularyMessages.searchPlaceholder}
      >
        <Input
          value={searchTerm}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </FormField>

      <FormField label={vocabularyMessages.cefrLevelLabel}>
        <Select
          value={cefrLevel}
          onChange={(e) => {
            const { value } = e.target;
            if (isCefrLevel(value)) {
              onChangeCefrLevel(value);
            }
          }}
        >
          {CEFR_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </FormField>
    </div>
  );
};

export default VocabulariesFilters;
