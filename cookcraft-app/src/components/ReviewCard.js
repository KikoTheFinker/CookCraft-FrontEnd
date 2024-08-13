import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp as Like} from "@fortawesome/free-solid-svg-icons";
import {faThumbsDown as Dislike} from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({imageURL, isPositive, reviewText}) => {
    return <div className="recipe-card">
        <div className="recipe-img-container">
            <img alt="Image of the Recipe" src={imageURL} className="recipe-img"/>
        </div>
        <div className="recipe-description">
            <p>{reviewText}</p>
        </div>
        <div className="recipe-favorite-button">
            <span> <FontAwesomeIcon icon={isPositive ? Like : Dislike}/> </span>
        </div>
    </div>
};

export default ReviewCard;
