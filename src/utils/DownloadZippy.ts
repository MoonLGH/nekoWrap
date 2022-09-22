import axios from "axios";
import {load} from "cheerio";
import {createWriteStream} from "fs"
import { DownloadOption } from "./interfaces";
declare global {
    interface String {
        substringBefore(before : string) : string;
        substringAfter(before : string) : string;
    }
}

String.prototype.substringBefore = function(before:string) {
    return this.substring(0, this.indexOf(before));
  };
  
  String.prototype.substringAfter = function(after:string) {
    return this.substring(this.indexOf(after)+after.length, this.length);
  };

export async function parse(url:string) {
    const res = await axios.get(url)
    const $ = load(res.data);
    const scr = $("#dlbutton").parent().find("script").html();
    let link = url.substringBefore("/v/");
    const numbs = scr!.substringAfter("\" + (").substringBefore(") + \"");
    const firstString = scr!.substringAfter(" = \"").substringBefore("\" + (");
    const num = parseInt(numbs.substringBefore(" % "));
    const lastString = scr!.substringAfter("913) + \"").substringBefore("\";");
    const nums = num % 51245 + num % 913;
    link += firstString + nums.toString() + lastString;

    let name = $("#lrbox > div:nth-child(2) > div:nth-child(1) > font:nth-child(4)").text()
    return {link,name};
  }

export async function downloadZippy(url:string,options:DownloadOption){
    const {data} = await axios.get(url,{
        responseType: "stream",
    })
    const writeStream = createWriteStream(`${options.fileName}`);
    
    data.pipe(writeStream);

    return data
}