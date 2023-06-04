import React from 'react';
import { ToastContainer } from 'react-toastify';

const ToastController = () => {
  return (
    <ToastContainer
      pauseOnHover={true}
      position={'top-right'}
      autoClose={3500}
      limit={5}
      newestOnTop={true}
    />
  );
};

export default ToastController;