import React, { useState } from "react";
import PayfastButton from "./PayfastButton";

const CheckoutPage = () => {
  const [orderId, setOrderId] = useState(null);

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const createOrder = async () => {
    const token = localStorage.getItem("azaniaToken");

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [], // 🔴 connect your cart here
          totalAmount: 100, // 🔴 replace with real value
          shippingAddress: "Vendor Checkout",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Order failed");
        return;
      }

      setOrderId(data.order._id);

    } catch (err) {
      console.error(err);
      alert("Failed to create order");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>

      {!orderId ? (
        <button onClick={createOrder}>
          Create Order
        </button>
      ) : (
        <PayfastButton orderId={orderId} />
      )}
    </div>
  );
};

export default CheckoutPage;