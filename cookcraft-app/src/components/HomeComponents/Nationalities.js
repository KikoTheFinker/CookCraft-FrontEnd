import React from "react";
import Italian from "../../images/Italian.jpg";
import Japanese from "../../images/Japanese.jpg";
import Mexican from "../../images/Mexican.jpg";
import Indian from "../../images/Indian.jpg";
import styles from "../../css/HomeCss/nationalities.module.css";

function Nationalities() {
  return (
    <section className={styles.nationalities}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Popular Nationalities</h2>
        <div className={styles.nationalitiesList}>
          <div className={styles.nationality}>
            <img src={Italian} alt="Italian" />
            <p>Italian</p>
          </div>
          <div className={styles.nationality}>
            <img src={Mexican} alt="Mexican" />
            <p>Mexican</p>
          </div>
          <div className={styles.nationality}>
            <img src={Japanese} alt="Japanese" />
            <p>Japanese</p>
          </div>
          <div className={styles.nationality}>
            <img src={Indian} alt="Indian" />
            <p>Indian</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nationalities;
