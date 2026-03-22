const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/vendor"
    : "https://api.azaniashop.com/api/v1/vendor";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("adminToken");

/**
 * Submit vendor registration with form data and files
 * @param {FormData} formData - FormData object containing fields and files
 * @returns {Promise<object>} - JSON response from server
 */
export const registerVendor = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      body: formData, // Must be FormData to handle files
    });

    return await response.json();
  } catch (error) {
    return { success: false, message: "Registration failed", error };
  }
};

/**
 * Fetch all vendor applications (admin only)
 * @returns {Promise<object>} - JSON response with vendor applications
 */
export const getVendorApplications = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/applications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch vendor applications");
    return response.json();
  } catch (error) {
    return { success: false, message: error.message || "Failed to fetch vendor applications" };
  }
};

/**
 * Fetch vendors with unpaid subscriptions (admin only)
 * @returns {Promise<object>} - JSON response with unpaid vendors
 */
export const getUnpaidVendors = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/unpaid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch unpaid vendors");
    return response.json();
  } catch (error) {
    return { success: false, message: error.message || "Failed to fetch unpaid vendors" };
  }
};

/**
 * Approve a vendor (admin only)
 * @param {string} vendorId
 * @returns {Promise<object>}
 */
export const approveVendor = async (vendorId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/${vendorId}/approve`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to approve vendor");
    return response.json();
  } catch (error) {
    return { success: false, message: error.message || "Failed to approve vendor" };
  }
};

/**
 * Decline a vendor (admin only)
 * @param {string} vendorId
 * @returns {Promise<object>}
 */
export const declineVendor = async (vendorId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/${vendorId}/decline`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to decline vendor");
    return response.json();
  } catch (error) {
    return { success: false, message: error.message || "Failed to decline vendor" };
  }
};

/**
 * Send an email to vendors (admin only)
 * @param {object} emailData - { to, subject, message }
 * @returns {Promise<object>}
 */
export const sendEmail = async (emailData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) throw new Error("Failed to send email");
    return response.json();
  } catch (error) {
    return { success: false, message: error.message || "Failed to send email" };
  }
};