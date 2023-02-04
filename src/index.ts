import {PuppeteerLaunchOptions, Browser} from "puppeteer";
import {PuppeteerExtra} from "puppeteer-extra";
import { Release } from "./lib/release";
import { Genre } from "./lib/genre";
import { hentai } from "./lib/hentai";
import { search } from "./lib/search";
import { fetch } from "./lib/fetchHentai";
import { fetchEps } from "./lib/fetchEpisode";
import { bypassOuo, bypassOuo2 } from "./utils/bypassOuo";
import { bypassMirrored } from "./utils/bypassMirror";
import { downloadZippy, parse } from "./utils/DownloadZippy";
import { DownloadOption } from "./utils/interfaces";
import { genrelist } from "../src/utils/constants";
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

  async genre(genre:string, page?:number) {
    this.checkInitialize();
    genre = genre.trim().toLowerCase();
    const lowercaseGenrelist = genrelist.map(g => g.toLowerCase());
    if (!lowercaseGenrelist.includes(genre)) {
      throw Error("No Genre Found!");
    }
    return Genre(this.pupBrowser!, genre, page);
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
  
  async fetchHentai(id:string){
    this.checkInitialize();
    if(id.length < 3){
      throw Error("Your id need to be >3 length")
    }
    return fetch(this.pupBrowser!,id)
  }

  async Ouo(url:string,method:number=1){
    this.checkInitialize();
    if(method === 2){
      return bypassOuo2((await this.pupBrowser!.newPage()),url)
    }
    if(url.length < 3){
      throw Error("Your url  need to be >3 length")
    }
    return bypassOuo((url))
  }


  async bypassMirrored(url:string){
    this.checkInitialize();
    if(url.length < 3){
      throw Error("Your url need to be >3 length")
    }
    return bypassMirrored((await this.pupBrowser!.newPage()),url)
  }

  async fetchEpisode(id:string){
    this.checkInitialize();
    if(id.length < 3){
      throw Error("Your id need to be >3 length")
    }
    return fetchEps(this.pupBrowser!,id)
  }

  async parseZippy(url:string) {
    if(!url)throw Error("Please Put Url")
    return await parse(url)
  }

  async downloadZippy(url:string,options:DownloadOption){
    if(!url)throw Error("Please Put Url")
    if(!options)throw Error("Please fileName on the options")
    if(!options.fileName) throw Error("options format is not correct")
    return await downloadZippy(url,options)
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
