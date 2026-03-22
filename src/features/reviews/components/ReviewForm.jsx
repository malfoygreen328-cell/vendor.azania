import React, { useEffect, useState } from "react";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/product/${productId}`);
        const data = await res.json();

        if (data.success) {
          setReviews(data.reviews);
          setAvgRating(data.avgRating);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div>
      <h3>
        Average Rating: {avgRating} / 5 ({reviews.length} reviews)
      </h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((review) => (
        <div
          key={review._id}
          style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
        >
          <p>
            <strong>{review.user.fullName}</strong> -{" "}
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
          <p>Rating: {"⭐".repeat(review.rating)}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;