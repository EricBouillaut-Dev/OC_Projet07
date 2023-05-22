function createTag(text, type) {
    const tagContainer = document.querySelector(`.tag-container__${type}`);
    const buttonTag = document.createElement('button');
    buttonTag.classList.add('tag');
    buttonTag.classList.add(`${type}`);

    buttonTag.innerHTML = `
        <div>${text}</div>
        <span class="cancel">
            <i class="fa fa-times"></i>
        </span>
    `;
    const isTagSelected = tags[type].includes(text);
    if (!isTagSelected) {
      tagContainer.appendChild(buttonTag);
      tags[type].push(text);
      searchRecipes('', tags);
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

searchRecipes('',tags);

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
});