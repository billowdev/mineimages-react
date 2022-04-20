import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { AccessHeader } from "../utils/API";

import { Button, Container, Row, Navbar, Nav } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

import "../assets/css/style.css";
import SignIn from "../components/Authentications/SignIn";
import SignUp from "../components/Authentications/SignUp";
import Authentication from "../components/Authentications/Authentication";
import Footer from "../components/Footer/Footer";

import Home from "./Home";
import Profile from "./Profile";
import PublicProfile from "./PublicProfile";
import EditProfile from "./Profile/components/EditProfile";
import Card from "./Cart/Card";
import Cart from "./Cart/Cart";
import OrderHistory from "./OrderHistory";
import ImagesHistory from "./ImageHistory";
import UploadImage from "./UploadImage/"

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [authState, setAuthState] = useState({
    id: "",
    name: "",
    status: false,
  });
  
  const fetchIsLogin = () => {
    var url = `${API_URL}/auth/authenticated`;
    axios
      .get(url, {
        method: "get",
        headers: AccessHeader,
      })
      .then((response) => {
        return response;
      })
      .then((data) => {
        setAuthState({
          id: data.id,
          name: data.firstName,
          status: true,
        });
      });
  };


  useEffect(() => {
    fetchIsLogin();
  }, []);

  return (
    <>
      <div className="App">
        <AuthContext.Provider
          value={{
            authState,
            setAuthState,
          }}
        >
          <Router>
            <div>
              <Toaster />
            </div>
            {/* ============================ Navbar Section ==============================  */}
            <Navbar bg="light" expand="lg" className="fixed-top">
              <Container fluid>
                <Link to="/" className="Navbar__brand">
                  <Navbar.Brand>Mineimages</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    {authState.status && (
                      <>
                        <Link to="/cart" className="Nav-link">
                          <Nav.Link href="#action3">Cart </Nav.Link>
                        </Link>
                      </>
                    )}

                    {authState.status && (
                      <>
                        <Link to="/card" className="Nav-link">
                          <Nav.Link href="/"> New </Nav.Link>
                        </Link>
                      </>
                    )}

                    <Nav.Link href="#" disabled></Nav.Link>
                  </Nav>
                  <Nav>
                    {!authState.status && (
                      <>
                        <Link to="/auth/signin" className="Nav-link">
                          <Nav.Link href="/">SignIn</Nav.Link>
                        </Link>

                        <Link to="/signup" className="Nav-link">
                          {/* <Button variant="outline-success btn">SignUp</Button> */}
                          <Nav.Link href="/">SignUp</Nav.Link>
                        </Link>
                      </>
                    )}
                    {authState.status && (
                      <>
                        <Link to="/profile">
                          <Button variant="outline-success btn">Profile</Button>
                        </Link>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            {/* ============================ Navbar Section ==============================  */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/checkout/card" element={<Card />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile"  element={<Profile />} />
              <Route path="/profile/orders" element={<OrderHistory />} />
              <Route path="/profile/images" element={<ImagesHistory />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/images/upload" element={<UploadImage />} />

              <Route path="/PublicProfile/:id" element={<PublicProfile />} />

              <Route
                path="/authentication/activate/:token"
                exact
                element={<Authentication />}
              />
            </Routes>
          </Router>
          <Footer />
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
