import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import BossFinalQuiz from "./pages/BossFinalQuiz";
import Calculators from "./pages/Calculators";
import Dashboard from "./pages/Dashboard";
import DistributionDetector from "./pages/DistributionDetector";
import Exercises from "./pages/Exercises";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ModulePage from "./pages/ModulePage";
import Progress from "./pages/Progress";
import QuickReview from "./pages/QuickReview";
import Register from "./pages/Register";
import SymbolsGuide from "./pages/SymbolsGuide";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/modulos/:moduleId", element: <ModulePage /> },
  { path: "/simbolos", element: <SymbolsGuide /> },
  { path: "/detector", element: <DistributionDetector /> },
  { path: "/exercicios", element: <Exercises /> },
  { path: "/simulado", element: <BossFinalQuiz /> },
  { path: "/revisao", element: <QuickReview /> },
  { path: "/calculadoras", element: <Calculators /> },
  { path: "/progresso", element: <Progress /> }
];

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
