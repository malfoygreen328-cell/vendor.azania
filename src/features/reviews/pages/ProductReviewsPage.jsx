// src/features/products/pages/ProductReviewPage.jsx

import React, { useEffect, useState } from "react";
import ReviewList from "../../checkout/ReviewList"; // Path based on your folder structure
import ReviewForm from "../../checkout/ReviewForm"; // Path based on your folder structure

const ProductReviewPage = ({ productId }) => {
  const [product, setProduct] = useState(null);

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product); // Assume product data structure is correct
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.productDetails}>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} style={styles.productImage} />
        <p>{product.description}</p>
        <p>Price: R{product.price}</p>
      </div>

      {/* Reviews Section */}
      <div style={styles.reviewsSection}>
        <h2>Customer Reviews</h2>
        <ReviewList productId={productId} />
        <ReviewForm productId={productId} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  productDetails: {
    marginBottom: "30px",
    textAlign: "center",
  },
  productImage: {
    width: "300px",
    height: "auto",
    marginBottom: "10px",
  },
  reviewsSection: {
    marginTop: "40px",
  },
};

export default ProductReviewPage;