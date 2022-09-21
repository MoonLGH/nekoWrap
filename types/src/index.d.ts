import { PuppeteerLaunchOptions, Browser } from "puppeteer";
import { PuppeteerExtra } from "puppeteer-extra";
export declare class Client {
    pup: PuppeteerExtra;
    pupBrowser?: Browser;
    opt: PuppeteerLaunchOptions;
    constructor(pups: PuppeteerExtra, options?: PuppeteerLaunchOptions);
    start(): Promise<void>;
    release(page?: number): Promise<import("./lib/release").AnimeShort[]>;
    hentai(page?: number): Promise<import("./lib/hentai").AnimeShort[]>;
    search(keyword: string, page?: number): Promise<import("./lib/search").SearchResult[]>;
    fetchHentai(id: string): Promise<import("./lib/fetchHentai").HentaiObject>;
    Ouo(url: string): Promise<string | null>;
    Mirror(url: string): Promise<import("./utils/bypassMirror").Mirror[]>;
    fetchEpisode(id: string): Promise<import("./lib/fetchEpisode").download[]>;
    close(): Promise<void | undefined>;
    private checkInitialize;
}
