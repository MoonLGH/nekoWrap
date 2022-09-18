import {Page} from "puppeteer";

export async function bypass(page:Page, url:string) {
  try {
    let responseBody; let responseData; let newResponse;
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.58");
    let response = await page.goto(url, {timeout: 30000, waitUntil: "domcontentloaded"});
    responseBody = await response!.text();
    responseData = await response!.buffer();
    let tryCount = 0;
    if(!responseBody.includes("Checking your browser")){
     return {page, responseBody, responseData};
    }
    while (responseBody.includes("Checking your browser") && tryCount <= 10) {
      newResponse = await page.waitForNavigation({timeout: 30000, waitUntil: "domcontentloaded"});
      if (newResponse) response = newResponse;
      responseBody = await response!.text();
      responseData = await response!.buffer();
      tryCount++;
    }

    return {page, responseBody, responseData};
  } catch (error) {
    throw Error("Error");
  }
}
