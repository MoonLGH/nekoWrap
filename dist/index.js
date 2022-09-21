'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cheerio = require('cheerio');
var axios = _interopDefault(require('axios'));

const baseUrl = "https://nekopoi.care";
const Yuumari = "https://yuumari.com/bypass";
const endpoint = {
    release: "/category/hentai/page/$PAGE",
    search: "/search/$KEYWORD/page/$PAGE",
    detailPage: "/hentai/$ID",
    hentai: "/hentai/page/$PAGE",
    episode: "/$ID"
};

async function bypass(page, url) {
    try {
        let responseBody;
        let responseData;
        let newResponse;
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58");
        let response = await page.goto(url, { timeout: 30000, waitUntil: "domcontentloaded" });
        responseBody = await response.text();
        responseData = await response.buffer();
        let tryCount = 0;
        if (!responseBody.includes("Checking your browser")) {
            return { page, responseBody, responseData };
        }
        while (responseBody.includes("Checking your browser") && tryCount <= 10) {
            newResponse = await page.waitForNavigation({ timeout: 30000, waitUntil: "domcontentloaded" });
            if (newResponse)
                response = newResponse;
            responseBody = await response.text();
            responseData = await response.buffer();
            tryCount++;
        }
        return { page, responseBody, responseData };
    }
    catch (error) {
        throw Error("Error");
    }
}

async function Release(browser, page = 1) {
    const data = await bypass((await browser.newPage()), baseUrl + endpoint.release.replace("$PAGE", `${page}`));
    const $ = cheerio.load(data.responseBody);
    let arr = [];
    $("#content > div.postsbody > div.result > ul > li > div").each((i, el) => {
        let url = $(el).find("h2 > a").first().attr("href");
        let thumb = $(el).find("div.limitnjg > img").first().attr("src");
        let type = $(el).find("h2 > a").first().attr("href").includes("/hentai/") ? "hentai" : "episode";
        let title = $(el).find("h2 > a").first().text();
        let id = "";
        if (type === "hentai") {
            id = url.split("/hentai/")[1];
        }
        else {
            id = url.split(`${baseUrl}/`)[1];
        }
        arr.push({ type, url, thumb, title, id });
    });
    return arr;
}

async function hentai(browser, page = 1) {
    const data = await bypass((await browser.newPage()), baseUrl + endpoint.hentai.replace("$PAGE", `${page}`));
    const $ = cheerio.load(data.responseBody);
    let arr = [];
    $("#content > div.postsbody > div.result > ul > li > div").each((i, el) => {
        let url = $(el).find("h2 > a").first().attr("href");
        let thumb = $(el).find("div.limitnjg > img").first().attr("src");
        let type = $(el).find("h2 > a").first().attr("href").includes("/hentai/") ? "hentai" : "episode";
        let id = "";
        if (type === "hentai") {
            id = url.split("/hentai/")[1];
        }
        else {
            id = url.split(`${baseUrl}/`)[1];
        }
        let title = $(el).find("h2 > a").first().text();
        arr.push({ type, url, thumb, title, id });
    });
    return arr;
}

async function search(browser, keyword, page = 1) {
    const data = await bypass((await browser.newPage()), baseUrl + endpoint.search.replace("$PAGE", `${page}`).replace("$KEYWORD", keyword));
    const $ = cheerio.load(data.responseBody);
    let arr = [];
    $("#content > div.postsbody > div.result > ul > li > div").each((i, el) => {
        let url = $(el).find("h2 > a").first().attr("href");
        let type = $(el).find("h2 > a").first().attr("href").includes("/hentai/") ? "hentai" : "episode";
        let thumb = $(el).find("div.limitnjg > img").first().attr("src");
        let title = $(el).find("h2 > a").first().text();
        let id = "";
        if (type === "hentai") {
            id = url.split("/hentai/")[1];
        }
        else {
            id = url.split(`${baseUrl}/`)[1];
        }
        arr.push({ type, url, thumb, title, id });
    });
    return arr;
}

async function fetch(browser, ID) {
    const data = await bypass((await browser.newPage()), baseUrl + endpoint.detailPage.replace("$ID", ID));
    const $ = cheerio.load(data.responseBody);
    let obj = {};
    $("#content > div.animeinfos > div.listinfo > ul > li").each((i, el) => {
        let key = $(el).text().split(":")[0].replaceAll(" ", "").toLowerCase() || "";
        let val = $(el).text().split(":")[1].replaceAll(" ", "");
        if (key === "genres") {
            obj[key] = val.split(",");
        }
        else {
            obj[key] = val;
        }
    });
    obj["episodeList"] = [];
    $("#content > div.animeinfos > div.episodelist > ul > li").each((i, el) => {
        let title = $(el).find(".leftoff").text();
        let link = $(el).find(".leftoff > a").attr("href");
        let id = $(el).find(".leftoff > a").attr("href")?.split(baseUrl)[1].replace("/", "");
        let date = $(el).find(".rightoff").text();
        obj.episodeList.push({
            title, date, link, id
        });
    });
    return obj;
}

