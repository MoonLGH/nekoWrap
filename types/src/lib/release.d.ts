import { Browser } from "puppeteer";
import { AnimeShort } from "../utils/interfaces";
export declare function Release(browser: Browser, page?: number): Promise<AnimeShort[]>;
