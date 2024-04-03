import React, { useEffect } from "react";
import "../styles/groupDetailsModal.css";
const AddFriendsDetailsModal = ({ onClose, onCreateFriend }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const friendEmail = e.target.elements.email.value;
    onCreateFriend(friendEmail);
    console.log(friendEmail);
    onClose();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={handleModalContentClick}>
        <form onSubmit={handleSubmit}>
          <h2 className="my-header pb-2.5 text-lg">Friends Details</h2>
          {/* <label htmlFor="members">E-mail</label> */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <div className="buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendsDetailsModal;
