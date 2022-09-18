import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import { bypass } from "../utils/BypassCF";
import { load } from "cheerio";
export async function hentai(browser:Browser,page:number=1) {
  const data = await bypass((await browser.newPage()),baseUrl+endpoint.hentai.replace("$PAGE",`${page}`))
  const $ = load(data.responseBody);
  let arr:AnimeShort[] = []
  $("#content > div.postsbody > div.result > ul > li > div").each((i,el)=>{
    let url = $(el).find("h2 > a").first().attr("href")!
    let thumb = $(el).find("div.limitnjg > img").first().attr("src")!
    let type = $(el).find("h2 > a").first().attr("href")!.includes("/hentai/") ? "hentai" : "episode"
    let title = $(el).find("h2 > a").first().text()!
    arr.push({type,url,thumb,title})
  })
  return arr
}

export interface AnimeShort {
  type:string,
  url:string,
  thumb:string,
  title:string
}