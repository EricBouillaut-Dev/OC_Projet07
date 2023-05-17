function allDropdownDatas(dropdownButton,data){
    const dataReplace = data.toLowerCase();
    const dropdownList = document.querySelector(`.list-${dataReplace}`);
    const blocItems = document.querySelector(`.bloc-${dataReplace}`);
    dropdownButton.classList.toggle('active');
    dropdownList.classList.toggle('active');

    blocItems.addEventListener('mouseleave', event => {
        dropdownButton.classList.remove('active');
        dropdownList.classList.remove('active');
        dropdownButton.placeholder = `${data}`;
        dropdownButton.blur();
    });
      
    if(dropdownButton.classList.contains('active')){
        dropdownButton.placeholder = `Rechercher un ${dataReplace.slice(0, -1)}`;
    }else{
        dropdownButton.placeholder = `${data}`;
        dropdownButton.blur();
    }

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