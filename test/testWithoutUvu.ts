import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());



(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  let res = await client.search("Isekai Harem Monogatari")
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
          const downloads = await client.Mirror(url!)
          console.log(`this downloads: ${downloads}`)
          let zs = downloads.find(ar => ar.host.toLowerCase().includes("zippy"))?.url
          console.log(`this zs ${zs}`)
          if(!zs) return
          let {link,name} = await client.parseZippy(zs!)
          console.log(`this link : ${link} \nThis Name : ${name}`)

          const data = await client.downloadZippy(link,{fileName:name})
          // data.on("data",(chunk:Buffer)=>{
          // })
          data.on("end",()=>{
            console.log("end")
          })
        }
      }
    }
  }
  client.close();
})();