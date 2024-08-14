import React from "react";
import Waffles from "../../images/Waffles.jpg";
import Pancakes from "../../images/Pancakes.jpg";
import styles from "../../css/featuredRecipes.module.css"; 

function FeaturedRecipes() {
  return (
    <section className={styles.featuredRecipes}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Featured Recipes</h2>
        <div className={styles.recipeCards}>
          <div className={styles.recipeCard}>
            <img src={Waffles} alt="Golden Crisp Waffles" />
            <div className={styles.recipeInfo}>
              <h3 className={styles.recipeTitle}>Golden Crisp Waffles</h3>
              <p>A delightful breakfast option.</p>
              <div className={styles.rating}>4.8 ★</div>
            </div>
          </div>
          <div className={styles.recipeCard}>
            <img src={Pancakes} alt="Classic Pancakes" />
            <div className={styles.recipeInfo}>
              <h3 className={styles.recipeTitle}>Classic Pancakes</h3>
              <p>Fluffy and light pancakes.</p>
              <div className={styles.rating}>4.5 ★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedRecipes;
