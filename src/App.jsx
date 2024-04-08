import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader.component";
import { useAuth } from "./AuthContext/AuthContext";
import PrivateNavbar from "./components/PrivateNavbar.component";
import { ProtectedRoute, PublicRoute } from "./Routes";

const Register = lazy(() => import("./pages/Register.page"));
const Login = lazy(() => import("./pages/Login.page"));
const Dashboard = lazy(() => import("./pages/Dashboard.page"));
const Home = lazy(() => import("./pages/Home.page"));
const Content = lazy(() => import("./pages/GenerateContent.page"));

function App() {
  const { auth } = useAuth();
  return (
    <>
      <Router>
        {auth ? <PrivateNavbar /> : <h1>Public</h1>}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="" element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="" element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/generate-content" element={<Content />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
