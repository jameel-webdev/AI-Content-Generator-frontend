import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { useAuth } from "./AuthContext/AuthContext";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

const Register = lazy(() => import("./components/Users/Register"));
const Login = lazy(() => import("./components/Users/Login"));
const Dashboard = lazy(() => import("./components/Users/UserDashboard"));
const Home = lazy(() => import("./components/Home/Home"));

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
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
