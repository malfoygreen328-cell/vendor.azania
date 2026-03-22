// src/features/payouts/components/VendorPayout.js
import React, { useEffect, useState } from "react";

const VendorPayout = () => {
  const [payout, setPayout] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("azaniaToken");

  useEffect(() => {
    const fetchPayout = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/payouts/vendor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setPayout(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayout();
  }, []);

  const sendPayout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/payouts/vendor/send`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("Payout marked as sent!");
        setPayout({ ...payout, totalPayout: 0, orders: [] });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send payout");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!payout) return <p>No payout info available</p>;

  return (
    <div>
      <h2>Vendor Payout</h2>
      <p>Total Pending Payout: R{payout.totalPayout.toFixed(2)}</p>
      <button onClick={sendPayout} disabled={payout.totalPayout === 0}>
        Mark Payout as Sent
      </button>

      <h3>Orders:</h3>
      <ul>
        {payout.orders.map(order => (
          <li key={order._id}>
            Order #{order._id} - R{order.totalAmount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorPayout;