import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

const CompletedOrder = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchCompletedOrders = async () => {
    try {
      const response = await fetch('https://order-manager-api.onrender.com/getAllCompletedOrders');
      if (response.ok) {
        const data = await response.json();
        setCompletedOrders(data);
      } else {
        console.error('Failed to fetch completed orders');
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
    fetchCompletedOrders();
  }, [location.search]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = completedOrders.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', pageNumber);
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6 pt-24">
      <h2 className="text-2xl font-semibold mb-4">Completed Orders</h2>

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
                  {/* <p className="mt-2 text-gray-500">
                Order Completed at: {order.completedAt ? new Date(order.completedAt).toLocaleString() : 'Not available'}
              </p> */}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            {Array.from({ length: Math.ceil(completedOrders.length / recordsPerPage) }, (_, i) => (
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
    </div>
  );
};

export default CompletedOrder;
