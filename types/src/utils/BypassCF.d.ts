/// <reference types="node" />
import { Page } from "puppeteer";
export declare function bypass(page: Page, url: string): Promise<{
    page: Page;
    responseBody: string;
    responseData: Buffer;
}>;
