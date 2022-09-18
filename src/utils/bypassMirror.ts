import {Page} from "puppeteer";
import { load } from "cheerio";
import axios from "axios";
export async function bypassMirrored(page:Page, url:string) {
    let res = await axios.get("https://www.mirrored.to/downlink/"+url.split("/files/")[1].split("/")[0])

    let $ = load(res.data)


    let redirect = $("body > div.container.dl-width > div:nth-child(3) > div > a").attr("href")
    await page.goto(redirect!, {waitUntil:"networkidle2"})

    await page.waitForSelector('#result > div.col-sm > table > tbody')

    let new$ = load(await page.$eval('html', element => element.innerHTML))

    let arr:Mirror[] = []
    
    new$("tr").each((i,el)=>{
        let host = $(el).find("img").first()!.attr("alt")!
        let url = $(el).find("td:nth-child(2) > a").attr("href")!
        let status = $(el).find("td:nth-child(4)").text()
        if(!host) return
        arr.push({host,url,status})
    })

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(element.url){
            let newUrl = await getLink(element.url)
            arr[i].url = newUrl
        }
    }

    await page.close()
    return arr
}

async function getLink(url:string){
    let res = await axios.get("https://mirrored.to"+url)

    let $ = load(res.data)
    return $("body > div.container.dl-width > div:nth-child(5) > div > div > div > div > code").text()
}

export interface Mirror {
    host:string,
    url:string,
    status:string,
}
