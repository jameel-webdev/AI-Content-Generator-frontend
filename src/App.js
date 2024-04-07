import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const Register = lazy(() => import("./components/Users/Register"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
