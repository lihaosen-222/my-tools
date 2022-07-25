const axios = require('axios')
const cheerio = require('cheerio')
const sizeOf = require('image-size')
const fs = require('fs')
const path = require('path')

function delay(time) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      resolve()
    }, time)
  })
}

function getRankHTML() {
  return axios({ url: 'https://www.vilipix.com/ranking' })
}

function getIllustHTML(url) {
  return axios({ url: `https://www.vilipix.com${url}` })
}

function getResizedImg(url) {
  return axios({
    url,
    params: { 'x-oss-process': `image/resize,w_200` },
    responseType: 'arraybuffer',
  })
}

async function ranking() {
  // await delay(1000 * 60 * 3)
  const { data: html } = await getRankHTML()
  const $ = cheerio.load(html)
  const hrefs = $('.illust a').map(function () {
    return $(this).attr('href')
  })

  for (let i = 0; i < hrefs.length; i++) {
    console.log('i', i)
    const url = await isWide(hrefs[i])
    if (url) {
      const convertedURL = convertImgURL(url)
      try {
        await downLoadPicture(convertedURL + '.png')
      } catch {
        await downLoadPicture(convertedURL + '.jpg')
      }
      return
    }
  }
}

// wide 返回链接，否则返回 false
async function isWide(url) {
  // await delay(500)
  const { data: html } = await getIllustHTML(url)
  const $ = cheerio.load(html)
  const imgDOMs = $('.illust-pages a img')
  const imgDOM = imgDOMs.length > 1 ? imgDOMs[0] : imgDOMs
  const src = $(imgDOM).attr('src')
  const { data: img } = await getResizedImg(src)
  const { height, width } = sizeOf(img)
  if (width / height > 1.2) return src
  return false
}

async function downLoadPicture(href) {
  try {
    const target_path = path.resolve(
      __dirname,
      `../../public/img/todayBackground.jpg`
    )
    const response = await axios.get(href, { responseType: 'stream' })
    await response.data.pipe(fs.createWriteStream(target_path))
    console.log('写入成功')
    return Promise.resolve()
  } catch (e) {
    console.log('写入数据失败')
    return Promise.reject(e)
  }
}

function convertImgURL(imgURL) {
  return imgURL
    .replace(/\/regular\//, '/original/')
    .replace(/_master1200.jpg\?x-oss-process=image\/resize,m_fill,w_1000/, '')
}

ranking()
