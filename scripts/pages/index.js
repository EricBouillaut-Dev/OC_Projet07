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
    const isTagSelected = tags[type].includes(text);
    if (!isTagSelected) {
      tagContainer.appendChild(buttonTag);
      tags[type].push(text);
      searchRecipes(currentSearch, tags);
    }}

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

let tags = {
    ingredients: [],
    appareils: [],
    ustensils: []
};
let currentSearch = '';
searchRecipes(currentSearch,tags);

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    searchRecipes(searchTerm, tags);
});

const main = document.getElementById('main');
main.addEventListener('click', event => {
    if (event.target.classList.contains('button-ingredients')) {
        showDropdownDatas(event.target, 'Ingredients');
    }
    if (event.target.classList.contains('button-appareils')) {
        showDropdownDatas(event.target, 'Appareils');
    }
    if (event.target.classList.contains('button-ustensils')) {
        showDropdownDatas(event.target, 'Ustensils');
    }

    if (event.target.tagName === 'LI') {
        const tagText = event.target.innerText;
        const type = event.target.parentElement.classList[0].replace('list-', '');
        createTag(tagText, type);
    }

    if (event.target.className === 'cancel') {
        const tagToRemove = event.target.parentElement.firstElementChild.innerText;

        // Vérifier la classe du parent pour déterminer la propriété correspondante de tags
        if (event.target.parentElement.classList.contains('ingredients')) {
            const tagIndex = tags.ingredients.indexOf(tagToRemove);
            if (tagIndex !== -1) {
                tags.ingredients.splice(tagIndex, 1);
            }
        } else if (event.target.parentElement.classList.contains('appareils')) {
            const tagIndex = tags.appareils.indexOf(tagToRemove);
            if (tagIndex !== -1) {
                tags.appareils.splice(tagIndex, 1);
            }
        } else if (event.target.parentElement.classList.contains('ustensils')) {
            const tagIndex = tags.ustensils.indexOf(tagToRemove);
            if (tagIndex !== -1) {
                tags.ustensils.splice(tagIndex, 1);
            }
        }
        event.target.parentElement.remove();
        searchRecipes(currentSearch, tags);
    }
});
