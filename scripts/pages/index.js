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
function showDropdownDatas(dropdownButton) {
    const base = dropdownButton.className.replace('button-', '');
    const data = base.charAt(0).toUpperCase() + base.slice(1);
    const dataReplace = data.toLowerCase().slice(0, -1);
    const dropdownList = dropdownButton.nextElementSibling.nextElementSibling;
    const blocItems = dropdownButton.parentElement;
 
    // On affiche le menu déroulant
    dropdownButton.classList.toggle('active');
    dropdownList.classList.toggle('active');

    // Evennement si le curseur de la souris sort du menu déroulant
    blocItems.addEventListener('mouseleave', () => {
      dropdownButton.classList.remove('active');
      dropdownList.classList.remove('active');
      resetDropdown(dropdownButton, data, blocItems);
    });
  
    // On sort du menu déroulant si on re-clique sur le bouton
    if (dropdownButton.classList.contains('active')) {
      dropdownButton.placeholder = `Rechercher un ${dataReplace}`;
    } else {
      resetDropdown(dropdownButton, data, blocItems);
    }
}

// Reset du menu déroulant lorsqu'on le quitte
function resetDropdown(dropdownButton, data, blocItems) {
    dropdownButton.placeholder = `${data.split(' ')[0]}`;
    dropdownButton.value = '';
    dropdownButton.blur();
    searchTags('', blocItems);
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

const searchTagInput = document.querySelector('.dropdown-container');
searchTagInput.addEventListener('input', function(event) {
    const parentInput = event.target.parentElement;
    const searchTerm = event.target.value.toLowerCase();
    searchTags(searchTerm, parentInput);
});

// Evennement 'click' sur tout le 'main'
const main = document.getElementById('main');
main.addEventListener('click', event => {
    if (event.target.className.includes('button')) {
        showDropdownDatas(event.target); // Click sur un menu déroulant
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

        parentTag.remove(); // Suppression du tag
        searchRecipes(currentSearch, tags); // Mise à jour des recettes sans le tag
    }
});
