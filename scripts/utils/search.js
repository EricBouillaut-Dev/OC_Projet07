// Mise à jour de la liste des ingrédients du menu déroulant
function updateIngredientList(recipes) {
    const listIngredients = document.querySelector('.list-ingredients');
    listIngredients.innerHTML = '';

    const allIngredients = [];
    recipes.forEach(function(recipe) {
        recipe.ingredients.forEach(function(ingredient) {
            const existingIngredient = allIngredients.find(function(existing) {
                return existing.toLowerCase() === ingredient.ingredient.toLowerCase();
            });
            if (!existingIngredient) {
                const li = document.createElement('li');
                li.textContent = ingredient.ingredient;
                listIngredients.appendChild(li);
                allIngredients.push(ingredient.ingredient.toLowerCase());
            }
        });
    });
}

// Mise à jour de la liste des appareils du menu déroulant
function updateApplianceList(recipes) {
    const listAppliances = document.querySelector('.list-appareils');
    listAppliances.innerHTML = '';

    const allAppliances = [];
    recipes.forEach(function(recipe) {
        const existingAppliance = allAppliances.find(function(existing) {
            return existing.toLowerCase() === recipe.appliance.toLowerCase();
        });
        if (!existingAppliance) {
            const li = document.createElement('li');
            li.textContent = recipe.appliance;
            listAppliances.appendChild(li);
            allAppliances.push(recipe.appliance.toLowerCase());
        }
    });
}

// Mise à jour de la liste des ustensils du menu déroulant
function updateUstensilList(recipes) {
    const listUstensils = document.querySelector('.list-ustensils');
    listUstensils.innerHTML = '';

    const allUstensils = [];
    recipes.forEach(function(recipe) {
        recipe.ustensils.forEach(function(ustensil) {
            const existingUstensil = allUstensils.find(function(existing) {
                return existing.toLowerCase() === ustensil.toLowerCase();
            });
            if (!existingUstensil) {
                const li = document.createElement('li');
                li.textContent = ustensil;
                listUstensils.appendChild(li);
                allUstensils.push(ustensil.toLowerCase());
            }
        });
    });
}

// Mise à jour de l'affichage de la liste des recettes
function updateRecipes(recipes) {
    const recipesCount = recipes.length;
    const recipesCountText = document.querySelector('.recipes-count');
    if (recipesCount < 1) {
        recipesCountText.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc`;
    } else {
        recipesCountText.innerHTML = `<b>${recipesCount}</b> recette(s) trouvée(s):`;
    }

    const recipesSection = document.querySelector('.recipes-section');
    recipesSection.innerHTML = '';

    recipes.forEach(function(recipe) {
        const article = document.createElement('article');
        const ingredientsList = recipe.ingredients.map(ingredient => {
            let ingredientText = `<b>${ingredient.ingredient}</b>`;
            if (ingredient.quantity) {
                if (ingredient.unit) {
                    const unitText = ingredient.unit.replace("grammes", "g").replace("cuillères à soupe", " cuillères");
                    ingredientText += `: ${ingredient.quantity}${unitText}`;
                } else {
                    ingredientText += `: ${ingredient.quantity}`;
                }
            }
            return ingredientText;
        }).join('<br>');

        article.className = 'recipe-card';
        article.innerHTML = `
            <div class="recipe-info-up"></div>
            <div class="recipe-info-middle">
                <h2 class="recipe-name">${recipe.name}</h2>
                <p class="recipe-time">${recipe.time} min</p>
            </div>
            <div class="recipe-info-down">
                <div class="recipe-info-left">
                    <p class="recipe-ingredients">${ingredientsList}</p>
                </div>
                <div class="recipe-info-right">
                    <p class="recipe-description">${recipe.description}</p>
                </div>
            </div>
        `;

        recipesSection.appendChild(article);

    });
}

// Filtrer les recettes correspondant à la recherche
function searchRecipes(SearchItem, tags) {
    currentSearch = SearchItem.toLowerCase();
    if (
        currentSearch.length < 3 &&
        tags.ingredients.length === 0 &&
        tags.appareils.length === 0 &&
        tags.ustensils.length === 0
      ) {
        updateRecipes(recipes);
        updateIngredientList(recipes);
        updateApplianceList(recipes);
        updateUstensilList(recipes);
        return;
    }

    
    const matchingRecipes = recipes.filter(function(recipe) {

        // Algo de la recherche principale
        let matchesSearchItem = true;
        if(currentSearch.length >=3){
            let fullSearch = recipe.name + recipe.description;
            recipe.ingredients.forEach(Element => fullSearch += Element.ingredient);
            matchesSearchItem = fullSearch.toLowerCase().includes(currentSearch);
        }
        
        // Algo de la recherche des tags ingredients
        const matchesIngredients = tags.ingredients.every(function(tag) {
            return recipe.ingredients.some(function(ingredient) {
                return ingredient.ingredient.toLowerCase().includes(tag.toLowerCase());
            });
        });

        // Algo de la recherche des tags appareils
        const matchesAppliances = tags.appareils.every(function(tag) {
            return recipe.appliance.toLowerCase().includes(tag.toLowerCase());
        });
    
        // Algo de la recherche des tags ustensils
        const matchesUstensils = tags.ustensils.every(function(tag) {
            return recipe.ustensils.some(function(ustensil) {
                return ustensil.toLowerCase().includes(tag.toLowerCase());
            });
        });
    
        // On retourne un booléen de toutes les conditions pour sélectionner la recette ou non 
        return matchesSearchItem && matchesIngredients && matchesAppliances && matchesUstensils;
    });

    // Mise à jour des menus déroulants et de l'affichage des recettes
    updateRecipes(matchingRecipes);
    updateIngredientList(matchingRecipes);
    updateApplianceList(matchingRecipes);
    updateUstensilList(matchingRecipes);
}