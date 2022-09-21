import { Browser } from "puppeteer";
import { AnimeShort } from "../utils/interfaces";
export declare function hentai(browser: Browser, page?: number): Promise<AnimeShort[]>;
