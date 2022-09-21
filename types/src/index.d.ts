import { PuppeteerLaunchOptions, Browser } from "puppeteer";
import { PuppeteerExtra } from "puppeteer-extra";
export declare class Client {
    pup: PuppeteerExtra;
    pupBrowser?: Browser;
    opt: PuppeteerLaunchOptions;
    constructor(pups: PuppeteerExtra, options?: PuppeteerLaunchOptions);
    start(): Promise<void>;
    release(page?: number): Promise<import("./utils/interfaces").AnimeShort[]>;
    hentai(page?: number): Promise<import("./utils/interfaces").AnimeShort[]>;
    search(keyword: string, page?: number): Promise<import("./utils/interfaces").AnimeShort[]>;
    fetchHentai(id: string): Promise<import("./utils/interfaces").HentaiObject>;
    Ouo(url: string): Promise<string | null>;
    Mirror(url: string): Promise<import("./utils/interfaces").Mirror[]>;
    fetchEpisode(id: string): Promise<import("./utils/interfaces").Download[]>;
    close(): Promise<void | undefined>;
    private checkInitialize;
}
