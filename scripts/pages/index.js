function init(){
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
    
        const recettesSection = document.querySelector(".recipes-section");
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
        recettesSection.appendChild(article);
    });
}
init();
launchSearch();
