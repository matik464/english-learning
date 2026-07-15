import { createFileRoute } from "@tanstack/react-router";
import Vocabularies from "@/features/vocabularies";

export const Route = createFileRoute("/vocabulary")({
  component: Vocabularies,
});
