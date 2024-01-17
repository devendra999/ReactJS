import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars, reviews }) => {
  console.log(stars, reviews);
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    // debugger;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <div className="icon-style mb-5">
      {ratingStar}
      <p className="revd">({reviews} customer reviews)</p>
    </div>
  );
};

export default Star;
