# NekoWrap

Note : This project is based    

Real Note : You fr can get ip banned from neko by using this, i'm not responsible for that


## TODO

[] make seperate of zippy utiis so if zs scraper broke, we dont need patches
[] Implement Genres <br>
[] Add more examples <br ,>

## Install

```
npm install nekowrap puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
```

## Example
All example can be looked from /Example, its using ts deal with it.


## Interface Refrences
Interfaces for what each method returns can be founded in [src/utils/interfaces.ts](https://github.com/MoonLGH/nekopoi-Wrapper/blob/main/src/utils/interfaces.ts)

## Example

```ts
// Import the package

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const {Client} = require("nekowrap");

// Or in esm
import {Client} from "nekowrap";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());


(async ()=>{
  const client = new Client(puppeteer);
  await client.start();
    // Do afterward functiona
})();
```

## API


? means optional on parameter <br>

Default value for optional Pages are 1

```ts

// Get latest update
async function release() {
    const res = await client.release(Page?)
    console.log(res)
    // Returns : AnimeShort[]
}

// Get Hentai Page
async function hentai() {
    const res = await client.hentai(Page?)
    console.log(res)
    // Returns : AnimeShort[]
}

async function search() {
    const res = await client.search("Isekai harem monogatari",Page?)
    console.log(res)
    // Returns : AnimeShort[]
}

// Fetch Hentai From ID
async function fetchHentai() {
    const res = await client.fetchHentai("isekai-harem-monogatari/",Page?)
    console.log(res)
    // Returns : HentaiObject
}

async function fetchEpisode() {
    let eps = await client.fetchEpisode("isekai-harem-monogatari-episode-2-subtitle-indonesia/")
    console.log(res)
    // Returns : Download
}

// Bypass Ouo
async function Ouo() {
    const res = await client.Ouo("https://ouo.io/C4s5Gdg")
    console.log(res)
    // Expected output : String
}

// Mirror Bypass
async function Mirror() {
    const res = await client.Mirror("https://www.mirrored.to/files/4YPX8MZW/[NekoPoi]_Isekai_Harem_Monogatari_-_01_[720P][nekopoi.care].mp4_links")
    console.log(res)
    // Returns : Mirror[]
}

// Close Puppeter
async function close(){
    await client.close()
    // Expected : puppeteer.close() or process.exit() 
}

```