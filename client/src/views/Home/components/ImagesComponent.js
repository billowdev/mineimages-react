import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import "./ImagesComponent.css";
import { API_URL, CLOUDINARY_NAME, AccessHeader } from "../../../utils/API";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import Cookies from "js-cookie";
function ImagesComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // const handleShow = () => setShow(true);

  const handleOrder = (event) => {
    const response = axios
      .post(
        `${API_URL}/order`,
        { dataImage },
        {
          method: "post",
          headers: AccessHeader,
        }
      )
      .then((response) => {
        return response;
      })
      .then((data) => {
        const resp = data.data;
        if(resp.success) {
          Swal.fire({
            icon: "success",
            title: "Order success",
            text: `${resp.msg}`,
          });
        } else{
          Swal.fire({
            icon: "error",
            title: `ไม่สามารถซื้อรูปภาพนี้ได้`,
            text: `${resp.msg}`,
          });
        }
        setShow(false)
      })
  };

  const [dataImage, setDataImage] = useState("");
  const [imagePublicId, setimagePublicId] = useState("");

  const handleOnImageClick = async (event) => {
    setShow(true);
    const imgid = event.target.alt;
    const response = await axios
      .post(`${API_URL}/images/detail`, { imgid: imgid })
      .then((response) => {
        return response;
      })
      .then((data) => {
        const resp = data.data;
        setDataImage(resp);
      });
  };

  const loadImages = async () => {
    try {
      const res = await fetch(`${API_URL}/images`);
      const data = await res.json();
      // console.log(data)
      setimagePublicId(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <>
      <div className="gallery">
       
        {imagePublicId &&
          imagePublicId.map((imageId, index) => (
            <Image
              key={index}
              cloudName={CLOUDINARY_NAME}
              alt={imageId}
              publicId={imageId}
              width="200"
              height="200"
              crop="scale"
              onClick={handleOnImageClick}
            />
          ))} 
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>ภาพ: {dataImage.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={dataImage.pathWatermark} width="200px" height="200px" />
          <h6>
            เจ้าของภาพ : <span>{dataImage.owner}</span>
          </h6>
          <h6>
            ราคา : <span>{dataImage.price}</span>
          </h6>
          <h6>
            รายละเอียด : <span>{dataImage.detail}</span>
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" onClick={handleOrder}>
            สั่งซื้อ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImagesComponent;
