import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import { ItemsProvider } from "./context/ItemContext";
import AppRoutes from "./routes/AppRotes";
import Navbar from "./components/NavBar";
import { UserProvider } from "./context/UserContext";

function App() {


  return (
    <UserProvider>
      <ItemsProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </ItemsProvider>
    </UserProvider>
  );
}

export default App;
