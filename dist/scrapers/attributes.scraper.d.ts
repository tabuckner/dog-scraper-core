import { Scraper } from './abstract-scraper.scraper';
import { BreedAttribute } from '../models/breed-attribute.model';
export declare class AttributeScraper extends Scraper {
    private attributeListSelector;
    private attributeListRowSelector;
    private attributeTermSelector;
    private attributeDescriptionSelector;
    constructor(htmlString: string);
    getBreedsAttributes(): BreedAttribute[];
}
