import { FC, useState } from "react";
import styles from './index.module.css'
import ButtonHero from "@/ui/ButtonHero/ButtonHero";

interface Props {
  maxRate?: number,
  select?: number,
  handleClick: VoidFunction | ((rateCount: number) => void)
}

const StarRating: FC<Props> = ({ maxRate = 10, select = 0, handleClick}) => {
  const [rating, setRating] = useState(select);
  const [hover, setHover] = useState(0);
  function chooseStar(count: number) {
    setRating(count);
    handleClick(count);
  }

  return (
    <div className={styles.stars}>
      {[...Array(maxRate)].map((_, index) => {
        const starCount = index + 1;

        return (
          <svg 
            key={index}
            onClick={() => chooseStar(starCount)}
            onMouseEnter={() => setHover(starCount)}
            onMouseLeave={() => setHover(0)}
            fill={(hover || rating) >= starCount ? "#facc15" : "none"}
            width="19" height="18" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.50016 1.58337L11.9464 6.53921L17.4168 7.33879L13.4585 11.1942L14.3927 16.6409L9.50016 14.068L4.60766 16.6409L5.54183 11.1942L1.5835 7.33879L7.05391 6.53921L9.50016 1.58337Z" stroke="#facc15" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      })}
      {rating > 0 && <ButtonHero noBg onClick={() => chooseStar(0)}>Delete</ButtonHero>}
    </div>
  );
};

export default StarRating;