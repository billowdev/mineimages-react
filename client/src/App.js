import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./components/header/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
        <Router>
          
          <Navbar></Navbar>
   

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>

        </Router>

        
    </div>
  );
}

export default App;
