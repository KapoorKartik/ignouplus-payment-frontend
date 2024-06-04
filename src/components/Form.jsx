import React, { useState } from 'react';

const MyForm = ({handleSubmit}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
    state: '',
    amount: '',
    product: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Invalid mobile number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Pincode validation
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Invalid pincode';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    // Product validation
    if (!formData.product.trim()) {
      newErrors.product = 'Product is required';
    }
    // Amount validation
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.amount.trim())) {
      newErrors.amount = 'Invalid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [disable, setDisable] = useState(false)

  const handleSubmitChild = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // You can handle form submission here
      setDisable(true)
      handleSubmit(formData)
      setTimeout(() => {
      setDisable(false)
      }, 2000);

    }
  };

  const statesAndUTs = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  return (
      <form onSubmit={handleSubmitChild}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="text" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
          {errors.amount && <div className="text-danger">{errors.amount}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">Product</label>
          <select className="form-select" id="product" name="product" value={formData.product} onChange={handleChange}>
            <option value="">--Select--</option><option value="PDF (Send on WhatsApp)">PDF (Send on WhatsApp)</option>
            <option value="Handwritten (Send through Parcel)">Handwritten (Send through Parcel)</option>
          </select>
          {errors.product && <div className="text-danger">{errors.product}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile Number</label>
          <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
          {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea className="form-control" id="address" name="address" value={formData.address} onChange={handleChange}></textarea>
          {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input type="text" className="form-control"  id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
          {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <select className="form-select" id="state" name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State/UT</option>
            {statesAndUTs.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <div className="text-danger">{errors.state}</div>}
        </div>
          

        <div className=''>
        <button type="submit" className="btn btn-primary w-50" disabled={disable} >Pay ₹ {formData.amount || "0"}</button>
        <img id="fin-logo" alt="pay-methods" src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png" width="180"/>
        </div>
      </form>
  );
};

export default MyForm;
