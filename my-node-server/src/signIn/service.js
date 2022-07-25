const axios = require("axios");
const secret = require("../secret");

function getTodayStatus() {
  return axios({
    method: "get",
    headers: {
      cookie: `sessionid=${secret.juejinSessionId}`,
    },
    url: "https://api.juejin.cn/growth_api/v1/get_today_status",
  });
}

function signIn() {
  return axios({
    method: "post",
    headers: {
      cookie: `sessionid=${secret.juejinSessionId}`,
    },
    url: "https://api.juejin.cn/growth_api/v1/check_in",
  });
}

function drawLottery() {
  return axios({
    method: "post",
    headers: {
      cookie: `sessionid=${secret.juejinSessionId}`,
    },
    url: "https://api.juejin.cn/growth_api/v1/lottery/draw",
  });
}

module.exports = {
  getTodayStatus,
  signIn,
  drawLottery,
};
