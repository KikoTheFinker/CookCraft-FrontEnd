import React from "react";
import Breakfast from "../../images/Breakfast.jpg";
import Lunch from "../../images/Lunch.jpg";
import Dinner from "../../images/Dinner.jpg";
import Dessert from "../../images/Dessert.jpg";
import styles from "../../css/HomeCss/categories.module.css"; 

function Categories() {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Explore by Category</h2>
        <div className={styles.categoriesList}>
          <div className={styles.category}>
            <img src={Breakfast} alt="Breakfast" />
            <p>Breakfast</p>
          </div>
          <div className={styles.category}>
            <img src={Lunch} alt="Lunch" />
            <p>Lunch</p>
          </div>
          <div className={styles.category}>
            <img src={Dinner} alt="Dinner" />
            <p>Dinner</p>
          </div>
          <div className={styles.category}>
            <img src={Dessert} alt="Desserts" />
            <p>Desserts</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
