const getSelectedFilters = () => {
  const filtersElements = document.querySelectorAll('.filters__label input');
  const filters = Array.from(filtersElements);

  const activeFilters = filters.reduce((acc, filter) => {
    if (filter.checked) {
      acc.push(filter.value);
    }
    return acc;
  }, []);

  return activeFilters;
};

const getStops = (ticket) => {
  const segments = ticket.segments;

  return segments.reduce((acc, segment) => {
    const countStop = String(segment.stops.length);
    acc.push(countStop);
    return acc;
  }, []);
};

const filtersTickets = (ticket) => {
  const selectedFilters = getSelectedFilters();
  const ticketStops = getStops(ticket);

  if (selectedFilters.includes('all') || selectedFilters.length === 0) {
    return true; 
  }

  let isMatch = false;

  for(let stop of ticketStops) {
    if(selectedFilters.includes(stop)) {
      isMatch = true;
    } else {
      return false;
    }
  }

  return isMatch;
}

const setFilterCLick = (cb) => {
  const filtersListElement = document.querySelector('.filters__list');
  filtersListElement.addEventListener('click', () => {
    cb()
  })
}

export { setFilterCLick, filtersTickets };
