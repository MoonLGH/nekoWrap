import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  let res = await client.hentai(1)
  console.log(res)
  console.log(await client.fetch(res[0].id));
  // console.log(await client.release());
  // console.log(await client.search("shishunki"));
  //   await client.getRelated("177013");
  client.close();
})();

