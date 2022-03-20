import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./helpers/AuthContext";
import {
  Button,
  Container,
  Row,
  Navbar,
  Nav,
  NavDropdown,
  Div,
} from "react-bootstrap";

import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import Orders from "./pages/Orders";
import Footer from "./components/Footer/Footer";
import Cookies from "js-cookie";
import Card from "./pages/Card";
import Shopping from "./pages/Shopping";
import Authentication from "./pages/Authentication";
import toast, { Toaster  } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [authState, setAuthState] = useState(false);
  const [permissionState, setPermissionState] = useState("");
  

  const validateSignin = (email, password) => {
    if (email != "" && password != "") {
      const data = { email: email, password: password };
      const login = axios
        .post(`${API_URL}/auth/signin`, data)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            
            Cookies.set("access-token", response.data, { expires: 7 });
            console.log("res=",response.data)
            setAuthState(true);
            Navigate("/")
            Swal.fire({
              title: <strong>Welcome !</strong>,
              html: <i>You clicked the button!</i>,
              icon: 'success'
            })
            }
        });
    }

  }
  const handleSignIn = () => {
    Swal.fire({
      title: 'Signin Form',
      html: `<input type="text" id="email" class="swal2-input" placeholder="codetopanda@gmail.com">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: 'Sign in',
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value
        const password = Swal.getPopup().querySelector('#password').value
        if (!email || !password) {
          Swal.showValidationMessage(`Please enter email and password`)
        }
        return { email: email, password: password }
      }
    }).then((result) => {
      validateSignin(result.value.email, result.value.password)
    })
  }


  if (authState == false) {
    if (Cookies.get("access-token")) {
      setAuthState(true);
    }
  }

  useEffect(() => {
   
  }, []);
  
  

  return (
    <>
      <div className="App">
        <AuthContext.Provider
          value={{
            authState,
            setAuthState,
            permissionState,
            setPermissionState,
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
                    {authState && (
                      <>
                        <Link to="/shopping" className="Nav-link">
                          <Nav.Link href="#action3">Cart</Nav.Link>
                        </Link>
                        <Link to="/orders" className="Nav-link">
                          <Nav.Link href="#action3">orders</Nav.Link>
                        </Link>
                      </>
                    )}

                    {authState && (
                      <>
                        <Link to="/card" className="Nav-link">
                          <Nav.Link href="/">New</Nav.Link>
                        </Link>
                      </>
                    )}

                    <Nav.Link href="#" disabled></Nav.Link>
                  </Nav>
                  <Nav>
                    {!authState && (
                      <>
                        {/* <Link to="/auth/signin" className="Nav-link">
                          <Nav.Link href="/">SignIn</Nav.Link> */}
                          <Button variant="outline-success btn" onClick={handleSignIn}>SignIn</Button>
                        {/* </Link> */}

                        <Link to="/signup" className="Nav-link">
                          {/* <Button variant="outline-success btn">SignUp</Button> */}
                          <Nav.Link href="/">SignUp</Nav.Link>
                        </Link>
                      </>
                    )}
                    {authState && (
                      <>
                        <Link to="/profile" replace>
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
              <Route path="/" exact element={<Home />} />
              <Route path="/auth/signin" exact element={<SignIn />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/checkout/card" exact element={<Card />} />
              <Route path="/shopping" exact element={<Shopping />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/profile/edit" exact element={<EditProfile />} />
              <Route path="/orders" exact element={<Orders />} />

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
