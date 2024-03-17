import React, { useEffect, useState } from "react";
import "./Account.css";
import { useContext } from "react";
import axios from "axios";
import { store } from "../App";
import { useNavigate } from "react-router-dom";
import PostBid from "../components/PostBid";
import Navbar from "../components/Navbar";
import AuctionItemCard from "../components/AuctionItemCard";
import { ring } from 'ldrs'

function Account({ nav }) {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [auctionsLoading, setAuctionsLoading] = useState(true);
  const [Auctions, setAuctions] = useState([]);
  const [isPostBidModalOpen, setPostBidModalOpen] = useState(false);

  useEffect(() => {
    setAuctionsLoading(true);

    axios
      .get("http://localhost:5000/account", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/auctionitems")
      .then((res) => {
        setAuctions(res.data);
        setAuctionsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token]);

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      {data && (
        <div>
          <h1 className="hero-title">
            Hello! <span>{data.name}</span>
          </h1>

          {auctionsLoading ? (
            
            <div className="loading-container">
    <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="#75ec97" />
  </div>
            
          ) : (
            <div className="auction-item-cards">
              {Auctions.map((item, index) => (
                <AuctionItemCard key={item._id} item={item} />
              ))}
            </div>
          )}

          <button
            className="button-stick"
            onClick={() => setPostBidModalOpen(true)}
          >
            POST AUCTION
          </button>
          {isPostBidModalOpen && (
            <div className="modal-overlay">
              <PostBid onClose={() => setPostBidModalOpen(false)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
