import styles from '../../css/ProfileCss/myReviews.module.css';
import ReviewCard from "./ReviewCard";
import image1 from "../../images/Breakfast.jpg";
import image2 from "../../images/Dinner.jpg";
import image3 from "../../images/Dessert.jpg";

const MyReviewsSection = () => {
    return (
        <div className={styles.profileSection}>
            <ReviewCard imageURL={image1} isPositive={false} reviewText="Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo." />
            <ReviewCard imageURL={image2} isPositive={true} reviewText="Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo." />
            <ReviewCard imageURL={image3} isPositive={true} reviewText="Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo." />
        </div>
    );
}

export default MyReviewsSection;
