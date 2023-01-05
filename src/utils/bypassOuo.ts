import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import {Cookie, parse} from "set-cookie-parser"

async function get(url:string):Promise<any> {
    try {
        if (url.includes("/go/")) url = url.replace("/go/", "/");
        if (url.includes("/fbc/")) url = url.replace("/fbc/", "/");
    
        let header:any = {}
        let resp = await axios.get(url);
    
        let $ = load(resp.data);
    
        let post = $("form[method='POST']").attr("action");
        let tk = $("input[name='_token']").attr("value");
        let cookie = cookieString(parse(resp.headers["set-cookie"]!));
        let body = `_token=${tk}&x-token=&v-token=bx`;
    
        header["Cookie"] = cookie;
        header["Content-Type"] = "application/x-www-form-urlencoded";
        header["Content-Length"] = byteCount(body);
        header["Referer"] = url;
        header["Sec-Fetch-Dest"] = "document";
        header["Sec-Fetch-Mode"] = "navigate";
        header["Sec-Fetch-Site"] = "same-origin";
        header["TE"] = "trailers";
    
        try {
            const resp = await axios({
                method: 'POST',
                url: post!.replace('/go', '/xreallcygo'),
                data: body,
                headers: header,
                maxRedirects: 0,
              });
            if (resp.data) {
                return (await get(url));
            }
        } catch (err:any) {
            if (err.response?.headers?.location) return err.response.headers.location;
        }
    } catch (err) {
        if((err as AxiosError).response!.status === 403){
            return await get(url)
        }
        return err
    }
}
function cookieString(co:Cookie[]) {
    let s = ``;
    for (let c in co) {
        if (co[c].value == "deleted") continue;
        s = `${s} ${co[c].name}=${encodeURIComponent(co[c].value)};`;
    }
    s = s.substring(0, s.length - 1);
    return s.substring(1);
}


export async function bypassOuo(url:string) {
    return ((await get(url)) as string)
}

function byteCount(string:string) {
    return encodeURI(string).split(/%..|./).length - 1;
}