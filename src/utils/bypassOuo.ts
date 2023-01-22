import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import {Cookie, parse} from "set-cookie-parser"
import {Page, ElementHandle} from "puppeteer";
import { Yuumari } from "./constants";

export async function bypassOuo2(page:Page, url:string) {
    await page.goto(Yuumari, {waitUntil: "networkidle2"});
    await page.waitForSelector('#main > div.bypass-container.svelte-1emk765 > div.content-main.svelte-1emk765 > div:nth-child(1) > div > div.src-box.svelte-1emk765 > textarea')
    await page.focus('#main > div.bypass-container.svelte-1emk765 > div.content-main.svelte-1emk765 > div:nth-child(1) > div > div.src-box.svelte-1emk765 > textarea')
    await page.keyboard.type(url)

    await page.waitForXPath("/html/body/main/div[1]/div[2]/div[1]/div/div[2]/ul/li[2]/button", {timeout: 3000})
    let elButton2 = await page.$x('/html/body/main/div[1]/div[2]/div[1]/div/div[2]/ul/li[2]/button');
    (elButton2[0] as ElementHandle).click()

    await page.waitForSelector('div.result > ul > li > div')
    await page.waitForFunction('document.querySelector("div.result > ul > li > div").textContent.trim().length > 5');
    let element = await page.$('div.result > ul > li > div')
    let value = await page.evaluate(el => el!.textContent, element)
    await page.close()
    return value
}

async function get(url:string,i?:number):Promise<any> {
    if(!i) {
        i = 1
    }
    if(i > 3) {
        return "ERROR"
    }
    try {
        if (url.includes("/go/")) url = url.replace("/go/", "/");
        if (url.includes("/fbc/")) url = url.replace("/fbc/", "/");
    
        let header:any = {}
        let resp = await axios.get(url);
    
        let $ = load(resp.data);
    
        let post = $("form[method='POST']").attr("action");
        let tk = $("input[name='_token']").attr("value");
        let cookie = cookieString(parse(resp.headers["set-cookie"]!));
        let body = `_token=${tk}&x-token=&v-token=bx`;
    
        header["Cookie"] = cookie;
        header["Content-Type"] = "application/x-www-form-urlencoded";
        header["Content-Length"] = byteCount(body);
        header["Referer"] = url;
        header["Sec-Fetch-Dest"] = "document";
        header["Sec-Fetch-Mode"] = "navigate";
        header["Sec-Fetch-Site"] = "same-origin";
        header["TE"] = "trailers";
    
        try {
            const resp = await axios({
                method: 'POST',
                url: post!.replace('/go', '/xreallcygo'),
                data: body,
                headers: header,
                maxRedirects: 0,
              });
            if (resp.data) {
                return (await get(url));
            }
        } catch (err:any) {
            if (err.response?.headers?.location) return err.response.headers.location;
        }
    } catch (err) {
        if((err as AxiosError).code === "ERR_BAD_REQUEST"){
            i++
            return await get(url,i)
        }
        return err
    }
}
function cookieString(co:Cookie[]) {
    let s = ``;
    for (let c in co) {
        if (co[c].value == "deleted") continue;
        s = `${s} ${co[c].name}=${encodeURIComponent(co[c].value)};`;
    }
    s = s.substring(0, s.length - 1);
    return s.substring(1);
}


export async function bypassOuo(url:string) {
    return ((await get(url)) as string)
}

function byteCount(string:string) {
    return encodeURI(string).split(/%..|./).length - 1;
}