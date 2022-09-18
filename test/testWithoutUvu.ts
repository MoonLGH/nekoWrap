import {Client} from "../src/index";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
  console.log(await client.release());
  //   await client.getRelated("177013");
  client.close();
})();

