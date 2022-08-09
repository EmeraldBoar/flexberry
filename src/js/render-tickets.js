import { createTicket } from './create-ticket.js';
import { filtersTickets } from './filter.js';
import { getSelectedComparison } from './sort.js';


const renderTickets = (tickets) => {
  const ticketListElement = document.querySelector('.tickets');
  const fragment = document.createDocumentFragment();

  tickets
    .slice()
    .sort(getSelectedComparison())
    .filter(filtersTickets)
    .slice(0, 5)
    .forEach((ticket) => {
      fragment.appendChild(createTicket(ticket));
    });
  ticketListElement.innerHTML = '';
  ticketListElement.appendChild(fragment);
}

export { renderTickets };
