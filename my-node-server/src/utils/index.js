const moment = require("momnet");

function tLog(...args) {
  console.log(moment().format("lll"), ...args);
}

module.exports = {
  tLog,
};
