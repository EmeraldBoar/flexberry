const ID_URL = 'https://front-test.dev.aviasales.ru/search';
const TICKETS_URL = 'https://front-test.dev.aviasales.ru/tickets?searchId=';
const COUNT_OF_REQUESTS = 30;

const getSearchId = async(url, count) => {
  try {
    const response = await fetch(url);
    if(response.ok) {
      const id = await response.json();
      return id.searchId;
    }
    throw new Error('Ошбика получения ID');
  } catch (error) {
    if (count <= 1) {
      throw error;
    }
    return await getSearchId(url, count - 1);
  }
};

const getTickets = async () =>{
  const searchId = await getSearchId(ID_URL, COUNT_OF_REQUESTS);
  const requestUrl = `${TICKETS_URL}${searchId}`;
  const tickets = [];

  const request = async(url, count) => {
    try {
      const response = await fetch(url);
      
      if(response.ok) {
        const pack = await response.json();
        tickets.push(...pack.tickets);
        return pack.stop ? tickets : await request(url, count - 1);
      }

      throw new Error('Ошибка запроса');

    } catch (error) {
      if (count <= 1) {
        throw error;
      }
      return await request(url, count - 1);
    }
  };

  return request(requestUrl, COUNT_OF_REQUESTS);
}


const getData = async (onSuccess, onError) => {
  try {
    const response = await getTickets();
    onSuccess(response);

  } catch(error) {
    onError(error);
  }
};


export { getData };
