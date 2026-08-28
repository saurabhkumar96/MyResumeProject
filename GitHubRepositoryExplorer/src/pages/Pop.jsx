import React, { useState } from 'react';
import Popup from '../components/Popup';


function Pop() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      
      {/* Trigger Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md hover:bg-blue-700 transition-all"
      >
        Open Popup
      </button>

      {/* Popup Instance */}
      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        title="Terms of Service"
      >
        <p>
          This is your popup's body text. You can add forms, images, or any other elements 
          here because it dynamically accepts React children components!
        </p>
      </Popup>

    </div>
  );
}

export default Pop;
