import React, { useState } from "react";
import { API_URL, token } from "../../utils/API";

function UploadImage() {
  const [fileInputState, setFileInputState] = useState("");
  const [PreviewSource, setPreviewSource] = useState("");

  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(event.target.value);
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.log("Error");
    };
  };

  const uploadImage = async (image) => {
    try {
      await fetch(`${API_URL}/images/upload`, {
        method: "POST",
        body: JSON.stringify({ data: image }),
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      });
      setFileInputState("");
      setPreviewSource("");
    } catch (err) {
      console.log(err);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {PreviewSource && (
        <img src={PreviewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}

export default UploadImage;
