import "../styles/groupCard.css";
import { Link } from "react-router-dom";


const FriendCard = ({ userId, friendId,friendName }) => {
  return (
    <Link className="group-card" to={`/${userId}/${friendId}/profile`}>
      {friendName}
    </Link>
  );
};

export default FriendCard;
