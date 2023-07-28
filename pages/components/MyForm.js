import React, { useState, useEffect, useRef } from "react";


const MyForm = () => {
  const [textBoxValue, setTextBoxValue] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [time, setTime] = useState('');
  const [correctFormat, setCorrectFormat] = useState(true);
  const imageInputRef= useRef(null);

  const handleInputChange = (event) => {
    setTextBoxValue(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCorrectFormat(true); // Reset the correctFormat state before further checks

    // Check if the image is in JPEG or PNG format
    const isCorrectFormat =
      file.type === "image/jpeg" || file.type === "image/png";

    if (isCorrectFormat) {
      setImageFile(file);

    } else {
      setCorrectFormat(false);
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = null;

    if (textBoxValue === "") {
      alert("Your comment cannot be empty");
    } else {
      console.log(imageFile)
      const formData = new FormData();
      if (imageFile) {

        formData.append("image", imageFile);
        formData.append('upload_preset', 'my-uploads')
        console.log(formData)

        const data = await fetch('https://api.cloudinary.com/v1_1/dksurn366/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    console.log(data.secure_url);
      }

      sendDataToBackend(textBoxValue, url);
      setTextBoxValue("");
      setImageFile(null);
      alert("Comment submitted!");
    }
  };




  const sendDataToBackend = (content, image) => {
  const data = { content, image };

  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend if needed
      console.log("Data successfully sent to the backend", data);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error sending data to the backend", error);
    });
};


  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: "0 20px" }}>
        <textarea
          value={textBoxValue}
          onChange={handleInputChange}
          placeholder="Please Enter Your Comment"
          rows={10}
          cols={130}
        ></textarea>
        <input type="file" ref= {imageInputRef} onChange={handleImageChange} />
        {correctFormat ? null : <p style={{color:"red"}}>Please upload an image in JPEG or PNG format.</p>}
        <button
          type="submit"
          style={{
            appearance: "none",
            background: "none",
            border: "none",
            outline: "none",
            cursor: "pointer",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            color: "#ffffff",
            backgroundColor: "#007bff",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
        >
          comment
        </button>
      </form>
      <h4> Notice for Commenting: </h4>
      <ol>
        <li> Do not post illegal or prohibited content in the comments. </li>
        <li>
          {" "}
          Refrain from engaging in personal attacks, regional discrimination,
          spamming, or any other malicious behavior, including advertisements.
        </li>
        <li> All comments represent the views of the respective users and not the website's stance. </li>
        <li> Comments submitted by users will be displayed after being reviewed by administrators. </li>
        <li> In case of any issues with the website, please leave us a message through comments.</li>
      </ol>
    </>
  );
};

export default MyForm;
