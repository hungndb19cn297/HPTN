const puppeteer = require('puppeteer');
const fs = require('fs');
var showdown = require('showdown'),
    converter = new showdown.Converter();
let folderIndex = 21

async function crawTag(pageIndex) {
    console.log('crawTag ' + pageIndex)
    const browser = await puppeteer.launch({ headless: true, args: ['--disable-features=site-per-process'] });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto(`https://viblo.asia/tags?sort=followers&type=none&page=${pageIndex}`, { waitUntil: 'networkidle2' });
    const tags = await page.evaluate(() => {
        let e = document.querySelectorAll('.tag-header__name')
        e = [...e];
        let tags = e.map(i => i.outerText);
        return tags;
    });
    let s = ''
    tags.map((i) => {
        let temp = `insert into tag (name) values ('${i}');`
        s = s + temp + '\n'
    })
    try {
        fs.writeFileSync('test.txt', s, { flag: 'a+' });
    } catch (err) {
        console.error(err);
    }
    await browser.close();
};




async function crawlPostDetail(pageSlug, folderIndex) {
    console.log('crawlPostDetail ' + pageSlug)
    const browser = await puppeteer.launch({ headless: true, args: ['--disable-features=site-per-process'] });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto(`https://viblo.asia/api/posts/${pageSlug}`, { waitUntil: 'networkidle2' });
    const post = await page.evaluate(() => {
        let e = document.querySelector('pre')
        return JSON.parse(e.innerHTML)
    });
    await browser.close();

    const data = post.post.data
    let content = data.contents
    let title = data.title
    let tags = data.tags.data.map(tag => {
        return tag.name
    })
    let created_at = new Date(data.published_at).getTime()
    let updated_at = new Date(data.updated_at).getTime()
    content = fixImg(content)
    content = converter.makeHtml(content);
    content = content.replaceAll('\n', '<br/>')
    content = content.replaceAll('<br/><br/>', '<br/>')
    content = content.replaceAll('><br/>', '>')
    let dataSave = { content, title, tags, created_at, updated_at }
    crawlPostComment(pageSlug, folderIndex, dataSave)
};

async function crawlPostComment(pageSlug, folderIndex, post) {
    console.log('crawlPostComment ' + pageSlug)
    const browser = await puppeteer.launch({ headless: true, args: ['--disable-features=site-per-process'] });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto(`https://viblo.asia/api/posts/${pageSlug}/comments`, { waitUntil: 'networkidle2' });
    const comments = await page.evaluate(() => {
        let e = document.querySelector('pre')
        return JSON.parse(e.innerHTML)
    });
    await browser.close();
    let data = comments.comments.data

    data.map((d) => {
        let content = d.contents.contents
        let created_at = new Date(d.updated_at).getTime()
        let updated_at = new Date(d.created_at).getTime()
        let dataSave = { content, created_at, updated_at }
        return dataSave
    })
    post.comments = data
    try {
        if (!fs.existsSync(`question/${folderIndex}`)){
            fs.mkdirSync(`question/${folderIndex}`);
        }
        fs.writeFileSync(`question/${folderIndex}/question.txt`, JSON.stringify(post));
    } catch (err) {
        console.error(err);
    }
};

async function crawlPost(pageIndex) {
    console.log('crawlPost ' + pageIndex)
    const browser = await puppeteer.launch({ headless: true, args: ['--disable-features=site-per-process'] });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto(`https://viblo.asia/api/newest?page=${pageIndex}`, { waitUntil: 'networkidle2' });
    const posts = await page.evaluate(() => {
        let e = document.querySelector('pre')
        return JSON.parse(e.innerHTML)
    });
    await browser.close();
    posts.data.map(post => {
        let slug = post.slug
        crawlPostDetail(slug, folderIndex)
        folderIndex = folderIndex + 1
    })
};



function fixImg(content) {
    content = content.replaceAll('&lt;br&gt;', '<br/>')
    return content.replaceAll('\n![', '\n\n![')
}

(async function run() {
    // for (i = 1; i< 286; i++)
    //     await crawData(i)
    crawlPost(8)
})()


