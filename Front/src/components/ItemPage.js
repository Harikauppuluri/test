import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { store } from "../App";
import { useContext } from "react";
import "./ItemPage.css";
import moment from "moment";

const ItemPage = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const item = location.state.item;
  const [token] = useContext(store);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bidprice, setBidPrice] = useState(0);
  const [error, setError] = useState(false);
  const [pp, setPresentPrice] = useState(item.presentprice);
  const [bids, setBids] = useState([]);

  const endTime = new Date(item.time);
  const imageurl = `http://localhost:5000/uploads/${item.image}`;
  const formatTimeRemaining = () => {
    const timeRemaining = endTime - currentTime;
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const formattedTimeRemaining = formatTimeRemaining();

  const handleOnChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleBid = async (e) => {
    e.preventDefault();
    if (bidprice > pp) {
      try {
        const response = await axios.post(
          "http://localhost:5000/biddata",
          {
            bidprice,
            itemId: item._id,
          },
          {
            headers: {
              "x-token": token,
            },
          }
        );

        if (response.status === 201) {
          setError(false);
          alert("Bidded successfully");
          window.location.reload();
        } else {
          console.error("Error submitting bid:", response.data.error);
        }
      } catch (error) {
        console.error("Error submitting bid:", error);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedItemResponse = await axios.get(
          `http://localhost:5000/item/${item._id}`
        );
        const updatedItem = updatedItemResponse.data[0];
        setPresentPrice(updatedItem.bidprice);

        const bidsResponse = await axios.get(
          `http://localhost:5000/item/${item._id}`
        );
        setBids(bidsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchData();

    return () => clearInterval(intervalId);
  }, [item._id]);

  const getHighestBid = () => {
    if (bids.length > 0) {
      const highestBid = bids.reduce((prev, current) =>
        prev.bidprice > current.bidprice ? prev : current
      );

      return highestBid;
    }

    return null;
  };

  const highestBid = getHighestBid();


  
  return (
    <>
      <div className="main">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={imageurl} alt={item.name} />
            </div>
            <div className="flip-card-back">
              <p>
                <h4>Product Description:</h4>
                <span>{item.description}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="right">
          <h1>{item.name}</h1>
          <div>
            <table className="product-info">
              <tbody>
                <tr>
                  <td>
                    <p>
                      <h4>Status</h4>Started
                    </p>
                  </td>
                  <td>
                    <p>
                      <h4>Number of Bids</h4>{bids.length}
                    </p>
                  </td>
                  <td>
                    <p>
                    <h4>Time Remaining</h4>
              <p>
                {formattedTimeRemaining.hours}h {formattedTimeRemaining.minutes}m{" "}
                {formattedTimeRemaining.seconds}s
              </p>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <h4>Base Price</h4>₹{item.price}
                    </p>
                  </td>
                  <td>
                    <p>
                      <h4>Post Time</h4>{moment(item.posttime).format('DD-MM-YYYY HH:mm:ss')}
                    </p>
                  </td>
                  <td>
                    <p>
                      <h4>Seller</h4>
                      {item._Id}Vijay Lingoju
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {currentTime < new Date(item.time) ? (
            <>
            <div className="input-group">
            <input
              placeholder="Enter Amount"
              type="number"
              id="input-field"
              onChange={handleOnChange}
            />
            <button className="cssbuttons-io-button" onClick={handleBid}>
              Continue with ₹{bidprice}
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          {error && (
            <p className="errormsg">
              The bidding amount must be greater than {pp}
            </p>
          )}
           <span className="ppspan"><h4 className="pptxt">Present Price: <span>₹{pp}</span></h4></span>
            </>
          
           ): (
            <div className="auction-completed">
            <p>Auction has completed</p>
            {highestBid ? (
              <p>
                Highest Bid: ₹{highestBid.bidprice} by {highestBid.mail}
              </p>
            ) : (
              <p>No bids were placed</p>
            )}
          </div>
          )}
        </div>
      </div>

      <div className="bid-details" >
        <h2>Bidding History</h2>
       
          {bids ? (
           <table border={1} className="tablebiddata">
          
           <thead>
             <tr>
               <th>Bid Price</th>
               <th>User Email</th>
               <th>Time</th>
             </tr>
           </thead><tbody>
            {bids.map((bid) => (
              <tr key={bid._id}>
                <td>₹{bid.bidprice}</td>
                <td>{bid.mail}</td>
                <td>{moment(bid.time).format('DD-MM-YYYY HH:mm:ss')}</td>
                
              </tr>
            ))}
          </tbody> </table>):(<p className="loading">Loading...</p>)}
          
        
      </div>
    </>
  );
};

export default ItemPage;
