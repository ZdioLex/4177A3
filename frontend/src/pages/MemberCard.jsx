// import "../styles/memberCard.css";
import { Link } from "react-router-dom";
import { IoMdRemoveCircle,IoMdAddCircle  } from "react-icons/io";


const MemberCard = ({ name, id, isMember, onRemove, onAdd, showActions }) => {
  const handleRemoveClick = () => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      onRemove(id);
    }
  };

  const handleAddClick = () => {
    if (window.confirm("Are you sure you want to add this member?")) {
      onAdd(id);
    }
  };

  return (
    <div className="bg-blue-900 text-white w-72 h-60 p-4 max-w-xs rounded-lg shadow-lg flex flex-col justify-between items-center hover:shadow-2xl transition-all duration-300 ease-in-out">
    <div className="text-2xl font-bold break-words">{name}</div>
      {isMember ? (
        showActions && (
          <button
            onClick={handleRemoveClick}
            className="flex items-center justify-center text-red-500 hover:text-red-600"
          >
            <IoMdRemoveCircle className="text-2xl mr-2 hover:text-red-600" /> Remove
          </button>
        )
      ) : (
        showActions && (
          <button
            onClick={handleAddClick}
            className="flex items-center justify-center text-green-500 hover:text-green-600"
          >
            <IoMdAddCircle className="text-2xl mr-2 hover:text-green-600" /> Add
          </button>
        )
      )}
    </div>
  );
};

export default MemberCard;