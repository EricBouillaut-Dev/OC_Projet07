const matchingRecipes = recipes.filter(function(recipe) {
    let matchesSearchItem = true;
    if(currentSearch.length >=3){
        let fullSearch = recipe.name + recipe.description;
        recipe.ingredients.forEach(Element => fullSearch += Element.ingredient);
        matchesSearchItem = fullSearch.toLowerCase().includes(currentSearch);
    }
    return matchesSearchItem;
});
