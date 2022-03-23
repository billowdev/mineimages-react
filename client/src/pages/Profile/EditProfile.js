import React, { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { AccessHeader, API_URL, token } from "../../utils/API";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Modal, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOut } from "@fortawesome/free-solid-svg-icons";

function EditProfile() {
  const [user, setUser] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [payment, setPayment] = React.useState("");

  const [firstName, setFirstName] = useState(user.firstName);
  // const [updateProfile, setUpdateProfile] = useState({
  //   firstName: user.firstName,
  //   lastName:user.lastName,
  //   email:user.email,
  //   telephone:user.telephone,
  //   about:user.about,
  // });

  const refreshPage = () => {
    window.location.reload();
  };

  // Modal BS REACT
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetch user data who signin
  const fetchUser = async () => {
    await axios
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
        console.log(address);
        setPayment(data.data.payment[0]);
      });
  };

  const uploadImage = async (image) => {
    try {
      await fetch(`${API_URL}/user/avartar/upload`, {
        method: "PATCH",
        body: JSON.stringify({ data: image }),
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // upload image code
  const handleUploadAvartar = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      imageUrl: `${user.avartar}`,
      imageHeight: 300,
      imageAlt: `avartar ${user.name}`,
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
        uploadImage(e.target.result).then(() => {
          refreshPage();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (event) => {
   
    try {
      // await axios.patch(`${API_URL}/user/avartar/upload`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "access-token": token,
      //   },
      // }).then(resp=>{
      //     Swal.fire(
      //       'Good job!',
      //       'You clicked the button!',
      //       'success'
      //     )
      // });

      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container classNameName="item-center profile-body ">
      <div className="edit-section">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img src={user.avartar} alt="Maxwell Admin" />
                    </div>

                    <div>
                      <Button
                        className="btn-change-image"
                        variant="btn btn-outline-success btn-sm"
                        onClick={handleUploadAvartar}
                      >
                        เปลี่ยนรูปภาพ <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </div>
                    <h5 className="user-name">
                      {user.firstName} {user.lastName}
                    </h5>
                    <h6 className="user-email">{user.email}</h6>
                  </div>
                  <div className="about">
                    <h5>Address</h5>
                    <p>
                      {address.addressLine1} {address.addressLine2}{" "}
                      {address.city} {address.postalCode}
                      <br /> {address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="fullName">First Name</label>
                      <input
                        defaultValue={user.firstName}
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter First name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="eMail">Last Name</label>
                      <input
                        defaultValue={user.lastName}
                        type="email"
                        className="form-control"
                        id="eMail"
                        placeholder="Enter email ID"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="eMail">Email</label>
                      <input
                        defaultValue={user.email}
                        type="email"
                        className="form-control"
                        id="eMail"
                        placeholder="Enter email ID"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="phone">Phone</label>
                      <input
                        defaultValue={user.telephone}
                        type="text"
                        className="form-control"
                        id="phoneInput"
                        placeholder="Enter phone number"
                        maxLength={10}
                        minLength={10}
                        required
                      />
                    </div>
                  </div>
                  <div className="about">
                    <div className="form-group">
                      <label for="phone">About</label>
                      <textarea
                        defaultValue={user.about}
                        type="text"
                        className="form-control"
                        id="aboutTextArea"
                        placeholder="tell me about you"
                        maxLength={255}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Address</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="AddressLine1">Address Line 1</label>
                      <input
                        defaultValue={address.addressLine1}
                        type="text"
                        className="form-control"
                        id="addressLine1"
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="ciTy">Address Line 2</label>
                      <input
                        defaultValue={address.addressLine2}
                        type="text"
                        className="form-control"
                        id="addressLine2"
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="sTate">City</label>
                      <input
                        defaultValue={address.city}
                        type="text"
                        className="form-control"
                        id="sTate"
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="zIp">Zip Code</label>
                      <input
                        defaultValue={address.postalCode}
                        type="text"
                        className="form-control"
                        id="zIp"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="zIp">country</label>
                      <input
                        defaultValue={address.country}
                        type="text"
                        className="form-control"
                        id="zIp"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>

                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <Link to="/profile">
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                      </Link>
                      <button
                        type="button"
                        id="submit"
                        onClick={handleUpdateProfile()}
                        name="submit"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
