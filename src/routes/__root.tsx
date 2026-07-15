import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/vocabulary">Vocabulary</Link>
          <Link to="/flashcards">Flashcards</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  ),
});
