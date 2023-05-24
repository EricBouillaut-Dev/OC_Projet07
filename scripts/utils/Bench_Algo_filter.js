const matchingRecipes = recipes.filter(function(recipe) {
    let matchesSearchTerm = true;
    if(searchTerm.length >=3){
        matchesSearchTerm = (
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(function(ingredient) {
                return ingredient.ingredient.toLowerCase().includes(searchTerm);
            }) ||
            recipe.description.toLowerCase().includes(searchTerm)
        );
    }
             return matchesSearchTerm;
});
