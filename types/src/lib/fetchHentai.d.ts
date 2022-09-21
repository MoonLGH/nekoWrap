import { Browser } from "puppeteer";
import { HentaiObject } from "../utils/interfaces";
export declare function fetch(browser: Browser, ID: string): Promise<HentaiObject>;
