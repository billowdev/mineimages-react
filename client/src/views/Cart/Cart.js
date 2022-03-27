import axios from "axios";
import React, { useState, useEffect } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { AccessHeader, API_URL } from "../../utils/API";
import { Card, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function Shopping() {
  const [oncartOrder, setOncartOrder] = useState([]);
  const [totalItemOncart, setTotalItemOncart] = useState([]);
  const [totalPriceOncart, setTotalPriceOncart] = useState([]);
  var url = `${API_URL}/order/cart`;
  const fetchOnCartOrder = async () => {
    await axios
      .get(url, {
        method: "get",
        headers: AccessHeader,
      })
      .then((response) => {
        return response;
      })
      .then((resp) => {
        console.log(resp.data.data.oncart);
        setOncartOrder(resp.data.data.oncart);
        setTotalPriceOncart(resp.data.data.totalPrice);
        setTotalItemOncart(resp.data.data.totalItem);
      });
  };
  let Navigate = useNavigate();
  const handleCheckout = async () => {
	
    Swal.fire({
      title: "Do you want to checkout?",
      confirmButtonText: `Yes`,
      showDenyButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var url = `${API_URL}/order/checkout`;
        axios
          .get(url, {
            method: "get",
            headers: AccessHeader,
          })
          .then((response) => {
            if (response.data.success) {
              Swal.fire("Checkout ! 😊", "", "success");
			  Navigate("/")
            } else {
              if (response.data.msg == "null") {
                Swal.fire("No have order to checkout 😵", "", "info");
              }
            }
          });
      } else if (result.isDenied) {
        Swal.fire("Continue shopping ", "", "info");
      }
    });
  };

  useEffect(() => {
    fetchOnCartOrder();
  }, []);

  function previewData() {
    /* Add return before formData.map */
    return oncartOrder.map((item) => {
      console.log("item", item.price);
      return (
        <div className="card-body">
          <div className="row">
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
              <div
                className="bg-image hover-overlay hover-zoom ripple rounded"
                data-mdb-ripple-color="light"
              >
                <img src={item["Image.pathWatermark"]} className="w-100" />
                <a href="#!">
                  <div
                    className="mask"
                    style={{
                      backgroundColor: "rgba(251, 251, 251, 0.2)",
                    }}
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
              <p>
                <strong>{item["Image.name"]}</strong>
              </p>
              <p>{item["Image.detail"]}</p>
              <p>{item["User.firstName"]}</p>
              <button
                type="button"
                className="btn btn-primary btn-sm me-1 mb-2"
                data-mdb-toggle="tooltip"
                title="Remove item"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <p className="text-start text-md-center">
                <strong>{item.price}</strong>
              </p>
            </div>
            <hr className="my-4" />
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">
                    {totalItemOncart == 0 ? (
                      <span>Cart item: 0</span>
                    ) : (
                      <span>Cart item:{`${totalItemOncart}`}</span>
                    )}
                  </h5>
                </div>
                <div>
                  {oncartOrder != [] ? (
                    previewData()
                  ) : (
                    <p className="text-center mt-3 mb-3">
                      ไม่มีรูปภาพในตะกร้าสินค้า
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      {totalPriceOncart == 0 ? (
                        <span>0</span>
                      ) : (
                        <span>{`${totalPriceOncart}`}</span>
                      )}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span>
                        {totalPriceOncart == 0 ? (
                          <strong>0</strong>
                        ) : (
                          <strong>{`${
                            totalPriceOncart + (totalPriceOncart * 7) / 100
                          }`}</strong>
                        )}
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-success btn-lg btn-block"
                    onClick={handleCheckout}
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shopping;
