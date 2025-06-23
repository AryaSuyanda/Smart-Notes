import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import AddNotePage from "./pages/AddNotePage";
import SettingsPage from "./pages/SettingsPage";
import MainLayout from "./Layouts/MainLayout";
import AddNotePageWrapper from "./components/AddNotePageWrapper";
import Alert from "./components/Alert";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman tanpa sidebar */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />

        {/* Halaman dengan sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/NotesPage" element={<NotesPage />} />
          <Route path="/AddNotePage" element={<AddNotePage />} />
          <Route path="/AddNotePage/:tabId" element={<AddNotePageWrapper />} />
          <Route path="/SettingsPage" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
