/// <reference types="cheerio" />
export declare class Scraper {
    protected htmlString: string;
    protected options?: CheerioOptionsInterface | undefined;
    protected $: CheerioStatic;
    constructor(htmlString: string, options?: CheerioOptionsInterface | undefined);
    protected load(htmlString: string, options?: CheerioOptionsInterface): CheerioStatic;
}
