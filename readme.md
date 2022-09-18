# Nhentai Parser

Note : This project is only recreation based of [nana-api](https://github.com/nikkozu/nana-api) using puppeteer


## Install

```
npm install nhentparser puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
```

## Example

JS
```js
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const {Client} = require("nhentparser");
const client = new Client(puppeteer);

// Get gallery from book ID or book link
client.g("14045").then(console.log);
client.g("https://nhentai.net/g/4501").then(console.log);
```

TS/ESM
```ts
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import {Client} from "nhentparser"
const client = new Client(puppeteer);

// Get gallery from book ID or book link
client.g("14045").then(console.log);
client.g("https://nhentai.net/g/4501").then(console.log);
```

## Results

Full Object interface could be open in [utils/Interface](https://github.com/MoonLGH/nHentParser/blob/main/src/utils/interfaces.ts)

Where "Book" is the Book Interface from g,getBook,random method

and "List" is List interface from tag,search,character,artist,related,popular method

## API List

The ID of a doujin can be found can be found at after the `/g/` in the search bar or a URL.

`https://nhentai.net/g/248121` in this case `248121` is the ID.

**Client.g(ID | Link)**

- `ID | Link` can both `string` or `number`

Get book API from book ID of book Link  
return a `Book Object`

**Client.random()**  
Get random book API  
return a `Book Object`

**Client.getRelated(ID | Link)**
- alias `related` 

- `ID | Link` can both `string` or `number`

Get realated book API from book ID or book link  
return a `List Object`

**Client.homepage([page])**
- `page` is `optional` and must be a `number`

Get book list from nHentai homepage  
return a `List Object`

**Client.getPopularNow()**  
- alias `popular` 

Get book list from popular section  
return a `List Object`

**Client.search(keyword [, page, popular ])**

- `page` must be a `number`
- `popular` can be a `boolean` or `string`, if set `true` will get the `popular` list
available `string` parameter is: `today`, `all`, and `week`

Get search list from keyword provided
return a `List Object`

**Client.tag(keyword [, page, popular ])**  
Same as `Client.search()`

**Client.artist(keyword [, page, popular ])**  
Same as `Client.search()`

**Client.character(keyword [, page, popular ])**  
Same as `Client.search()`

**Client.parody(keyword [, page, popular ])**  
Same as `Client.search()`

**Client.group(keyword [, page, popular ])**  
Same as `Client.search()`