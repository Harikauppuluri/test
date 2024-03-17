

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuctionItemCard.css";

const AuctionItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleBidClick = () => {
    // Navigate to the ItemPage with the itemId as a route parameter
    console.log(item);
    navigate(`/item/${item._id}`, { state: { item } });

  };
  return (
    <div className="auction-item-card">
      {/* ... (other code remains the same) */}
      <div className="image-container" style={{ width: "1080px", height: "300px" }}>
        <img src={"http://localhost:5000/uploads/" + item.image} alt={item.name}  />
      </div>
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="price">Price: ₹{item.price}</p>
        <p className="description">{item.description}</p>
        {/* <button className="bid-button" onClick={handleBidClick}>BID</button> */}
        <button className="" onClick={handleBidClick}>
            <div class="svg-wrapper-1">
        
              <div class="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>BID NOW</span>
        </button>

      </div>
    </div>
  );
};

export default AuctionItemCard;

