const puppeteer = require('puppeteer');
const fs = require('fs');

// (async function run(){
//     for (i = 1; i< 286; i++)
//         await crawData(i)
// })()

(async function crawData(pageIndex) {
    console.log('asdads')
    const browser = await puppeteer.launch({ headless: true, args: ['--disable-features=site-per-process'] });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto(`https://viblo.asia/api/posts/2oKLnxpW4QO`, { waitUntil: 'networkidle2' });
    const tags = await page.evaluate(() => {
        let e = document.querySelector('pre')
        return e.innerHTML
    });
    console.log(tags)
    await browser.close();
})();
