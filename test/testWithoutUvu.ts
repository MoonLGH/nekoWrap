import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());



(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  let res = await client.search("shoujo ramune")
  console.log(res)
  for (let i = 0; i < res.length; i++) {
    const element = res[i];
    if(element.type ==="hentai"){
      let hentaiFull = await client.fetchHentai(element.id)
      let eps = (await client.fetchEpisode(hentaiFull.episodeList[0].id))[0].list
      console.log(eps)
      for (let i = 0; i < eps.length; i++) {
        const element = eps[i];
        if(element.provider.includes("ouo")){
          let url = await client.Ouo(element.link)
          console.log(url)
          console.log(await client.Mirror(url!))
        }
      }
    }
  }
  client.close();
})();

