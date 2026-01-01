import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "./utils/contexts/AuthContext.jsx";
import { SocketProvider } from "./utils/contexts/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  </AuthProvider>
);
