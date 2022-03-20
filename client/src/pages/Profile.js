import MineimagesComponent from "../components/Profile/MineimagesComponent";
import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import {Card} from 'react-bootstrap';

function Profile() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [user, setUser] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [payment, setPayment] = React.useState(null);

  const token = Cookies.get("access-token");

  const fetchUser = async () => {
    await axios
      .get(`${API_URL}/user`, {
        method: "get",
        headers: { "x-access-token": token },
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
              <img
                src="https://github.com/lacakp/lacakp/raw/main/Images/t_Panda.gif"
                className="rounded"
                width="155"
              />
            </div>
            <div className="ml-3 w-100">
              {/* <h4 className="mb-0 mt-0">{`${user.firstName} ${user.lastName}`}</h4> */}
              <span>CEO SaneDev</span>
              <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                <div class="d-flex flex-column">
                  
                  <span class="articles">About</span>
                  <span class="number1">Web Developer </span>
                </div>
              </div>
              <div className="button mt-2 d-flex flex-row align-items-center">
 
                <button className="btn btn-sm btn-outline-primary w-100">
                  MineImage
                </button>
                <button class="btn btn-sm btn-primary w-100 ml-2">Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-around">
        <Card style={{ width: '31rem' }}>
          <Card.Body>
            <Card.Title>Address</Card.Title>
            <Card.Text>
              680 ถ. นิตโย Muang สกลนคร 47000
            </Card.Text>
          </Card.Body>
        </Card>
      </div>


      
      <MineimagesComponent />
    </>
  );
}

export default Profile;
