import React, { useState } from "react";

const PayfastButton = ({ orderId }) => {
  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handlePayment = async () => {
    const token = localStorage.getItem("azaniaToken");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!orderId) {
      alert("Invalid order");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/payfast/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();

      if (!res.ok || !data.payfastUrl) {
        alert(data.message || "Payment failed");
        console.error("PayFast error:", data);
        return;
      }

      // ✅ IMPORTANT: Store orderId for verification later
      localStorage.setItem("lastOrderId", orderId);

      // 🚀 Redirect to PayFast
      window.location.href = data.payfastUrl;

    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      style={{
        padding: "12px 20px",
        background: "#043927",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? "Redirecting..." : "Pay with PayFast"}
    </button>
  );
};

export default PayfastButton;