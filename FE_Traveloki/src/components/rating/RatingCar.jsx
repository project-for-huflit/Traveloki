import { useState } from 'react'
import {StarRating} from "./StarRating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const RatingCar = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log({ rating, feedback });
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 h-[50rem] translate-y-[30%]">
        <div className='flex '>
          <FontAwesomeIcon className='text-yellow-400 h-[32px] w-[32px]' icon={faStar}></FontAwesomeIcon>
          <h2 className="text-[24px] font-[20px] font-bold text-center mb-4 leading-[32px]">How did we do (car)?</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded mb-4 h-60"
            placeholder="What's your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
          />
          <StarRating rating={rating} setRating={setRating} />
          <button
            type="submit"
            className="w-full bg-[rgb(255,94,31)] text-white mt-8 p-2 rounded-3xl text-2xl font-bold text-center py-3 hover:opacity-[0.85]"
          >
            Submit
          </button>
        </form>
      </div>
    );
}
