const { getTodayStatus, signIn, drawLottery } = require('./service')
const { tLog } = require('../utils')

async function trySignIn() {
  const statusData = await (await getTodayStatus()).data
  const { err_no, err_msg, data: status } = statusData
  if (err_no !== 0) {
    tLog('请求错误，', err_msg)
    return
  } else if (status) {
    tLog('今天已经签到过了')
    return
  } else {
    await signIn()
    await drawLottery() // 签到后才有签到资格
    tLog('签到成功')
  }
}

module.exports = trySignIn
