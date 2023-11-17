import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Components/Loader';

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [loadingStates, setLoadingStates] = useState({}); // Separate loading state for each order
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://order-manager-api.onrender.com/getAllOrders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        // Initialize loading states for each order
        const initialLoadingStates = data.reduce((acc, order) => {
          acc[order.id] = false;
          return acc;
        }, {});
        setLoadingStates(initialLoadingStates);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1;
    setCurrentPage(parseInt(page, 10));
    fetchOrders();
  }, [location.search]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', pageNumber);
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      setLoadingStates((prevLoadingStates) => ({ ...prevLoadingStates, [orderId]: true }));

      const response = await fetch(`https://order-manager-api.onrender.com/completeOrder/${orderId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Refresh the orders after completing one
        fetchOrders();
        // Show toast notification
        toast.success('Order Completed Successfully');
      } else {
        console.error('Failed to complete order');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({ ...prevLoadingStates, [orderId]: false }));
    }
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6 pt-24">
      <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>

      {loading && <Loader />} {/* Display Loader while data is being fetched */}

      {!loading && (
        <>
          {currentRecords.map((order, index) => (
            <div key={order.id} className="mb-4 p-4 bg-white border border-gray-300">
              <h3 className="text-lg font-semibold mb-2">Order No. {index + 1 + indexOfFirstRecord}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1">
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p className="mb-1">
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                </div>
                <div>
                  <p className="mb-1">
                    <strong>Product:</strong> {order.product}
                  </p>
                  <p className="mb-1">
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-gray-500">Order Placed at: {new Date(order.createdAt).toLocaleString()}</p>
              <button
                onClick={() => handleCompleteOrder(order.id)}
                className="bg-[#b76ff6] text-black py-2 px-4 mt-2 rounded-md hover:bg-[#9f3af7] transition duration-300"
                disabled={loadingStates[order.id]}
              >
                {loadingStates[order.id] ? 'Completing...' : 'Mark as Completed'}
              </button>
            </div>
          ))}

          <div className="flex justify-center">
            {Array.from({ length: Math.ceil(orders.length / recordsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === i + 1 ? 'bg-[#b76ff6] text-black' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default PendingOrder;
