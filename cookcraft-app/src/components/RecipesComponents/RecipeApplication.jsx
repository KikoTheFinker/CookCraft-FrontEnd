import styles from "../../css/ApplicationFormCss/ApplicationForm.module.css"
import modalStyles from "../../css/ApplicationFormCss/AlertModal.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeApplication = () => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeDesc, setRecipeDesc] = useState('');
    const [recipeCategory, setRecipeCategory] = useState('');
    const [recipeOrigin, setRecipeOrigin] = useState('');
    const [recipeVideoUrl, setRecipeVideoUrl] = useState('');
    const [recipeMealThumb, setRecipeMealThumb] = useState('');
    const [ingredients, setIngredients] = useState([{ ingredient: '', dose: '' }]);

    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const payload = {
                recipeName: recipeName,
                recipeDesc: recipeDesc,
                recipeCategory: recipeCategory,
                recipeOrigin: recipeOrigin,
                recipeVideoURL: recipeVideoUrl,
                recipeMealThumb: recipeMealThumb,
                ingredients: ingredients
            };

            const response = await fetch('http://localhost:8080/api/recipes/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/');
                }, 2500);
            } else {
                alert('Failed to submit application');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred while submitting the application.');
        }
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredient: '', dose: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index].ingredient = value;
        setIngredients(newIngredients);
    };

    const handleDoseChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index].dose = value;
        setIngredients(newIngredients);
    };

    if (!isLoggedIn) {
        return (
            <div className={styles.formContainer}>
                <div className={styles.messageContainer}>
                    <h2 className={styles.formTitle}>Please log in to add your recipe.</h2>
                    <button onClick={() => navigate('/login')} className={styles.loginButton}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.applicationForm}>
                <h2 className={styles.formTitle}>Apply for your recipe to be added!</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input
                        type="text"
                        id="recipeName"
                        onChange={(e) => setRecipeName(e.target.value)}
                        placeholder="Enter recipe name"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Recipe Description:</label>
                    <textarea
                        id="description"
                        rows="6"
                        placeholder="Write a guide on how to prepare the recipe..."
                        onChange={(e) => setRecipeDesc(e.target.value)}
                        required
                        style={{ resize: "none" }}
                    />
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.innerFormContainer}>
                        <div className={styles.innerFormData}>
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                onChange={(e) => setRecipeCategory(e.target.value)}
                                placeholder={"Breakfast, Lunch, Beef..."}
                            />
                        </div>
                        <div className={styles.innerFormData}>
                            <label htmlFor="origin">Nationality:</label>
                            <input
                                type="text"
                                id="origin"
                                onChange={(e) => setRecipeOrigin(e.target.value)}
                                placeholder={"Italian, French, German..."}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Ingredients:</label>
                    {ingredients.map((ingredientItem, index) => (
                        <div key={index} className={styles.innerFormContainer}>
                            <div className={styles.innerFormData}>
                                <input
                                    type="text"
                                    placeholder="Ingredient"
                                    value={ingredientItem.ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.innerFormData}>
                                <input
                                    type="text"
                                    placeholder="Dose"
                                    value={ingredientItem.dose}
                                    onChange={(e) => handleDoseChange(index, e.target.value)}
                                    required
                                />
                            </div>
                            <button type="button" className={styles.removeIngredientButton} onClick={() => handleRemoveIngredient(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className={styles.addIngredientButton} onClick={handleAddIngredient}>Add Ingredient</button>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="mealThumb">Meal Thumbnail:</label>
                    <input
                        type="url"
                        id="mealThumb"
                        onChange={(e) => setRecipeMealThumb(e.target.value)}
                        placeholder="Insert url of a picture of the recipe..."
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="video">Video URL:</label>
                    <input
                        type="url"
                        id="video"
                        onChange={(e) => setRecipeVideoUrl(e.target.value)}
                        placeholder="Insert url of the video of the recipe..."
                        required
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>
                        Submit Application
                    </button>
                </div>
            </form>

            {showModal && (
                <>
                    <div className={`${modalStyles.modalOverlay} ${modalStyles.show}`}></div>
                    <div className={`${modalStyles.alertModal} ${modalStyles.show}`}>
                        <h3>Application Submitted!</h3>
                        <p>Your application has been submitted successfully. You will be redirected to the homepage shortly.</p>
                        <button className={modalStyles.closeButton} onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RecipeApplication;
