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
import { genrelistType } from "./utils/interfaces";
export class PuppeteerClient {
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

  async genre(genre:genrelistType, page?:number) {
    this.checkInitialize();
    if(!genre || genre.length < 1) {
      throw Error("Please input a string")
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


import {generateConfig} from "./utils/Axios";
import {latest} from "./lib/AxiosLatest";
import axios, {AxiosInstance} from "axios";
export class NekoClient {
  private _config: any;
  private _ready: boolean = false;
  client!: AxiosInstance;
  constructor() {
  }

  async start() {
    this._config = await generateConfig();
    this._ready = true;
    this.client = this.CreateClient();
  }

  get router() {
    return this._config.route.first + "/" + this._config.route.second;
  }

  private CreateClient(){
      let header = {
        "token": this._config.Token,
        "accept": this._config.axiosConfig.headers["accept"],
        "appbuildcode": this._config.appBuildCode,
        "appsignature": this._config.appSignature,
        "accept-encoding": this._config.axiosConfig.headers["accept-encoding"],
        "user-agent": this._config.axiosConfig.headers["user-agent"]
      }

      return axios.create({
        baseURL: this._config.BASE_URL,
        headers: header
      })
  }

  async latest(){
    if(!this._ready) throw Error("Client is not ready");
    let { data } = await this.client.get(this.router+"/recent")
    return latest(data);
  }

}

