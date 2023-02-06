import {Browser} from "puppeteer";
import {baseUrl, endpoint, genrelist} from "../utils/constants";
import { bypass } from "../utils/BypassCF";
import { load } from "cheerio";
import { AnimeShort } from "../utils/interfaces";

export async function Genre(browser:Browser,genre:string,page:number=1) {
  genre = genre.trim().toLowerCase();
  const lowercaseGenrelist = genrelist.map(g => g.toLowerCase());
  if (!lowercaseGenrelist.includes(genre)) {
    throw Error("No Genre Found!");
  }
  const data = await bypass((await browser.newPage()),baseUrl+endpoint.genre.replace("$GENRE",`${genre}`).replace("$PAGE",`${page}`))
  const $ = load(data.responseBody);
  let arr:AnimeShort[] = []
  $("#content > div.postsbody > div.result > ul > li > div").each((i,el)=>{
    let url = $(el).find("h2 > a").first().attr("href")!
    let thumb = $(el).find("div.limitnjg > img").first().attr("src")!
    let type = $(el).find("h2 > a").first().attr("href")!.includes("/hentai/") ? "hentai" : "episode"
    let title = $(el).find("h2 > a").first().text()!
    let id = ""
    if(type === "hentai"){
      id = url.split("/hentai/")[1]
    } else {
      id = url.split(`${baseUrl}/`)[1]
    }
    arr.push({type,url,thumb,title,id})
  })
  return arr
}
