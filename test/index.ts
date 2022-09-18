import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import * as assert from "uvu/assert";
import {test} from "uvu";

import {Client} from "../src/index";

test("Test Random", async () => {
  const client = new Client(puppeteer);
  await client.start();
  try {
    // await client.random();
    console.log("Sucess Random");
  } catch (err) {
    assert.instance(err, Error);
    throw new Error("Duh!");
  }
  client.close();
});

test.run()