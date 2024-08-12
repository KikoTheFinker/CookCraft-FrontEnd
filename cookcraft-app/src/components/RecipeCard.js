import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart  } from '@fortawesome/free-regular-svg-icons';

const RecipeCard = ( {imageURL} ) => {
    return <div className="recipe-card">
        <div className="recipe-img-container">
                <img src={imageURL} className="recipe-img"/>
        </div>
        <div className="recipe-description">
            <p>Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo.</p>
        </div>
        <div className="recipe-favorite-button">
            <span> <FontAwesomeIcon icon={faSolidHeart}/> </span>
        </div>
    </div>
}

export default RecipeCard