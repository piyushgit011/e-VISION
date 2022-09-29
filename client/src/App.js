import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Class from "./pages/Class";

function App() {
  return (
    <div className="App font-poppins bg-siteBg min-h-[100vh]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Auth />} />
        <Route path="class" element={<Class />} />
      </Routes>
    </div>
  );
}

export default App;
