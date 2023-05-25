const matchingRecipes = recipes.filter(function(recipe) {
    const searchIngredients = recipe.ingredients.map(element => element.ingredient);
    const fullSearch = recipe.name + recipe.description + searchIngredients;

    if(currentSearch.length >=3){
        matchesSearchItem = fullSearch.toLowerCase().includes(currentSearch);
    }

    return matchesSearchItem;
});
