import React from "react";
import Breakfast from "../../images/Breakfast.jpg";
import Lunch from "../../images/Lunch.jpg";
import Dinner from "../../images/Dinner.jpg";
import Dessert from "../../images/Dessert.jpg";
import styles from "../../css/HomeCss/categories.module.css"; 
import { useNavigate } from "react-router-dom"; 


function Categories() {
  const navigate = useNavigate(); 
  
  const handleCategoriesClick = (category) => {
    console.log("Selected category:", category);
    navigate(`/recipes?category=${category}`);
  };
  

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Explore by Category</h2>
        <div className={styles.categoriesList}>
          <div className={styles.category} onClick={() => handleCategoriesClick('Breakfast')}>
            <img src={Breakfast} alt="Breakfast" />
            <p>Breakfast</p>
          </div>
          <div className={styles.category} onClick={() => handleCategoriesClick('Vegetarian')}>
            <img src={Lunch} alt="Vegetarian" />
            <p>Vegetarian</p>
          </div>
          <div className={styles.category} onClick={() => handleCategoriesClick('Chicken')}>
            <img src={Dinner} alt="Chicken" />
            <p>Chicken</p>
          </div>
          <div className={styles.category} onClick={() => handleCategoriesClick('Dessert')}>
            <img src={Dessert} alt="Desserts" />
            <p>Desserts</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
