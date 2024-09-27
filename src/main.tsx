import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import userflow from "userflow.js";

const rootRoute = createRootRoute({
  component: () => {
    const [email, setEmail] = useState("");
    useEffect(() => {
      // console.log(import.meta.env.VITE_USERFLOWJS_TOKEN);
      // window.userflow.setServerEndpoint("userflow.local:4040");
      // window.userflow.init(import.meta.env.VITE_USERFLOWJS_TOKEN);
      // window.userflow.identify(23213, {
      //   email: "test-user231@gmail.com",
      //   localeId: "en-US",
      // });
      // console.log(window.userflow.isIdentified());
    }, []);

    const identifyUser = () => {
      console.log("identify-user", email);
      window.chmln.identify("23233223", {
        email: email,
      });
    };

    return (
      <>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button onClick={identifyUser}> Submit</button>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
