const URL = 'http://localhost:3003/tickets';
const COUNT_OF_REQUESTS = 5;
const DELAY_TIME = 1000;

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const request = async(url, count) => {
  try {
    const response = await fetch(url);
    if(response.headers.get('Content-Type') !== 'application/json; charset=utf-8') {
      throw new Error(`Некорректный данные от сервера. Ожидается: application/json; charset=utf-8. Получены: ${response.headers.get('Content-Type')}`);
    }
    if(response.ok) {
      return response;
    }
    throw new Error('Ошбика fetch запроса');
  } catch (error) {
    if (count <= 1) {
      throw error;
    }
    await delay(DELAY_TIME);
    return await request(url, count - 1);
  }
};

const getData = async (onSuccess, onError) => {
  try {
    const response = await request(URL, COUNT_OF_REQUESTS); 
    const json = await response.json();
    onSuccess(json);

  } catch(error) {
    onError(error);
  }
};


export { getData };
