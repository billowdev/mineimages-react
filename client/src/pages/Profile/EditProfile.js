import React, { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { AccessHeader, API_URL } from "../../helpers/API";
import { Link } from "react-router-dom";
function EditProfile() {
  const [user, setUser] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [payment, setPayment] = React.useState("");

  const handleUpdate = (event) => {};

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
                        onClick={handleUpdate()}
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
