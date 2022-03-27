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

function PublicProfile() {

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
    const userId = (window.location.pathname).split('/')[2];
    axios
      .get(`${API_URL}/user/profile/${userId}`, {
        method: "get",
        headers: AccessHeader,
      })
      .then((response) => {
        return response;
      })
      .then((data) => {
        setUser(data.data.data);
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
            </div>
          </div>
        </div>
      </div>

   


    </>
  );
}

export default PublicProfile;
