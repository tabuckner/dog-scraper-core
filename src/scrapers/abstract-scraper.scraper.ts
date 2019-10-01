import { load } from 'cheerio';
export class Scraper {
  protected $: CheerioStatic;

  constructor(protected htmlString: string,
              protected options?: CheerioOptionsInterface) {
    if (!this.htmlString) {
      throw new Error('You must provide an HTML string.');
    }
    this.$ = this.load(htmlString, options);
  }

  protected load(htmlString: string, options?: CheerioOptionsInterface): CheerioStatic {
    return load(htmlString, options);
  }

  
}