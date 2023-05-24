const matchingRecipes = [];
let i = 0;
while (i < recipes.length) {
    const recipe = recipes[i];

    let matchesSearchTerm = false;
    if(searchTerm.length < 3){
        matchesSearchTerm = true;
    }else{
        let element = recipe.name.toLowerCase();
        let j = 0;
        let k = 0;
      
        while (j < element.length && k < searchTerm.length) {
            if (element[j] === searchTerm[k]) {
                k++;
            } else {
                k = 0;
            }
            j++;
        }

        if (k === searchTerm.length) {
            matchesSearchTerm = true;
        }else{
            element = recipe.description.toLowerCase();
            j = 0;
            k = 0;
      
            while (j < element.length && k < searchTerm.length) {
                if (element[j] === searchTerm[k]) {
                    k++;
                } else {
                    k = 0;
                }
                j++;
            }
      
            if (k === searchTerm.length) {
                matchesSearchTerm = true;
            }else{
                let j = 0;
                while (j < recipe.ingredients.length) {

                    element = recipe.ingredients[j].ingredient.toLowerCase();
                    l = 0;
                    k = 0;
              
                    while (l < element.length && k < searchTerm.length) {
                        if (element[l] === searchTerm[k]) {
                            k++;
                        } else {
                            k = 0;
                        }
                        l++;
                    }
              
                    if (k === searchTerm.length) {
                        matchesSearchTerm = true;
                    }
                    j++;
                }
            }
        }
    }
    if (matchesSearchTerm) {
        matchingRecipes.push(recipe);
    }
    i++;
}
