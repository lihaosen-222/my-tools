const moment = require('momnet')

function tLog(...args) {
  console.log(moment().format('lll'), ...args)
}

function setRegular(targetHour, fn) {
  var nowTime, nowSeconds, targetSeconds

  nowTime = new Date()
  // 计算当前时间的秒数
  nowSeconds =
    nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds()

  // 计算目标时间对应的秒数
  targetSeconds = targetHour * 3600

  //  判断是否已超过今日目标小时，若超过，时间间隔设置为距离明天目标小时的距离
  intervalSeconds =
    targetSeconds > nowSeconds
      ? targetSeconds - nowSeconds
      : targetSeconds + 24 * 3600 - nowSeconds

  setTimeout(() => {
    fn()
    setRegular(targetHour, fn) //之后每天调用一次
  }, intervalSeconds * 1000)
}

function delay(time) {
  return new Promise((resolve) => setInterval(() => resolve(), time))
}

module.exports = {
  tLog,
  setRegular,
  delay
}
