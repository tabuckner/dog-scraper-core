import { BreedInfo } from './models/breed-info.model';
export declare class DogScraper {
    private breedInfo;
    private breedsPageHtmlString;
    private breedLinks;
    /**
     * Single Public Method to Scrape Dog Breed Data from AKC website.
     */
    getBreedInfo(): Promise<BreedInfo>;
    private setBreedInfo;
    private getBreedLinks;
    private getBreedsPage;
}
