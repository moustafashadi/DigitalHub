import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./redux/features/auth/ProtectedRoute";
import Login from "./components/pages/Login";
import DashboardLayout from "./components/templates/DashboardLayout";
import RequestsPage from "./components/pages/RequestsList";
import RequestDetailPage from "./components/pages/RequestDetail";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="requests" element={<RequestsPage />} />
            <Route path="requests/:id" element={<RequestDetailPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/requests" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
