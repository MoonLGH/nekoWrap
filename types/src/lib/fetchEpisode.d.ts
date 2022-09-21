import { Browser } from "puppeteer";
import { download } from "../utils/interfaces";
export declare function fetchEps(browser: Browser, ID: string): Promise<download[]>;
