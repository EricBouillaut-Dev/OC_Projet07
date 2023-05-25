const matchingRecipes = [];
let i = 0;
while (i < recipes.length) {
    const recipe = recipes[i];

    let matchesSearchItem = false;
    if(currentSearch.length < 3){
        matchesSearchItem = true;
    }else{
        let element = recipe.name.toLowerCase();
        let j = 0;
        let k = 0;
      
        while (j < element.length && k < currentSearch.length) {
            if (element[j] === currentSearch[k]) {
                k++;
            } else {
                k = 0;
            }
            j++;
        }

        if (k === currentSearch.length) {
            matchesSearchItem = true;
        }else{
            element = recipe.description.toLowerCase();
            j = 0;
            k = 0;
      
            while (j < element.length && k < currentSearch.length) {
                if (element[j] === currentSearch[k]) {
                    k++;
                } else {
                    k = 0;
                }
                j++;
            }
      
            if (k === currentSearch.length) {
                matchesSearchItem = true;
            }else{
                let j = 0;
                while (j < recipe.ingredients.length) {

                    element = recipe.ingredients[j].ingredient.toLowerCase();
                    l = 0;
                    k = 0;
              
                    while (l < element.length && k < currentSearch.length) {
                        if (element[l] === currentSearch[k]) {
                            k++;
                        } else {
                            k = 0;
                        }
                        l++;
                    }
              
                    if (k === currentSearch.length) {
                        matchesSearchItem = true;
                    }
                    j++;
                }
            }
        }
    }
    if (matchesSearchItem) {
        matchingRecipes.push(recipe);
    }
    i++;
}
