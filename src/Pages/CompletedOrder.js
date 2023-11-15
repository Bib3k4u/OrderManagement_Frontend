// CompletedOrder.js
import React, { useEffect, useState } from 'react';

const CompletedOrder = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    // Fetch all completed orders from your server
    const fetchCompletedOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/getAllCompletedOrders');
        if (response.ok) {
          const data = await response.json();
          setCompletedOrders(data);
        } else {
          console.error('Failed to fetch completed orders');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCompletedOrders();
  }, []); // Run the effect only once on component mount

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 pt-20">
      <h2 className="text-2xl font-semibold mb-4">Completed Orders</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order No.</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {completedOrders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.name}</td>
              <td className="py-2 px-4 border-b">{order.address}</td>
              <td className="py-2 px-4 border-b">{order.phone}</td>
              <td className="py-2 px-4 border-b">{order.product}</td>
              <td className="py-2 px-4 border-b">{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedOrder;
