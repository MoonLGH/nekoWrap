import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  let res = await client.hentai(1)
  let hentaiFull = await client.fetchHentai(res[3].id)
  let eps = (await client.fetchEpisode(hentaiFull.episodeList[0].id))[0].list
  for (let i = 0; i < eps.length; i++) {
    const element = eps[i];
    if(element.provider.includes("ouo")){
      let url = await client.Ouo(element.link)
      console.log(url)
      console.log(await client.Mirror(url!))
    }
  }
  client.close();
})();

