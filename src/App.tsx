import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./scss/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundLayout';
import DefaultLayout from "@/components/layouts/DefaultLayout";


function App() {
  return (
      <Routes>
          <Route path="/" element={<DefaultLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="*" element={<NotFoundPage />} />

          </Route>
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
}

export default App;