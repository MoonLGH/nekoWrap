import {PuppeteerLaunchOptions, Browser} from "puppeteer";
import {PuppeteerExtra} from "puppeteer-extra";
import { Release } from "./lib/release";
import { hentai } from "./lib/hentai";
import { search } from "./lib/search";
export class Client {
  pup: PuppeteerExtra;
  pupBrowser?: Browser;
  opt: PuppeteerLaunchOptions;
  constructor(pups:PuppeteerExtra, options:PuppeteerLaunchOptions={headless: true}) {
    this.pup = pups;
    this.opt = options;
  }

  async start() {
    this.pupBrowser = await this.pup.launch(this.opt);
  }

  async release(page?:number) {
    this.checkInitialize();
    return Release(this.pupBrowser!,page);
  }

  async hentai(page?:number) {
    this.checkInitialize();
    return hentai(this.pupBrowser!,page);
  }

  async search(keyword:string,page?:number) {
    this.checkInitialize();
    if(keyword.length < 3){
      throw Error("Your keyword need to be >3 length")
    }
    return search(this.pupBrowser!,keyword,page);
  }

  async close() {
    this.checkInitialize();
    return (await this.pupBrowser?.close());
  }

  private checkInitialize() {
    if (this.pupBrowser) {
      return true;
    }
    throw Error("Client is not initialized");
  }
}

// export * from "./utils/interfaces";
