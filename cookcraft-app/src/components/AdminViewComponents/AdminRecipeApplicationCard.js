import styles from "../../css/AdminPanelCss/admin-style.module.css";

const AdminRecipeApplicationCard = ( {data, onClick} ) => {
    const { recipeName, recipeCategory, recipeOrigin} = data

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    <strong>Recipe name:  </strong>  {recipeName}
                </h3>
                <p>
                    <strong>Category:</strong> {recipeCategory}
                </p>
                <p>
                    <strong>Origin:</strong> {recipeOrigin}
                </p>
            </div>
        </div>
    );
}

export default AdminRecipeApplicationCard