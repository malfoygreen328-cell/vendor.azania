import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("checking");
  const [attempts, setAttempts] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const verifyPayment = async () => {
      const token = localStorage.getItem("azaniaToken");
      const orderId = localStorage.getItem("lastOrderId");

      if (!orderId) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/orders/${orderId}/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.status === "paid") {
          setStatus("paid");

          // ✅ cleanup
          localStorage.removeItem("cart");
          localStorage.removeItem("lastOrderId");
        } else {
          // 🔁 Retry up to 5 times (IPN delay handling)
          if (attempts < 5) {
            setTimeout(() => {
              setAttempts((prev) => prev + 1);
            }, 2000);
          } else {
            setStatus("pending");
          }
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [attempts, API_URL]); // ✅ Added API_URL to dependencies

  /* =============================
     UI STATES
  ============================= */

  if (status === "checking") {
    return (
      <div style={styles.container}>
        <h2>🔄 Verifying your payment...</h2>
        <p>Please wait while we confirm your transaction.</p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div style={styles.container}>
        <h2>⏳ Payment Processing</h2>
        <p>Your payment is still being confirmed.</p>
        <p>Please refresh in a moment or check your orders.</p>

        <Link to="/dashboard/orders" style={styles.button}>
          View Orders
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={styles.container}>
        <h2>❌ Verification Failed</h2>
        <p>We couldn't verify your payment.</p>

        <Link to="/dashboard/orders" style={styles.button}>
          Go to Orders
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>✅ Payment Successful</h1>
      <p>Your payment has been verified successfully.</p>

      <Link to="/dashboard/orders" style={styles.button}>
        View Your Orders
      </Link>
    </div>
  );
};

/* =============================
   STYLES (Bottle Green Theme)
============================= */

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 20px",
    background: "#043927",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
  },
};

export default PaymentSuccess;