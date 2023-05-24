function updateIngredientList(recipes) {
    const listIngredients = document.querySelector('.list-ingredients');
    listIngredients.innerHTML = ''; // Effacer le contenu existant

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

function updateApplianceList(recipes) {
    const listAppliances = document.querySelector('.list-appareils');
    listAppliances.innerHTML = ''; // Effacer le contenu existant

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

function updateUstensilList(recipes) {
    const listUstensils = document.querySelector('.list-ustensils');
    listUstensils.innerHTML = ''; // Effacer le contenu existant

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

function updateRecipes(recipes) {
    const recipesCount = recipes.length;
    const recipesCountText = document.querySelector('.recipes-count');
    if (recipesCount < 1) {
        recipesCountText.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc`;
    } else {
        recipesCountText.innerHTML = `<b>${recipesCount}</b> recette(s) trouvée(s):`;
    }

    // Mettre à jour la liste des recettes affichées
    const recipesSection = document.querySelector('.recipes-section');
    recipesSection.innerHTML = ''; // Effacer le contenu existant

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

function searchRecipes(searchTerm, tags) {
    currentSearch = searchTerm;
    
    // Filtrer les recettes correspondant à la recherche
    if (
        searchTerm.length < 3 &&
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
    
    const matchingRecipes = [];
    let i = 0;
    while (i < recipes.length) {
        const recipe = recipes[i];
        
        let matchesSearchTerm = false;
        if (
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm)
        ) {
            matchesSearchTerm = true;
        } else {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchTerm)) {
                    matchesSearchTerm = true;
                    break;
                }
            }
        }

        let matchesIngredients = true;
        for (let k = 0; k < tags.ingredients.length; k++) {
            const tag = tags.ingredients[k].toLowerCase();
            let hasIngredient = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(tag)) {
                    hasIngredient = true;
                    break;
                }
            }
            if (!hasIngredient) {
                matchesIngredients = false;
                break;
            }
        }

        let matchesAppliances = true;
        for (let k = 0; k < tags.appareils.length; k++) {
            const tag = tags.appareils[k].toLowerCase();
            if (!recipe.appliance.toLowerCase().includes(tag)) {
                matchesAppliances = false;
                break;
            }
        }
    
        let matchesUstensils = true;
        for (let k = 0; k < tags.ustensils.length; k++) {
            const tag = tags.ustensils[k].toLowerCase();
            let hasUstensil = false;
            for (let j = 0; j < recipe.ustensils.length; j++) {
                if (recipe.ustensils[j].toLowerCase().includes(tag)) {
                    hasUstensil = true;
                    break;
                }
            }
            if (!hasUstensil) {
                matchesUstensils = false;
                break;
            }
        }
    
        if (matchesSearchTerm && matchesIngredients && matchesAppliances && matchesUstensils) {
            matchingRecipes.push(recipe);
        }
        i++;
    }

    // Mettre à jour les menus déroulants et la liste des ingrédients, appareils et ustensiles
    updateRecipes(matchingRecipes);
    updateIngredientList(matchingRecipes);
    updateApplianceList(matchingRecipes);
    updateUstensilList(matchingRecipes);
}
