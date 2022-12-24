import {Page, ElementHandle} from "puppeteer";
import { Yuumari } from "./constants";

export async function bypassOuo(page:Page, url:string) {
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
