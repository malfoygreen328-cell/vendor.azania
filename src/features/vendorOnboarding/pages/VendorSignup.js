import { useState } from "react";
import "./VendorSignup.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1/vendor";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  businessName: "",
  registrationNumber: "",
  taxNumber: "",
  businessType: "",
  subscription: "BASIC",
};

const initialFiles = {
  registrationCert: null,
  directorId: null,
  proofOfAddress: null,
};

const VendorSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState(initialFiles);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.password.trim()) newErrors.password = "Password is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
      if (!formData.businessType.trim()) newErrors.businessType = "Business type is required";
    }

    if (step === 3) {
      if (!files.registrationCert) newErrors.registrationCert = "Registration certificate required";
      if (!files.directorId) newErrors.directorId = "Director ID copy required";
      if (!files.proofOfAddress) newErrors.proofOfAddress = "Proof of address required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      // Append files
      data.append("registrationCert", files.registrationCert);
      data.append("directorId", files.directorId);
      data.append("proofOfAddress", files.proofOfAddress);

      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Registration failed");

      setMessage("✅ Vendor application submitted successfully! Waiting for admin approval.");

      // Reset form
      setStep(1);
      setFormData(initialFormData);
      setFiles(initialFiles);
      setErrors({});
    } catch (error) {
      setMessage("❌ " + (error.message || "Registration failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-[#004225] mb-3 text-center">
          Become an Azania Vendor
        </h2>

        <div className="reminder-box mb-4">
          Friendly Reminder: This marketplace only accepts <strong>local clothing brands</strong>, including <strong>fashion apparel, shoes, and accessories</strong>.
        </div>

        <div className="reminder-box mb-5">
          🎉 <strong>Launch Offer:</strong> All new vendors receive a <strong>90-day free trial</strong>.
        </div>

        {message && (
          <p className={`text-center text-sm mb-4 ${message.includes("❌") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3 className="font-semibold mb-4">Account Information</h3>
            <input className="input" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

            <input className="input mt-3" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input className="input mt-3" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <input className="input mt-3" type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            <button onClick={nextStep} className="btn-primary mt-6 w-full">Continue</button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3 className="font-semibold mb-4">Business Details</h3>
            <input className="input" name="businessName" placeholder="Registered Business Name" value={formData.businessName} onChange={handleChange} />
            {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}

            <input className="input mt-3" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} />
            {errors.registrationNumber && <p className="text-red-500 text-sm">{errors.registrationNumber}</p>}

            <input className="input mt-3" name="taxNumber" placeholder="Tax Number (Optional)" value={formData.taxNumber} onChange={handleChange} />

            <input className="input mt-3" name="businessType" placeholder="Business Type" value={formData.businessType} onChange={handleChange} />
            {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}

            <h3 className="font-semibold mt-6 mb-2">Choose Subscription Plan</h3>
            <select name="subscription" value={formData.subscription} onChange={handleChange} className="input">
              <option value="BASIC">BASIC – R150/month (Up to 50 products)</option>
              <option value="PREMIUM">PREMIUM – R380/month (Up to 1000 products)</option>
              <option value="COMMISSION">COMMISSION – 10% per sale (Unlimited products)</option>
            </select>

            <div className="flex gap-3 mt-6">
              <button onClick={prevStep} className="btn-secondary w-full">Back</button>
              <button onClick={nextStep} className="btn-primary w-full">Continue</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h3 className="font-semibold mb-4">Upload Required Documents</h3>

            <label className="block mb-2">Business Registration Certificate</label>
            <input type="file" name="registrationCert" className="file-input mb-2" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
            {errors.registrationCert && <p className="text-red-500 text-sm">{errors.registrationCert}</p>}

            <label className="block mt-3 mb-2">Director ID Copy</label>
            <input type="file" name="directorId" className="file-input mb-2" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
            {errors.directorId && <p className="text-red-500 text-sm">{errors.directorId}</p>}

            <label className="block mt-3 mb-2">Proof of Address</label>
            <input type="file" name="proofOfAddress" className="file-input mb-2" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
            {errors.proofOfAddress && <p className="text-red-500 text-sm">{errors.proofOfAddress}</p>}

            <div className="flex gap-3 mt-6">
              <button onClick={prevStep} className="btn-secondary w-full">Back</button>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full">
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorSignup;