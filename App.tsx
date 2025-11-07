import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Form } from "./pages/Form";
import { Dashboard } from "./pages/Dashboard"; // Importa el dashboard

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para el formulario */}
        <Route path="/form" element={<Form />} />

        {/* Ruta para el dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirección por defecto a /form */}
        <Route path="*" element={<Navigate to="/form" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;