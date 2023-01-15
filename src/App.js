import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage.js";
import "./App.css";
import Layout from "./components/layout/Layout.js";
import NewAdPage from "./components/ads/NewAdPage.js";
import AdPage from "./components/ads/AdPage.js";
import AdsPage from "./components/ads/AdsPage.js";
import RequireAuth from "./components/auth/RequireAuth.js";
import NotFound from "./components/common/error/notFound/NotFound.js";
import Main from "./components/layout/Main.js";
import { useSelector } from "react-redux";
import { getIsLogged } from "./store/selectors.js";

function App() {
  const titleApp = "React-no-pop2";

  const isLogged = useSelector(getIsLogged);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage titleApp={titleApp} />} />;
        <Route
          path="/ads"
          element={
            <RequireAuth>
              {" "}
              <Layout titleApp={titleApp} />{" "}
            </RequireAuth>
          }>
          <Route index element={<Main title="Home" children={<AdsPage />} />} />
          <Route
            path=":id"
            element={<Main title="Advertisment Detail" children={<AdPage />} />}
          />
          ;
          <Route path="new" element={<Main children={<NewAdPage />} />} />;{" "}
        </Route>
        <Route
          path="/"
          element={isLogged ? <Navigate to="/ads" /> : <Navigate to="/login" />}
        />
        ;
        <Route path="/404" element={<NotFound error={{ message: "404" }} />} />;
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
