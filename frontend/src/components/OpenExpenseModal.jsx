import React from "react";
import "../styles/openExpenseModal.css";

/**
 * Popups displayed when you click on an expense on the expenses screen
 * @returns
 * @author Lawrence Jordan
 */
const OpenExpenseModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default OpenExpenseModal;
