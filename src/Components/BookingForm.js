import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    product: 'p1', // default value
    quantity: 1, // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Phone number must contain only digits');
      return;
    }

    // Validate quantity
    if (formData.quantity <= 0) {
      toast.error('Quantity must be a positive number');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Display toast on successful order placement
        toast.success('Order Placed Successfully');

        // Reset the form or perform any other actions after successful submission
        setFormData({
          name: '',
          address: '',
          phone: '',
          product: 'p1',
          quantity: 1,
        });
      } else {
        console.error('Failed to create order');
        toast.error('Failed to Place Order');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error Placing Order');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-4 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-2 text-center underline">Fill the Form for Booking Order</h2>
      <h3 className="text-xl font-semibold mb-1 text-center">Delivery Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
            Name of Person
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="address" className="block text-gray-600 font-medium mb-2">
            Address to Deliver
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">
            Phone No.
          </label>
          <input
            type="text" // Change to text type to allow only digits
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="product" className="block text-gray-600 font-medium mb-2">
            Product
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="p1">p1</option>
            <option value="p2">p2</option>
            <option value="p3">p3</option>
            <option value="p4">p4</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="quantity" className="block text-gray-600 font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#b76ff6] text-black py-2 px-4 mt-2 rounded-md hover:bg-[#9f3af7] transition duration-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BookingForm;
