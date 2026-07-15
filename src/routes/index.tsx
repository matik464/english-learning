import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <h1>English Words</h1>
    </div>
  ),
});
