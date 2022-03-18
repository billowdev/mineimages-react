import React,{ useEffect, useState } from 'react'
import { Image } from "cloudinary-react";
import "./ImagesComponent.css"

function ImagesComponent() {
  const [imageIds, setImageIds] = useState();
  const API_URL = process.env.REACT_APP_API_URL;
  
  const loadImages = async () => {
    try {
      const res = await fetch(`${API_URL}/images/photos`);
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <h1 className="title">Cloudinary Gallery</h1>
      {/* <div className="gallery">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={imageId}
              width="300"
              height="200"
              crop="scale"
            />
          ))}
      </div> */}
    </div>
  )
}

export default ImagesComponent