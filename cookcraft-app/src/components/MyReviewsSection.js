import ReviewCard from "./ReviewCard";
import image1 from "../images/gokiTestImages/dish1.jpg";
import image2 from "../images/gokiTestImages/dish2.jpg";
import image3 from "../images/gokiTestImages/dish3.jpg";

const MyReviewsSection = () => {
    return <div className="profile-section">
        <ReviewCard imageURL={image1} isPositive={false} reviewText="Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo."/>
        <ReviewCard imageURL={image2} isPositive={true} reviewText="Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo."/>
        <ReviewCard imageURL={image3} isPositive={true} reviewText="Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo."/>
    </div>
}

export default MyReviewsSection