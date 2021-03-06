import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";

import { AuthContext } from "./context/auth.context";

import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

const App = () => {
  const { userId, token, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, logout, login, userId, isAuthenticated }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}

        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
