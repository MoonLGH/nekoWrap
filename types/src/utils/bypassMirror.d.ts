import { Page } from "puppeteer";
export declare function bypassMirrored(page: Page, url: string): Promise<Mirror[]>;
export interface Mirror {
    host: string;
    url: string;
    status: string;
}
