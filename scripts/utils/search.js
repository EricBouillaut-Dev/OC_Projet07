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

// Filtrer les tags correspondants à la recherche
function searchTags(searchTag, blocTag) {
    const allTags = blocTag.querySelectorAll('li');
  
    allTags.forEach(liElement => {
      const liText = liElement.textContent.toLowerCase();
  
      if (!liText.includes(searchTag)) {
        liElement.className = 'hidden';
      }else{
        liElement.removeAttribute('class');
      }
    });
}

// Filtre les recettes correspondantes à la recherche
function searchRecipes(searchTerm, tags) {
    currentSearch = searchTerm;

    // Filtrer les recettes correspondant à la recherche
    if (
        searchTerm.length < 3 &&
        tags.length === 0
    ) {
        updateRecipes(recipes);
        updateIngredientList(recipes);
        updateApplianceList(recipes);
        updateUstensilList(recipes);
        return;
    }

    // Algo de recherche principale (while)
    const matchingRecipes = [];
    const search = currentSearch.toLowerCase();
    let i = 0;
    while (i < recipes.length) {
        const recipe = recipes[i];
    
        let matchesSearchItem = false;
        if (search.length < 3) {
            matchesSearchItem = true;
        } else {
            let searchIngredients = '';
            let j = 0;
            while (j < recipe.ingredients.length) {
                searchIngredients += (recipe.ingredients[j].ingredient);
                j++;
            }
            const fullSearch = (recipe.name + recipe.description + searchIngredients).toLowerCase();
            console.log(fullSearch);
            let k = 0;
            let l = 0;
    
            while (k < fullSearch.length && l < search.length) {
                if (fullSearch[k] === search[l]) {
                    l++;
                } else {
                    l = 0;
                }
                k++;
            }
    
            if (l === search.length) {
                matchesSearchItem = true;
            }
        }

        // Algo de recherche tags (while)
        let matchesTags = true;
        let m = 0;
        while (matchesTags && m < tags.length) {
            const tag = tags[m].toLowerCase();
            let hasTag = false;
            let fullSearch = recipe.name + recipe.description + recipe.ingredients.join(' ');
            let j = 0;
            let k = 0;

            while (j < fullSearch.length && k < tag.length) {
                if (fullSearch[j].toLowerCase() === tag[k]) {
                    k++;
                } else {
                    k = 0;
                }
                j++;
            }

            if (k === tag.length) {
                hasTag = true;
            }

            if (!hasTag) {
                matchesTags = false;
            }
            m++;
        }

        if (matchesSearchItem && matchesTags) {
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
