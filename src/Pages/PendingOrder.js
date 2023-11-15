import React, { useEffect, useState } from 'react';

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/getAllOrders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/completeOrder/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the orders after completing one
        fetchOrders();
      } else {
        console.error('Failed to complete order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 pt-20">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order No.</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{order.name}</td>
              <td className="py-2 px-4 border-b">{order.address}</td>
              <td className="py-2 px-4 border-b">{order.phone}</td>
              <td className="py-2 px-4 border-b">{order.product}</td>
              <td className="py-2 px-4 border-b">{order.quantity}</td>
              <td className="py-2 px-4 border-b">
              <button
                  onClick={() => handleCompleteOrder(order.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrder;
