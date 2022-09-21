import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import { bypass } from "../utils/BypassCF";
import { load } from "cheerio";
import { Provider,Download } from "../utils/interfaces";
export async function fetchEps(browser:Browser,ID:string) {
  const data = await bypass((await browser.newPage()),baseUrl+endpoint.episode.replace("$ID",ID))
  const $ = load(data.responseBody);

  let arr:Download [] = []
  $("#content > div.postsbody > div > div.arealinker > div.boxdownload > div").each((i,el)=>{
    let title = $(el).find(".name").text()
    let list:Provider[] = []
    $(el).find(".listlink > p > a").each((i,el)=>{
        let provider = $(el).text()
        let link = $(el).attr("href")!
        list.push({provider,link})
    })
    arr.push({title,list})
  })

  return arr 
}
