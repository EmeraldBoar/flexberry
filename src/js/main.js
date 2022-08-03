import { getData } from './api.js';

getData(
  (tickets) => {
    console.log(tickets);
  },
  (error) => console.log(error),
);
