function init(){
    const recettesSection = document.querySelector(".recipes-section");
    const recipesArray = Object.values(recipes);

    recipesArray.forEach(recipeData => {
        const recipeModel = recipeFactory(recipeData);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recettesSection.appendChild(recipeCardDOM);
    });

    const allDatas = [];
    const listIngredients = document.querySelector('.list-ingredients');
    const listAppliances = document.querySelector('.list-appareils');
    const listUstensils = document.querySelector('.list-ustensils');

    recipes.forEach(function(recipe) {
        recipe.ingredients.forEach(function(ingredient) {
            const existingIngredient = allDatas.find(function(existing) {
                return existing.toLowerCase() === ingredient.ingredient.toLowerCase();
            });
            if (!existingIngredient) {
                const li = document.createElement('li');
                li.textContent = ingredient.ingredient;
                listIngredients.appendChild(li);
                allDatas.push(ingredient.ingredient.toLowerCase());
            }
        });

        const existingAppliance = allDatas.find(function(existing) {
            return existing.toLowerCase() === recipe.appliance.toLowerCase();
        });
        if (!existingAppliance) {
            const li = document.createElement('li');
            li.textContent = recipe.appliance;
            listAppliances.appendChild(li);
            allDatas.push(recipe.appliance.toLowerCase());
        }

        recipe.ustensils.forEach(function(ustensil) {
            const existingUstensil = allDatas.find(function(existing) {
                return existing.toLowerCase() === ustensil.toLowerCase();
            });
            if (!existingUstensil) {
                const li = document.createElement('li');
                li.textContent = ustensil;
                listUstensils.appendChild(li);
                allDatas.push(ustensil.toLowerCase());
            }
        });
    });
}
init();
launchSearch();
