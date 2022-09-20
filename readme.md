# Nekopoi Wrapper

Note : This project is based


## Install

```
npm install nekowrap puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
```

## Example

JS
```js
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { Client } = require("nekowrap");
const client = new Client(puppeteer);

// Get Latest Release From nekopoi 
await client.start();
let res = await client.release()
console.log(res)
client.close();

```

TS/ESM
```ts
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import { Client } from "nekowrap"
const client = new Client(puppeteer);

// Get Latest Release From nekopoi 
await client.start();
let res = await client.release()
console.log(res)
client.close(); 
```

## API List

```js 
// Import the package


const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { Client } = require("nekowrap");
const client = new Client(puppeteer);


// Get latest update
async function release() {
    const res = await client.release()
    console.log(res)
}

// Get Hentai Page
async function hentai() {
    const res = await client.hentai()
    console.log(res)

    /*
    Expected output:
    {
    "result": [
        {
            "type": string,
            "url": string,
            "thumb": string,
            "title": string,
            "id": string
        }
    ]
    }
    */
}

async function search() {
    const res = await client.search("Shoujo ramune")
    console.log(res)

    /*
    Expected output:
    {
    "result": [
        {
            "type": string,
            "url": string,
            "thumb": string,
            "title": string,
            "id": string
        }
    ]
    }
    */

}

// Fetch Hentai From ID
async function fetchHentai() {
    const res = await client.fetchHentai("shoujo-ramune/")
    console.log(res)

    /*
    Expected output:
    {
    "result": [
        {
            japanese: string;
            jenis: string;
            episode: string;
            status: string;
            tayang: string;
            produser: string;
            genres: string;
            durasi: string;
            skor: string;
            episodeList: eps[]
        }
    ]
    }
    */
}

// Bypass Ouo
async function Ouo() {
    const res = await client.Ouo("https://ouo.io/C4s5Gdg")
    console.log(res)
    /*
    Expected output: string,
    */
}

// Mirror Bypass
async function Mirror() {
    const res = await client.Mirror("https://www.mirrored.to/files/4YPX8MZW/[NekoPoi]_Isekai_Harem_Monogatari_-_[720P][nekopoi.care].mp4_links")
    console.log(res)
    /*
    Expected output:
    [
        {
            host:string,
            url:string,
            status:string,
        }
    ]
    */
}

// Close Puppeter
async function close(){
    await client.close()
}

```