import React from "react";
import styles from "../../css/HomeCss/featuredRecipes.module.css"; 
import { useNavigate } from "react-router-dom";

function FeaturedRecipes() {
  const navigate = useNavigate();

  const handleRedirect = (event) => {
    const url = event.currentTarget.querySelector('img').getAttribute("alt");
    if (url) {
      navigate(url, {
        state: {
          fromHomepage: true
        },
      });
    }
  };

  return (
    <section className={styles.featuredRecipes}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Featured Recipes</h2>
        <div className={styles.recipeCards}>
          <div className={styles.recipeCard} onClick={handleRedirect}>
            <img 
              src="https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg" 
              alt="/recipes/83" 
            />
            <div className={styles.recipeInfo}>
              <h3 className={styles.recipeTitle}>Banana Pancakes</h3>
              <p>A delightful breakfast option.</p>
              <div className={styles.rating}>4.5 ★</div>
            </div>
          </div>
          <div className={styles.recipeCard} onClick={handleRedirect}>
            <img 
              src="https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg" 
              alt="/recipes/12" 
            />
            <div className={styles.recipeInfo}>
              <h3 className={styles.recipeTitle}>Chocolate Gateau</h3>
              <p>Rich and light chocolate indulgence.</p>
              <div className={styles.rating}>4.8 ★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedRecipes;
