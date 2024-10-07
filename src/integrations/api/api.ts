import axios from 'axios';

// Public API
const apiURL =
  process.env.TEST_API_URL || 'https://jsonplaceholder.typicode.com';

const api = async () => {
  return axios.create({
    baseURL: apiURL,
  });
};

export default api;
