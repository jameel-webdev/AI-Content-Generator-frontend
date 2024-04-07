import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Register = lazy(() => import("./components/Users/Register"));
const Login = lazy(() => import("./components/Users/Login"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
