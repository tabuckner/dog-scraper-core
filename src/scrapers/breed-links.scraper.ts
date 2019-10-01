import { Scraper } from './abstract-scraper.scraper';

export class BreedLinksScraper extends Scraper {
  private dropDownSelector = 'select#breed-search';
  private targetDropDown: CheerioStatic;
  private optionSelector = 'option';

  constructor(htmlString: string) {
    super(htmlString);
  }

  public getBreedLinks(): string[] {
    const links: string[] = [];
    this.targetDropDown = this.$(this.dropDownSelector).get(0);
    this.$(this.targetDropDown).find(this.optionSelector).each((_, el) => {
      const link = this.$(el).attr('value');
      if (link && link.length > 0) {
        links.push(link);
      }
    });
    return links;
  }
}
