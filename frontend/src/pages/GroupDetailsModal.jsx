import React, { useEffect } from "react";
import "../styles/groupDetailsModal.css";

const GroupDetailsModal = ({ onClose, onCreateGroup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const groupName = e.target.elements["group-name"].value;
    const members = e.target.elements["members"].value.split(',').map(email => email.trim());
    const description = e.target.elements["description"].value;
    onCreateGroup(groupName, members,description);
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
          <h2 className="my-header pb-2.5 text-lg">Group Details</h2>
          {/* <label htmlFor="group-name">Group Name</label> */}
          <input
            className="mb-2"
            id="group-name"
            name="group-name"
            type="text"
            placeholder="Group Name"
            required
          />
          {/* <label htmlFor="members">Members</label> */}
          <input
            className="mb-2"
            id="members"
            name="members"
            type="text"
            placeholder="Members Emails (comma separated)"
            required
          />
          {/* <label htmlFor="description">Description</label> */}
          <textarea
            className="pl-2 pt-1 mb-7 rounded-md"
            id="description"
            name="description"
            placeholder="Description"
            required
          ></textarea>
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

export default GroupDetailsModal;
