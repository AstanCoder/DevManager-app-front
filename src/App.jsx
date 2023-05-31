import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./providers/Provider";
import Authenticated from "./providers/Authenticated";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clients from "./pages/Clients";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider>
        <Authenticated>
          <Routes>
            <Route
              exact
              path="/"
              render={() => <Home />}
              element={<Home />}
            ></Route>
            <Route
              exact
              path="/signin"
              render={() => <Login />}
              element={<Login />}
            ></Route>
            <Route
              exact
              path="/signup"
              render={() => <Register />}
              element={<Register />}
            ></Route>
            <Route
              exact
              path="/clients"
              render={() => <Clients />}
              element={<Clients />}
            ></Route>
          </Routes>
        </Authenticated>
      </AuthProvider>
    </Router>
  );
}

export default App;
