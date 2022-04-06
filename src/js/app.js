const searchIdUrl = 'https://front-test.beta.aviasales.ru/search';
const ticketsUrl = `https://front-test.beta.aviasales.ru/tickets?searchId=`;

const getSearchId = (url) => {
  return fetch(url)
    .then(result => result.json())
    .then(result => result.searchId)
    .then(result => fetch(`${ticketsUrl}${result}`))
    .then(result => result.json())
    .then(result => console.log(result.stop));
};

console.log(getSearchId(searchIdUrl));

