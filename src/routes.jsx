import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import AddNotePage from "./pages/AddNotePage";
import SettingsPage from "./pages/SettingsPage";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/aalsjd" element={<WelcomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/NotesPage" element={<NotesPage />} />
        <Route path="/AddNotePage" element={<AddNotePage />} />
        {/* <Route path="/notes/:id" element={<NoteDetailPage />} /> */}
        <Route path="/SettingsPage" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
