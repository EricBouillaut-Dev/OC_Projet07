const matchingRecipes = [];
const search = currentSearch.toLowerCase();
let i = 0;
while (i < recipes.length) {
    const recipe = recipes[i];

    let matchesSearchItem = false;
    if (search.length < 3) {
        matchesSearchItem = true;
    } else {
        const searchIngredients = [];
        let j = 0;
        while (j < recipe.ingredients.length) {
            searchIngredients.push(recipe.ingredients[j].ingredient);
            j++;
        }
        const fullSearch = (recipe.name + recipe.description + searchIngredients.join(' ')).toLowerCase();
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
    if (matchesSearchItem) {
        matchingRecipes.push(recipe);
    }
    i++;
}