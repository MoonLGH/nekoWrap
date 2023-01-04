import { baseUrl } from "../utils/constants";
import { AnimeShort } from "../utils/interfaces";
import axios from "axios";
export async function ReleaseAnime() {
  let data = await axios.get("https://api.usamin.cc/330cceade91a6a9cd30fb8042222ed56/nekopoiandroid/recent",{
    headers:{
      "token":"JxBqD2ABN9P7ib8n0VmmgXCK7GYbqQg16KlDBtmKb71YLusKHNconNglUDNM4S8b",
      "appsignature":"QZceaZC9Nkrf4Bjsof03OyGO8OvaEZEVDxFoklX7GsbU1VT9dzfWBlqEsqU35ujuM8swvIcvNVujtII9",
      "user-agent":"okhttp/4.9.0",
    }
  })
  
  const arr:AnimeShort[] = [];
  for (let i = 0; i < data.data.length; i++) {
    arr.push({
      title: data.data[i].title,
      type:"hentai",
      url:baseUrl+`/hentai/${data.data[i].slug}`,
      thumb:data.data[i].image,
      id:data.data[i].slug,
    })
  }
  return arr
}
