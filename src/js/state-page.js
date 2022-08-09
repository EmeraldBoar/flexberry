const toggleStatePage = (state) => {
  const filtersElement = document.querySelector('.filters');
  const filtersInputElements = filtersElement.querySelectorAll('.filters__label input');
  const sortElement = document.querySelector('.sort');
  const sortButtonElements = sortElement.querySelectorAll('.sort__button');
  
  if(state) {
    filtersElement.classList.remove('filters--disabled');
    sortElement.classList.remove('sort--disabled');
    
    for(let filter of filtersInputElements) {
      filter.disabled = false;
    }
    for(let sortButton of sortButtonElements) {
      sortButton.disabled = false;
    }
  } else {
    filtersElement.classList.add('filters--disabled');
    sortElement.classList.add('sort--disabled');
    for(let filter of filtersInputElements) {
      filter.disabled = true;
    }
    for(let sortButton of sortButtonElements) {
      sortButton.disabled = true;
    }
  }
};

export { toggleStatePage };
