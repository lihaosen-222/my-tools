const axios = require('./service')
const cheerio = require('cheerio')

function delay(time){
  return new Promise((resolve, reject) =>{
    setInterval(()=>{
      resolve()
    }, time)
  })
}

function getRanking() {
  return axios({ url: '/ranking' })
}

async function ranking() {
  const {data: html} = await getRanking()
  const $ = cheerio.load(html)
  const hrefs = $('.illust a').map(function(i, el){
    return $(this).attr('href')
  })

  hrefs.some((href)=>{
    return await isWide(url)
    
  })
  

}
// wide 返回链接，否则返回 false
async function isWide(url){
  await delay(500)
  await axios({ url })
}

ranking()
