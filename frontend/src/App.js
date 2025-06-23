import React from "react";
import ReactDOM from "react-dom/client";
import { NoteTabsProvider } from "./Context/NoteTabsContext";
import { AlertProvider, useAlert } from "./Context/AlertContext.jsx";
import AppRoutes from "./routes.jsx";
import Alert from "./components/Alert.jsx";


function GlobalAlert() {
  const { alert } = useAlert();

  return (
    <Alert
      type={alert.type}
      message={alert.message}
    />
  );
}

function App() {
  return ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AlertProvider>
        <NoteTabsProvider>
          <GlobalAlert />
          <AppRoutes />
        </NoteTabsProvider>
      </AlertProvider>
    </React.StrictMode>
  );
}

export default App;
