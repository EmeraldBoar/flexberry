const plugTemplate = document.querySelector('#plug').content;
const ticketListElement = document.querySelector('.tickets');

const renderPlugs = () => {
  const fragment = document.createDocumentFragment();
  const COUNT_PLUG = 5;

  for(let i = 0; i < COUNT_PLUG; i++) {
    const plug = plugTemplate.cloneNode(true);
    fragment.appendChild(plug);
  }

  ticketListElement.appendChild(fragment);
}

export { renderPlugs};
