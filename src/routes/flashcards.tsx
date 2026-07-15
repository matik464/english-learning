import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/flashcards")({
  component: () => <div>FlashcardSession</div>,
});
