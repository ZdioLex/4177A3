import "../styles/groupCard.css";
import { Link } from "react-router-dom";

// GroupCard.jsx
const GroupCard = ({ userId, groupId, groupName }) => {
  return (
    <Link className="group-card" to={`/${userId}/${groupId}`}>
      {groupName}
    </Link>
  );
};

export default GroupCard;
