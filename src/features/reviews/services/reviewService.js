// src/services/reviewService.js

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Get reviews for a specific product
 * @param {string} productId - ID of the product
 * @returns {Promise<object>} - Reviews for the product
 */
export const getReviewsForProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/api/reviews/${productId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch reviews");
    }

    return data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

/**
 * Submit a review for a specific product
 * @param {string} productId - ID of the product
 * @param {string} reviewText - Text of the review
 * @param {number} rating - Rating out of 5
 * @param {string} userToken - User authentication token (JWT)
 * @returns {Promise<object>} - The created review
 */
export const submitReview = async (productId, reviewText, rating, userToken) => {
  try {
    const response = await fetch(`${API_URL}/api/reviews/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ reviewText, rating }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit review");
    }

    return data.review;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};