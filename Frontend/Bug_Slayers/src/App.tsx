import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Editor from "./pages/Editor";
import MyWritings from "./pages/MyWritings";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/writings"
          element={
            <ProtectedRoute>
              <MyWritings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
