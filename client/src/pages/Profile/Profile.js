import MineimagesComponent from "../../components/Profile/MineimagesComponent";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AccessHeader, API_URL } from "../../utils/API";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../../helpers/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOut } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Container,
  Row,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";

function Profile() {
  const { setAuthState } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  // const
  let Navigate = useNavigate();
  const logout = async () => {
    let chk = false;
    await Swal.fire({
      title: "Do you want to logout?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout!", "", "success");
        Cookies.remove("access-token");
        setAuthState({ status: false });
        Navigate("/");
      }
    });
  };

  const [user, setUser] = useState([]);
  const [address, setAddress] = useState([]);
  const [payment, setPayment] = useState([]);

  const fetchUser = () => {
    console.log(AccessHeader);
    axios
      .get(`${API_URL}/user`, {
        method: "get",
        headers: AccessHeader,
      })
      .then((response) => {
        return response;
      })
      .then((data) => {
        setUser(data.data.user[0]);
        setAddress(data.data.address[0]);
        setPayment(data.data.payment[0]);
      });
  };

  // https://www.youtube.com/watch?v=qdCHEUaFhBk
  // Fetching Data with useEffect
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/* ========================================= Profile Section  ========================================= */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-3">
          <div className="btn-edit">
            <Link to="/profile/edit">
              <Button className="btn-success btn-edit">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>
          </div>

          <div className="d-flex align-items-center">
            <div className="image">
              <img src={user.avartar} className="rounded" width="155" />
            </div>

            <div className="ml-3 w-100">
              {user && (
                <h4 className="mb-0 mt-0">{`${user.firstName} ${user.lastName}`}</h4>
              )}

              <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                <div class="d-flex flex-column">
                  <span class="articles">About</span>
                  <span class="number1">{user.about}</span>
                </div>
              </div>
              <div className="button mt-2 d-flex flex-row align-items-center">
                <Link to="/profile/images">
                  <button className="btn btn-sm btn-outline-success w-100">
                    Images
                  </button>
                </Link>
                <Link to="/profile/orders">
                  <button class="btn btn-sm btn-success w-100 ml-2">
                    Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="group-button">
            <Button
              className="btn-logout"
              variant="outline-success btn"
              onClick={logout}
            >
              logout <FontAwesomeIcon icon={faSignOut} />
            </Button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-around">
        <Card style={{ width: "31rem" }}>
          <Card.Body>
            <Card.Title>Address</Card.Title>
            <Card.Text>
              {address.addressLine1} {address.addressLine2}
              {address.city} {address.postalCode} {address.country}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <MineimagesComponent />
    </>
  );
}

export default Profile;
