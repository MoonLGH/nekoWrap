import { Browser } from "puppeteer";
import { AnimeShort } from "../utils/interfaces";
export declare function search(browser: Browser, keyword: string, page?: number): Promise<AnimeShort[]>;
