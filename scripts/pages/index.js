
const recettesSection = document.querySelector(".recipes-section");
const recipesArray = Object.values(recipes);

recipesArray.forEach(recipeData => {
    const recipeModel = recipeFactory(recipeData);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recettesSection.appendChild(recipeCardDOM);
});
