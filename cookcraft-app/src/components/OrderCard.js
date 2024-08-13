import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown as Dislike, faThumbsUp as Like} from "@fortawesome/free-solid-svg-icons";

const OrderCard = () => {
    return <div className="order-card">
        <div className="order-description">
            <p>
                <strong>Order id:</strong> a7FS53l
                <strong>Location:</strong> Bul. Ilinden 103/6
                <strong>Delivery Person:</strong> Kristijan Petkov</p>
        </div>
        <div className="order-review-buttons">
            <span> <FontAwesomeIcon icon={Like} className="order-btn"/> </span>
            <span> <FontAwesomeIcon icon={Dislike} className="order-btn"/> </span>
        </div>
    </div>
}

export default OrderCard;