import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import CSS!

function Toastify() {
    useEffect(()=>{
        toast.info("I am Using the JSONPlaceHolder API", {
            position: "top-right",
        })
    },[])

  return (
    <div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default Toastify;
