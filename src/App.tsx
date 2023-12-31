import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { AuthGuard } from "./guards";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./configs";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, Component, isPrivate }) =>
            isPrivate ? (
              <Route
                key={path}
                path={path}
                element={<AuthGuard component={Component} />}
              />
            ) : (
              <Route key={path} path={path} element={<Component />} />
            ),
          )}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
