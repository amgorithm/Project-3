import React, { useState } from "react";

function TestUpload() {
  const [image, setImage] = useState("");
  const [state, setState] = useState({
    imgURL: "",
    imgAlt: "",
  });

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "eetbowkl");

    const options = {
      method: "POST",
      body: formData,
    };

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dnsbeaa7f/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) =>
        setState({
          imgURL: res.secure_url,
          imgAlt: res.original_filename,
        })
      )
      .catch((err) => console.log(err));
    console.log(data);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" onClick={uploadImage}>
        Submit
      </button>

      {state.imgURL.length > 0 ? (
        <img src={state.imgURL} alt={state.imgAlt} />
      ) : null}
    </div>
  );
}

export default TestUpload;
