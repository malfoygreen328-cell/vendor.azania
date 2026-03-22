import React, { useState } from "react";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("azaniaToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in to submit a review.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product: productId, rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to submit review");
      } else {
        setComment("");
        setRating(5);
        onReviewSubmitted(); // callback to refresh reviews
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h4>Write a Review</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Rating:{" "}
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Comment: <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          cols="50"
          disabled={loading}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;