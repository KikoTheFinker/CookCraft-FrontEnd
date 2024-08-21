import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from "../../css/HomeCss/hero.module.css";
import { useNavigate } from 'react-router-dom';
function Hero() {
  const categories = ["Breakfast", "Vegetarian", "Chicken", "Desserts", "Beef", "Side", "Seafood"];
  const nationalities = ["Italian", "Mexican", "Japanese", "Indian", "Greek", "British", "Egyptian"];
  const ingredients = [
    "Chicken", "Beef", "Vegetarian", "Seafood", "Tomatoes", "Potatoes", "Garlic", "Onions"
  ];

  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
  const [dropzoneItems, setDropzoneItems] = useState([]);

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isNationalityDropdownOpen, setIsNationalityDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select category");
  const [selectedNationality, setSelectedNationality] = useState("Select nationality");

  const navigate = useNavigate();


  const handleIngredientSearch = (e) => {
    const filter = e.target.value.toLowerCase();
    setFilteredIngredients(
      ingredients.filter((ingredient) => ingredient.toLowerCase().includes(filter))
    );
  };

  const addToDropzone = (ingredient) => {
    if (!dropzoneItems.includes(ingredient)) {
      setDropzoneItems([...dropzoneItems, ingredient]);
    } else {
      removeFromDropzone(ingredient); 
    }
  };

  const removeFromDropzone = (ingredient) => {
    setDropzoneItems(dropzoneItems.filter(item => item !== ingredient));
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("Select category"); 
    } else {
      setSelectedCategory(category);
    }
    setIsCategoryDropdownOpen(false);
  };

  const handleNationalityClick = (nationality) => {
    if (selectedNationality === nationality) {
      setSelectedNationality("Select nationality");
    } else {
      setSelectedNationality(nationality);
    }
    setIsNationalityDropdownOpen(false);
  };

  const handleSearchClick = () => {
    const searchParams = new URLSearchParams();
    if (selectedCategory !== "Select category") {
      searchParams.set('category', selectedCategory);
    }
    if (selectedNationality !== "Select nationality") {
      searchParams.set('nationality', selectedNationality);
    }
    navigate(`/recipes?${searchParams.toString()}`);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>Discover Delicious Recipes</h1>
        <p className={styles.heroSubtitle}>Explore the best recipes from around the world.</p>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search for recipes..." className={styles.searchInput} />
          <button className={styles.searchButton} onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className={styles.filterContainer}>
          <div
            className={styles.filterGroup}
            onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            onMouseLeave={() => setIsCategoryDropdownOpen(false)}
          >
            <label htmlFor="category-filter">Category:</label>
            <div className={styles.dropdown}>
              <button className={styles.dropdownButton} id="category-filter">
                {selectedCategory}
              </button>
              {isCategoryDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className={`${styles.dropdownItem} ${selectedCategory === category ? styles.selected : ''}`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.filterGroup}
            onMouseEnter={() => setIsNationalityDropdownOpen(true)}
            onMouseLeave={() => setIsNationalityDropdownOpen(false)}
          >
            <label htmlFor="nationalities-filter">Nationality:</label>
            <div className={styles.dropdown}>
              <button className={styles.dropdownButton} id="nationalities-filter">
                {selectedNationality}
              </button>
              {isNationalityDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {nationalities.map((nationality, index) => (
                    <div
                      key={index}
                      className={`${styles.dropdownItem} ${selectedNationality === nationality ? styles.selected : ''}`}
                      onClick={() => handleNationalityClick(nationality)}
                    >
                      {nationality}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filterGroup}>
            <label htmlFor="ingredients-filter">Ingredients:</label>
            <div className={styles.searchInputContainer}>
              <input
                type="text"
                placeholder="Search ingredients..."
                onChange={handleIngredientSearch}
                className={styles.searchIngredientsInput}
              />
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            </div>
            <div className={styles.ingredientSelection}>
              <div className={styles.ingredientList}>
                {filteredIngredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className={styles.ingredientItem}
                    onClick={() => addToDropzone(ingredient)}
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
              <div className={styles.ingredientDropzone}>
                {dropzoneItems.length === 0 ? (
                  <p className={styles.dropzonePlaceholder}>Click ingredients to add them, or click to remove...</p>
                ) : (
                  dropzoneItems.map((ingredient, index) => (
                    <div
                      key={index}
                      className={styles.tag}
                      onClick={() => removeFromDropzone(ingredient)}
                    >
                      {ingredient} ×
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
