import React from "react";
import "../styles/modal.css"; // You'll create this CSS file for styling


const Modal = ({ isOpen, onClose, children }) => {
 if (!isOpen) return null;


 return (
   <div className="modal-overlay">
     <div className="modal-content">
       {children}
     </div>
   </div>
 );
};


export default Modal;
