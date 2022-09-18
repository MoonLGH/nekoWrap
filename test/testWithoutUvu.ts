import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  console.log(await client.hentai(100));
  // console.log(await client.release());
  // console.log(await client.search("shishunki"));
  //   await client.getRelated("177013");
  client.close();
})();

