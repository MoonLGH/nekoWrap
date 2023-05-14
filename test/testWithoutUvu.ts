import {PuppeteerClient, NekoClient} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());



// (async ()=>{
//   const client = new PuppeteerClient(puppeteer);
//   await client.start();
//   let res1 = await client.search("Isekai Harem Monogatari")
//   let res = await client.genre("yuri")
//   // console.log(res)
//   console.log(res)
//   for (let i = 0; i < res.length; i++) {
//     const element = res[i];
//     if(element.type ==="hentai"){
//       let hentaiFull = await client.fetchHentai(element.id)
//       let eps = (await client.fetchEpisode(hentaiFull.episodeList[0].id))[0].list
//       console.log(eps)
//       for (let i = 0; i < eps.length; i++) {
//         const element = eps[i];
//         if(element.provider.includes("ouo")){
//           let url = await client.Ouo(element.link)
//           let url2 = await client.Ouo(element.link,2)
//           console.log("OUO"+url)
//           console.log("OUO2"+url2)
//           url = url+""
//           const downloads = await client.bypassMirrored(url!)
//           console.log(`this downloads: ${downloads}`)
//           let racaty = downloads.find(ar => ar.host.toLowerCase().includes("racaty"))?.url
//           console.log(`this racaty ${racaty}`)

//           // data.on("data",(chunk:Buffer)=>{
//         }
//       }
//     }
//   }
//   client.close();
// })();

(async () => {
    let client = new NekoClient();
    await client.start();
    client.release().then(console.log)
})()