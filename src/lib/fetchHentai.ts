import {Browser} from "puppeteer";
import {baseUrl, endpoint} from "../utils/constants";
import { bypass } from "../utils/BypassCF";
import { load } from "cheerio";
import { HentaiObject } from "../utils/interfaces";
export async function fetch(browser:Browser,ID:string) {
  const data = await bypass((await browser.newPage()),baseUrl+endpoint.detailPage.replace("$ID",ID))
  const $ = load(data.responseBody);
  let obj:any = {}
  $("#content > div.animeinfos > div.listinfo > ul > li").each((i,el)=>{
    let key = $(el).text().split(":")[0].replaceAll(" ","").toLowerCase() || ""
    let val = $(el).text().split(":")[1].replaceAll(" ","")
    if(key === "genres") {
      obj[key] = val.split(",")
    } else {
      obj[key] = val
    } 
  })

  obj["episodeList"] = []

  $("#content > div.animeinfos > div.episodelist > ul > li").each((i,el)=>{
    let title = $(el).find(".leftoff").text()
    let link = $(el).find(".leftoff > a").attr("href")
    let id = $(el).find(".leftoff > a").attr("href")?.split(baseUrl)[1].replace("/","")
    let date = $(el).find(".rightoff").text()
    obj.episodeList.push({
      title,date,link,id
    })
  })
  obj["thumb"] = $("#content > div.animeinfos > div.imgdesc > img").attr("src")
  return (obj as HentaiObject)
}
