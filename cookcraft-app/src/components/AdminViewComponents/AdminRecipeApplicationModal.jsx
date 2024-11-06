import styles from "../../css/AdminPanelCss/modal-style.module.css";

const AdminRecipeApplicationModal = ({ isOpen, onClose, setReload, recipeApplicationData }) => {
    if(!isOpen) return null;

    const { recipeName, recipeDesc, recipeCategory, recipeOrigin, recipeMealThumb, recipeYoutubeURL, ingredients } = recipeApplicationData

    const handleAccept = async () => {
        const token = localStorage.getItem("token");
        const { id } = recipeApplicationData;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/recipeapplication/accept/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if(response.ok)
            {
                await handleDecline();
            }
            else
            {
                alert(response.status);
            }
        }
        catch (error) {
            console.log("some error occured bruv")
            console.error(error);
        }
    }

    const handleDecline = async () => {
        const token = localStorage.getItem("token");
        const { id } = recipeApplicationData;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/recipeapplication/decline/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if(response.ok) {
                setReload(true);
                onClose();
            }
            else
            {
                alert(response.status);
            }
        }
        catch (error)
        {
            console.error(error);
            alert("Some error occurred while connecting with the server")
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Recipe Details</h2>

                <p><strong>Name:</strong> {recipeName} </p>
                <p><strong>Category:</strong> {recipeCategory} </p>
                <p><strong>Origin:</strong> {recipeOrigin}</p>
                <p><strong>Youtube Video URL:</strong> {recipeYoutubeURL} </p>
                <p><strong>Image URL:</strong> {recipeMealThumb}</p>
                <p><strong>Description:</strong> {recipeDesc} </p>
                <h3>Recipe Ingredients:</h3>
                <ul>
                    {ingredients.map(ingredient => {
                        return (
                            <li>
                                {ingredient.ingredient} - {ingredient.dose}
                            </li>
                        )
                    })}
                </ul>
                <div className={styles.buttons}>
                    <button className={styles.buttonAccept} onClick={handleAccept}>Accept</button>
                    <button className={styles.buttonDecline} onClick={handleDecline}>Decline</button>
                </div>
            </div>
        </div>
    );
}

export default AdminRecipeApplicationModal;