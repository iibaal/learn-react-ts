import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>{" "}
        <Link to="/steps" className="[&.active]:font-bold">
          Steps
        </Link>
        <Link to="/dateCounter" className="[&.active]:font-bold">
          Date Counter
        </Link>
        <Link to="/tripLuggageCheck" className="[&.active]:font-bold">
          Trip Luggage Check
        </Link>

        <Link to="/flashCard" className="[&.active]:font-bold">
          Flashcard
        </Link>
        <Link to="/accordion" className="[&.active]:font-bold">
          Accordion
        </Link>
        <Link to="/eatnsplit" className="[&.active]:font-bold">
          Eat N Split
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
