import dayjs from 'dayjs';

const ticketTemplate = document.querySelector('#ticket').content;

const getCountStops = (stops) => {
  if(stops.length === 0) return 'Без пересадок';
  return stops.length === 1 ? '1 пересадка' : `${stops.length} пересадки`;
}

const getFormattedDuration = (duration) => {
  const dayCalculation = Math.floor(duration / 60 / 24);
  const hourCalculation = Math.floor(duration / 60 % 24);
  const minutesCalculation = Math.floor(duration % 60);

  const days = dayCalculation === 0 ? '' : `${dayCalculation}д `;
  const hours = hourCalculation === 0 ? '' : `${hourCalculation}ч `;
  const minutes = minutesCalculation === 0 ? '' : `${minutesCalculation}м`;

  return `${days}${hours}${minutes}`;
};

const createFlightElement = (segment) => {
  const ticketTableElement = ticketTemplate.querySelector('.tickets__table');
  const ticketFlight = ticketTableElement.cloneNode(true);

  const originElement = ticketFlight.querySelector('.tickets__origin');
  const destinationElement = ticketFlight.querySelector('.tickets__destination');
  const countStopElement = ticketFlight.querySelector('.tickets__stops-count');
  const timeElement = ticketFlight.querySelector('.tickets__time');
  const routeElement = ticketFlight.querySelector('.tickets__route');
  const stopsElement = ticketFlight.querySelector('.tickets__stops');

  originElement.textContent = segment.origin;
  destinationElement.textContent = segment.destination;

  const segmentStops = segment.stops;
  countStopElement.textContent = getCountStops(segmentStops);

  stopsElement.textContent = segmentStops.length === 0 ? '' : segmentStops.join(' ');

  const segmentDate = dayjs(segment.date);
  const segmentDuration = segment.duration;

  const departureTime = segmentDate.format('HH:mm');
  const arrivalTime = segmentDate.add(segmentDuration, 'minute').format('HH:mm');
  timeElement.textContent = `${departureTime} - ${arrivalTime}`;

  routeElement.textContent = getFormattedDuration(segmentDuration);



  return ticketFlight;
};


const createTicket = (ticket) => {
  const ticketElement = ticketTemplate.cloneNode(true);
  const priceElement = ticketElement.querySelector('.tickets__price');
  const logoImageElement = ticketElement.querySelector('.logo__image');
  const flightsWrapperElement = ticketElement.querySelector('.ticket__table-wrapper');

  const formattedPrice = ticket.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  priceElement.textContent = `${formattedPrice} Р`;
  logoImageElement.src = `http://pics.avs.io/99/36/${ticket.carrier}.png`;

  const segments = ticket.segments;
  
  flightsWrapperElement.innerHTML = '';

  segments.forEach((segment) => {
    flightsWrapperElement.appendChild(createFlightElement(segment));
  });


  return ticketElement;
}

export { createTicket };
