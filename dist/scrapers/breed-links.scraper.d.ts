import { Scraper } from './abstract-scraper.scraper';
export declare class BreedLinksScraper extends Scraper {
    private dropDownSelector;
    private targetDropDown;
    private optionSelector;
    constructor(htmlString: string);
    getBreedLinks(): string[];
}
