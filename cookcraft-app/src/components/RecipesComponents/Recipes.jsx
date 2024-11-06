import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../css/RecipesCss/recipe-style.module.css';
import Header from '../HomeComponents/Header';
import Footer from '../HomeComponents/Footer';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const getSearchParams = (location) => {
    const searchParams = new URLSearchParams(location.search);
    const nationality = searchParams.get('nationality');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page'), 10);
    const productIds = searchParams.getAll('productId').map(id => parseInt(id));
    const searchTerm = searchParams.get('searchTerm');
    
    return {
      nationality,
      category,
      page: isNaN(page) ? 0 : page,
      productIds,
      searchTerm,
    };
  };
  useEffect(() => {
    const { nationality, category, page, productIds, searchTerm } = getSearchParams(location);
    
    setPage(page);  
    loadRecipes(page, nationality, category, productIds, searchTerm);  
  }, [location]);

  const loadRecipes = (page, nationality, category, productIds, searchTerm) => {
  setLoading(true);
  
  let url = `http://localhost:8080/api/recipes?page=${page}&size=9`;
  if (searchTerm) {
    url += `&searchTerm=${encodeURIComponent(searchTerm)}`;
  }
  if (nationality) {
    url += `&nationality=${nationality}`;
  }
  if (category) {
    url += `&category=${category}`;
  }
  if (productIds && productIds.length > 0) {
    productIds.forEach(id => {
      url += `&productId=${id}`;
    });
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      setRecipes(data.content);
      setTotalPages(data.totalPages);

      setTimeout(() => {
        setLoading(false);
      }, 300);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    });
};

const handlePageChange = (newPage) => {
  if (newPage !== page && newPage >= 0 && newPage < totalPages) {
    setPage(newPage);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage);

    navigate(`/recipes?${searchParams.toString()}`);
  }
};

const navigateToRecipe = (id) => {
  const { nationality, category, productIds, page, searchTerm } = getSearchParams(location);

  navigate(`/recipes/${id}`, {
    state: {
      category,
      nationality,
      productIds,
      page,
      searchTerm,
      previousSearch: location.search,
    },
  });
};
  
  return (
    <>
      <Header />
      <div className={styles.recipesPage}>
        {loading && <div className={styles.loaderOverlay}><div className={styles.spinner}></div></div>}
        <div className={styles.container}>
          <h1 className={styles.sectionTitle}>Discover Your Next Favorite Dish</h1>
          <div className={styles.recipeCards}>
            {recipes.map(recipe => (
              <div key={recipe.id} className={styles.recipeCard}>
                <div
                  className={styles.recipeLink}
                  onClick={() => navigateToRecipe(recipe.id)}
                >
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} className={styles.recipeImage} />
                  <h2 className={styles.recipeTitle}>{recipe.strMeal}</h2>
                  <div className={styles.recipeDetails}>
                    <span className={styles.category}>{recipe.strCategory}</span>
                    <span className={styles.origin}>{recipe.strArea}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            {page > 0 && (
              <button
                onClick={() => handlePageChange(page - 1)}
                className={styles.pageButton}
              >
                &larr;
              </button>
            )}
            <span className={styles.currentPage}>
              Page {page + 1} of {totalPages}
            </span>
            {page < totalPages - 1 && (
              <button
                onClick={() => handlePageChange(page + 1)}
                className={styles.pageButton}
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recipes;
