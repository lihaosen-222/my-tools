const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: 'https://www.vilipix.com'
});

module.exports = axiosInstance