const matchingRecipes = [];
let i = 0;
while (i < recipes.length) {
    const recipe = recipes[i];

    let matchesSearchItem = false;
    if(SearchItem.length < 3){
        matchesSearchItem = true;
    }else{
        let element = recipe.name.toLowerCase();
        let j = 0;
        let k = 0;
      
        while (j < element.length && k < SearchItem.length) {
            if (element[j] === SearchItem[k]) {
                k++;
            } else {
                k = 0;
            }
            j++;
        }

        if (k === SearchItem.length) {
            matchesSearchItem = true;
        }else{
            element = recipe.description.toLowerCase();
            j = 0;
            k = 0;
      
            while (j < element.length && k < SearchItem.length) {
                if (element[j] === SearchItem[k]) {
                    k++;
                } else {
                    k = 0;
                }
                j++;
            }
      
            if (k === SearchItem.length) {
                matchesSearchItem = true;
            }else{
                let j = 0;
                while (j < recipe.ingredients.length) {

                    element = recipe.ingredients[j].ingredient.toLowerCase();
                    l = 0;
                    k = 0;
              
                    while (l < element.length && k < SearchItem.length) {
                        if (element[l] === SearchItem[k]) {
                            k++;
                        } else {
                            k = 0;
                        }
                        l++;
                    }
              
                    if (k === SearchItem.length) {
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
