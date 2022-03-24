import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import "./ImagesComponent.css";
import { API_URL, CLOUDINARY_NAME } from "../../utils/API";

import { Modal, Button } from "react-bootstrap";

function ImagesComponent() {
  const getImages = async (nextCursor) => {
    const params = new URLSearchParams();
    if (nextCursor) {
      params.append("next_cursor", nextCursor);
    }

    const response = await fetch(`${API_URL}/images?${params}`);
    const responseJson = await response.json();
    return responseJson;
  };

  const searchImages = async (searchValue, nextCursor) => {
    const params = new URLSearchParams();
    params.append(`expression`, searchValue);

    if (nextCursor) {
      params.append("next_cursor", nextCursor);
    }

    const response = await fetch(`${API_URL}/images/search?${params}`);
    const responseJson = await response.json();

    return responseJson;
  };

  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // console.log(getImages())
  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    };
    fetchData();
    loadImages();
  }, []);

  const handleLoadMoreButtonClick = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const responseJson = await searchImages(searchValue, nextCursor);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
  };

  const resetForm = async () => {
    const responseJson = await getImages();
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    setSearchValue("");
  };

  

  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const handleOnImageClick = (event) => {
    setShow(true)
    setDataImage(event.target)
  };

  const handleOrder = (event) =>{
    console.log(event.target)
  }

  const [dataImage, setDataImage] = useState("");
  const [imagePublicId, setimagePublicId] = useState("");

  const loadImages = async () => {
    try {
      const res = await fetch(`${API_URL}/images`);
      const data = await res.json();
      console.log(data)
      setimagePublicId(data);
    } catch (err) {
      console.log(err);
    }
  };
  


  return (
    <>
      {/* <form onSubmit={handleFormSubmit}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          required="required"
          placeholder="Enter a search value"
        ></input>
        <button type="submit">Search</button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </form>

      <div>
        <div className="image-grid">
          {imageList.map((image) => (
            <img src={image.secure_url} alt={image.asset_id} onClick={handleOnImageClick}></img>
          ))}
        </div>
        <div className="footer">
          {nextCursor && (
            <button onClick={handleLoadMoreButtonClick}>Load More</button>
          )}
        </div>
      </div> */}

{/* <h1 className="title">Cloudinary Gallery</h1> */}
      <div className="gallery">
        {imagePublicId &&
          imagePublicId.map((imageId, index) => (
            <Image
              key={index}
              cloudName={CLOUDINARY_NAME}
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
          <Modal.Title>Modal heading  </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${dataImage.alt}`} 
        <img src={dataImage.src}></img>
        <p> Woohoo, you're reading this text in a modal!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          ปิด  
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            สั่งซื้อ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImagesComponent;
