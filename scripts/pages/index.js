// Création des tags de filtrage
function createTag(text, type) {
    const tagContainer = document.querySelector(`.tag-container__${type}`);
    const buttonTag = document.createElement('button');
    buttonTag.classList.add('tag');
    buttonTag.classList.add(`${type}`);

    buttonTag.innerHTML = `
        <div>${text}</div>
        <span class="cancel">
        </span>
    `;
    const isTagSelected = tags.includes(text);
    if (!isTagSelected) {
      tagContainer.appendChild(buttonTag);
      tags.push(text);
      searchRecipes(currentSearch, tags);
    }
}

// Affichage des menus déroulants
function showDropdownDatas(dropdownButton, data) {
    const dataReplace = data.toLowerCase();
    const dropdownList = document.querySelector(`.list-${dataReplace}`);
    const blocItems = document.querySelector(`.bloc-${dataReplace}`);
    dropdownButton.classList.toggle('active');
    dropdownList.classList.toggle('active');

    blocItems.addEventListener('mouseleave', () => {
        dropdownButton.classList.remove('active');
        dropdownList.classList.remove('active');
        dropdownButton.placeholder = `${data}`;
        dropdownButton.value = '';
        dropdownButton.blur();
    });

    if (dropdownButton.classList.contains('active')) {
        dropdownButton.placeholder = `Rechercher un ${dataReplace.slice(0, -1)}`;
    } else {
        dropdownButton.placeholder = `${data}`;
        dropdownButton.value = '';
        dropdownButton.blur();
    }
}

// Initialisation des variables
let tags = [];
let currentSearch = '';

searchRecipes(currentSearch,tags); // Affichage de toutes les recettes lors de l'ouverture de la page

// Evennement sur l'input de recherche principale
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    searchRecipes(searchTerm, tags);
});

// Evennement 'click' sur tout le 'main'
const main = document.getElementById('main');
main.addEventListener('click', event => {
    if (event.target.classList.contains('button-ingredients')) {
        showDropdownDatas(event.target, 'Ingredients'); // Click sur le menu déroulant 'Ingrediants'
    }
    if (event.target.classList.contains('button-appareils')) {
        showDropdownDatas(event.target, 'Appareils'); // Click sur le menu déroulant 'Appareils'
    }
    if (event.target.classList.contains('button-ustensils')) {
        showDropdownDatas(event.target, 'Ustensils'); // Click sur le menu déroulant 'Ustensils'
    }

    // Click sur le contenu des menu déroulants
    if (event.target.tagName === 'LI') {
        const tagText = event.target.innerText;
        const type = event.target.parentElement.classList[0].replace('list-', '');
        createTag(tagText, type);
    }

    // Click sur le bouton cancel (croix) des tags
    if (event.target.className === 'cancel') {
        const parentTag = event.target.parentElement;
        const tagToRemove = parentTag.firstElementChild.innerText;
        const tagIndex = tags.indexOf(tagToRemove);
        tags.splice(tagIndex, 1);

        // Vérification la classe du parent pour déterminer la propriété correspondante au tag
        // if (parentTag.classList.contains('ingredients')) {
        //     const tagIndex = tags.ingredients.indexOf(tagToRemove);
        //     if (tagIndex !== -1) {
        //         tags.ingredients.splice(tagIndex, 1);
        //     }
        // } else if (parentTag.classList.contains('appareils')) {
        //     const tagIndex = tags.appareils.indexOf(tagToRemove);
        //     if (tagIndex !== -1) {
        //         tags.appareils.splice(tagIndex, 1);
        //     }
        // } else if (parentTag.classList.contains('ustensils')) {
        //     const tagIndex = tags.ustensils.indexOf(tagToRemove);
        //     if (tagIndex !== -1) {
        //         tags.ustensils.splice(tagIndex, 1);
        //     }
        // }

        parentTag.remove(); // Suppression du tag
        searchRecipes(currentSearch, tags); // Mise à jour des recettes sans le tag
    }
});
