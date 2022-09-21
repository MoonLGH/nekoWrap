import { Browser } from "puppeteer";
import { Download } from "../utils/interfaces";
export declare function fetchEps(browser: Browser, ID: string): Promise<Download[]>;
