import React, { useEffect, useState } from 'react';
import BookingForm from '../Components/BookingForm';
import Loader from '../Components/Loader';

const BookOrder = () => {
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFormLoaded(true);
    }, 400); // Adjust the delay time as needed

    return () => clearTimeout(delay);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className='pt-20 h-screen'>
      {!formLoaded ? (
        <Loader /> // Display Loader while the BookingForm is loading
      ) : (
        <BookingForm />
      )}
    </div>
  );
};

export default BookOrder;
