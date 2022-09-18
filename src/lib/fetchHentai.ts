import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import { bypass } from "../utils/BypassCF";
import { load } from "cheerio";
export async function fetch(browser:Browser,ID:string) {
  const data = await bypass((await browser.newPage()),baseUrl+endpoint.detailPage.replace("$ID",ID))
  const $ = load(data.responseBody);
  let obj:any = {}
  $("#content > div.animeinfos > div.listinfo > ul > li").each((i,el)=>{
    let key = $(el).text().split(":")[0]
    let val = $(el).text().split(":")[1]
    obj[key] = val
  })
  return obj
}
