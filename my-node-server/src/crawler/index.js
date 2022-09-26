const axios = require('axios')
const cheerio = require('cheerio')
const sizeOf = require('image-size')
const fs = require('fs')
const path = require('path')
const { tLog } = require('../utils')

async function refreshBackground() {
  const { data: html } = await axios({ url: 'https://www.vilipix.com/ranking' })

  const $ = cheerio.load(html)
  const hrefs = $('.illust a').map(function () {
    return $(this).attr('href')
  })

  for (let i = 0; i < hrefs.length; i++) {
    tLog(`正在判断第 ${i} 张图片……`)
    const url = await isWide(hrefs[i])
    if (url) {
      try {
        await savePicture(url + '.png')
      } catch {
        await savePicture(url + '.jpg')
      }
      return
    }
  }
}

// wide 返回链接，否则返回 false
async function isWide(url) {
  // await delay(500)
  const { data: html } = await axios({ url: `https://www.vilipix.com${url}` })

  const $ = cheerio.load(html)
  const imgDOMs = $('.illust-pages a img')
  const imgDOM = imgDOMs.length > 1 ? imgDOMs[0] : imgDOMs
  const src = $(imgDOM).attr('src')

  const { data: img } = await axios({
    url: src,
    params: { 'x-oss-process': `image/resize,w_200` },
    responseType: 'arraybuffer',
  })
  const { height, width } = sizeOf(img)
  if (width / height > 1.2) return convertImgURL(src)
  return false
}

async function savePicture(href) {
  try {
    const target_path = path.resolve(
      __dirname,
      `../../public/img/todayBackground.jpg`
    )
    const response = await axios.get(href, { responseType: 'stream' })
    await response.data.pipe(fs.createWriteStream(target_path))
    tLog('写入成功')
    setCss(href)
    return Promise.resolve()
  } catch (e) {
    tLog('写入数据失败')
    return Promise.reject(e)
  }
}

function convertImgURL(imgURL) {
  return imgURL
    .replace(/\/regular\//, '/original/')
    .replace(/_master1200.jpg\?x-oss-process=image\/resize,m_fill,w_1000/, '')
}

function setCss(url) {
  const target_path = path.resolve(__dirname, `../../public/todayBG.css`)

  try {
    fs.writeFileSync(target_path, `body {background-image: url(${url});}`)
  } catch (err) {
    console.error(err)
  }
}

module.exports = refreshBackground
