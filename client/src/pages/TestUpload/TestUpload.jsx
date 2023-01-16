import React, { useState } from "react";

function TestUpload() {
  // const [image, setImage] = useState("");

  // const [state, setState] = useState({
  //   imgURL: "",
  //   imgAlt: "",
  // });

  // const uploadImage = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "eetbowkl");

  //   const options = {
  //     method: "POST",
  //     body: formData,
  //   };

  //   const data = await fetch(
  //     "https://api.cloudinary.com/v1_1/dnsbeaa7f/image/upload",
  //     options
  //   )
  //     .then((res) => res.json())
  //     .then((res) =>
  //       setState({
  //         imgURL: res.secure_url,
  //         imgAlt: res.original_filename,
  //       })
  //     )
  //     .catch((err) => console.log(err));
  //   console.log(image);
  //   console.log(data);
  // };

  // function handleOpenWidget() {
  // var myWidget = window.cloudinary.createUploadWidget(
  //   {
  //     cloudName: "ds0xop14b",
  //     uploadPreset: "eetbowkl",
  //   },
  //   (error, result) => {
  //     if (!error && result && result.event === "success") {
  //       // console.log("Done! Here is the image info: ", result.info);
  //       setImage({ ...image, image: result.info.secure_url });
  //       console.log(image);
  //     }
  //   }
  // );
  // myWidget.open();
  // }
  console.log(image);
  return (
    <div>
      {/* <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" onClick={uploadImage}>
        Submit
      </button> */}

      {/* {state.imgURL ? <img src={state.imgURL} alt={state.imgAlt} /> : null} */}

      {/* <button onClick={() => handleOpenWidget()}>Upload</button> */}

      {/* {image ? (
        <div key={image}>
          <img src={image.image} alt="laptop" />
        </div>
      ) : null} */}
    </div>
  );
}

export default TestUpload;
