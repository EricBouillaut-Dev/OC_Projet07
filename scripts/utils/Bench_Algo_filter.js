const matchingRecipes = recipes.filter(function(recipe) {
    let matchesSearchItem = true;
    if(SearchItem.length >=3){
        matchesSearchItem = (
            recipe.name.toLowerCase().includes(SearchItem) ||
            recipe.ingredients.some(function(ingredient) {
                return ingredient.ingredient.toLowerCase().includes(SearchItem);
            }) ||
            recipe.description.toLowerCase().includes(SearchItem)
        );
    }
             return matchesSearchItem;
});
