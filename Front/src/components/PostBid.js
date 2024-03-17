import React, { useState } from "react";
import "./PostBid.css";
import axios from "axios";
import { store } from "../App";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function PostBid({ onClose }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    endDateAndTime: "",
    cat: "",
  });
  const [token, setToken] = useContext(store);
  const [image,setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("endDateAndTime", product.endDateAndTime);
  formData.append("cat", product.cat);
  formData.append("image", image);
  // formData.append("posttime",Date.now)
  const handlePostBid = async (e) => {
    e.preventDefault(); // Prevent the default form submission
//     console.log(formData)

//     const formDataObject = {};
//     formData.forEach((value, key) => {
//       formDataObject[key] = value;
//     });

// console.log(formDataObject);
//     console.log(product)
    try {
      const response = await axios.post("http://localhost:5000/postauctionitem", formData, {
        headers: {
          "x-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(formData)
      if (response.status === 201) {
        alert("Item Saved Successfully");
        onClose();
        window.location.reload();
      } else {
        console.error("An error occurred while posting the auction item.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="post-bid-modal">
      <h2 className="post-title" style={{fontSize:"25px"}}>Post An Auction</h2>
      <div className="close-icon" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <form onSubmit={handlePostBid}> {/* Add onSubmit event handler to the form */}
        <label>Product Name</label>
        <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <label>Base Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          required
        />
        
        <label>Auction End Date and Time</label>
        <input
          type="datetime-local"
          name="endDateAndTime"
          value={product.endDateAndTime}
          onChange={handleInputChange}
          required
        />
        <label>Category</label>
        <input
          type="text"
          name="cat"
          value={product.cat}
          onChange={handleInputChange}
          required
        />
        <label>Upload Image</label>
        
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required/>
        <input className="post-product" type="submit" value="POST" /> {/* Use an input with type "submit" */}
      </form>
    </div>
  );
}

export default PostBid;
