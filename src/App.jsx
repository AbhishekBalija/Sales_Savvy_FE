import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
