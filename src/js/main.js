import { getData } from './api.js';
import { toggleStatePage } from './state-page.js';
import { renderTickets } from './render-tickets.js';
import { setSortClick } from './sort.js';
import { setFilterCLick } from './filter.js';
import { renderPlugs } from './render-plugs.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 300;




toggleStatePage(false);
renderPlugs();
getData(
  (tickets) => {
    toggleStatePage(true);
    renderTickets(tickets);
    setSortClick(debounce(
      () => {
        renderTickets(tickets)},
      RERENDER_DELAY
      ));
    setFilterCLick(debounce(
      () => renderTickets(tickets),
      RERENDER_DELAY
      ));
  },
  (error) => console.log(error),
);



