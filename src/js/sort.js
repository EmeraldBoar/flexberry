const sortElement = document.querySelector('.sort');
const sortButtonElements = sortElement.querySelectorAll('.sort__button');
const sortButtons = Array.from(sortButtonElements);


const getSelectedSort = () => {
  for (let button of sortButtonElements) {
    if(button.classList.contains('sort__button--active')) {
      return button.getAttribute('data-sort');
    }
  }
}

const getDurationSum = (ticket) => {
  const segments = ticket.segments;

  return segments.reduce((acc, segment) => {
    acc += segment.duration;
    return acc;
  }, 0);
};

const comparePrice = (ticketA, ticketB) => {
  return ticketA.price - ticketB.price;
}

const compareTime = (ticketA, ticketB) => {
  return getDurationSum(ticketA) - getDurationSum(ticketB);
};

const getSelectedComparison = () => {
  const activeSort = getSelectedSort();
  switch (activeSort) {
    case 'price':
      return comparePrice;
    case 'time':
      return compareTime;
    default:
      throw new Error('Отсутствует сортировка');
  }
}

const setSortClick = (cb) => {
  sortElement.addEventListener('click', (evt) => {
    const targetButton = evt.target;
  
    if(!targetButton.classList.contains('sort__button--active')) {
      sortButtons.forEach((button) => {
        if(button.classList.contains('sort__button--active')) {
          button.classList.remove('sort__button--active');
          targetButton.classList.add('sort__button--active');
        }
      })
      cb();
    }
  });
};

export { setSortClick, getSelectedComparison };