async function fetchEps(browser, ID) {
    const data = await bypass((await browser.newPage()), baseUrl + endpoint.episode.replace("$ID", ID));
    const $ = cheerio.load(data.responseBody);
    let arr = [];
    $("#content > div.postsbody > div > div.arealinker > div.boxdownload > div").each((i, el) => {
        let title = $(el).find(".name").text();
        let list = [];
        $(el).find(".listlink > p > a").each((i, el) => {
            let provider = $(el).text();
            let link = $(el).attr("href");
            list.push({ provider, link });
        });
        arr.push({ title, list });
    });
    return arr;
}

async function bypassOuo(page, url) {
    await page.goto(Yuumari, { waitUntil: "networkidle2" });
    await page.waitForSelector('#main > div.bypass-container.svelte-16iy02h > div.content-main.svelte-16iy02h > div:nth-child(1) > div > div.src-box.svelte-16iy02h > textarea');
    await page.focus('#main > div.bypass-container.svelte-16iy02h > div.content-main.svelte-16iy02h > div:nth-child(1) > div > div.src-box.svelte-16iy02h > textarea');
    await page.keyboard.type(url);
    await page.waitForXPath("/html/body/main/div[1]/div[2]/div[1]/div/div[2]/ul/li[2]/button", { timeout: 3000 });
    let elButton2 = await page.$x('/html/body/main/div[1]/div[2]/div[1]/div/div[2]/ul/li[2]/button');
    elButton2[0].click();
    await page.waitForSelector('div.result > ul > li > div');
    await page.waitForFunction('document.querySelector("div.result > ul > li > div").textContent.trim().length > 5');
    let element = await page.$('div.result > ul > li > div');
    let value = await page.evaluate(el => el.textContent, element);
    return value;
}

async function bypassMirrored(page, url) {
    let res = await axios.get("https://www.mirrored.to/downlink/" + url.split("/files/")[1].split("/")[0]);
    let $ = cheerio.load(res.data);
    let redirect = $("body > div.container.dl-width > div:nth-child(3) > div > a").attr("href");
    res = await axios.get(redirect);
    let apiRequest = res.data.split('"GET", "')[1].split('",')[0];
    res = await axios.get("https://mirrored.to" + apiRequest);
    let new$ = cheerio.load(res.data);
    let arr = [];
    new$("tr").each((i, el) => {
        let host = $(el).find("img").first().attr("alt");
        let url = $(el).find("td:nth-child(2) > a").attr("href");
        let status = $(el).find("td:nth-child(4)").text();
        status = status.trim();
        if (!host)
            return;
        arr.push({ host, url, status });
    });
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element.url) {
            let newUrl = await getLink(element.url);
            arr[i].url = newUrl;
        }
    }
    return arr;
}
async function getLink(url) {
    let res = await axios.get("https://mirrored.to" + url);
    let $ = cheerio.load(res.data);
    return $("code").text();
}

class Client {
    pup;
    pupBrowser;
    opt;
    constructor(pups, options = { headless: true }) {
        this.pup = pups;
        this.opt = options;
    }
    async start() {
        this.pupBrowser = await this.pup.launch(this.opt);
    }
    async release(page) {
        this.checkInitialize();
        return Release(this.pupBrowser, page);
    }
    async hentai(page) {
        this.checkInitialize();
        return hentai(this.pupBrowser, page);
    }
    async search(keyword, page) {
        this.checkInitialize();
        if (keyword.length < 3) {
            throw Error("Your keyword need to be >3 length");
        }
        return search(this.pupBrowser, keyword, page);
    }
    async fetchHentai(id) {
        this.checkInitialize();
        if (id.length < 3) {
            throw Error("Your id need to be >3 length");
        }
        return fetch(this.pupBrowser, id);
    }
    async Ouo(url) {
        this.checkInitialize();
        if (url.length < 3) {
            throw Error("Your url  need to be >3 length");
        }
        return bypassOuo((await this.pupBrowser.newPage()), url);
    }
    async Mirror(url) {
        this.checkInitialize();
        if (url.length < 3) {
            throw Error("Your url need to be >3 length");
        }
        return bypassMirrored((await this.pupBrowser.newPage()), url);
    }
    async fetchEpisode(id) {
        this.checkInitialize();
        if (id.length < 3) {
            throw Error("Your id need to be >3 length");
        }
        return fetchEps(this.pupBrowser, id);
    }
    async close() {
        this.checkInitialize();
        return (await this.pupBrowser?.close());
    }
    checkInitialize() {
        if (this.pupBrowser) {
            return true;
        }
        throw Error("Client is not initialized");
    }
}
// export * from "./utils/interfaces";

exports.Client = Client;
