import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center justify-center place-content-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          onClick={() => setRating(star)}
          className={`cursor-pointer hover:text-yellow-300 h-16 w-16 rounded-full ${
            rating >= star ? "text-yellow-300" : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
};
