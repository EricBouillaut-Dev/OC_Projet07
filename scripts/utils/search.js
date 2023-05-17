function allDropdownDatas(dropdownButton,data){
    const dataReplace = data.toLowerCase();
    if(dropdownButton.placeholder === `${data}`){
        dropdownButton.placeholder = `Rechercher un ${dataReplace.slice(0, -1)}`;
    }else{
        dropdownButton.placeholder = `${data}`;
        dropdownButton.blur();
    }
    const dropdownList = document.querySelector(`.list-${dataReplace}`);
    dropdownButton.classList.toggle('active');
    dropdownList.classList.toggle('active');

}

function launchSearch(){
    const main = document.getElementById('main');
    main.addEventListener('click', event => {
        if(event.target.classList.contains('button-ingredients')){
            allDropdownDatas(event.target,'Ingredients');
        }
        if(event.target.classList.contains('button-appareils')){
            allDropdownDatas(event.target,'Appareils');
        }
        if(event.target.classList.contains('button-ustensils')){
            allDropdownDatas(event.target,'Ustensils');
        }
    });

}