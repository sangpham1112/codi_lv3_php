import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import ErrorPage from "./pages/Error";
import Layout from "./layout";
import AuthRequired from "./routes/AuthRequired";

function App() {
  return (
    <Routes>
      <Route>
        {PublicRoutes.map((route) => {
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          );
        })}
      </Route>

      <Route path="/" element={<Layout />}>
        {PrivateRoutes.map((route) => {
          return (
            <Route
              element={<AuthRequired allowRole={route.allowRole} />}
              key={route.path}>
              <Route path={route.path} element={route.element} />
            </Route>
          );
        })}
      </Route>

      {/* catch all */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
