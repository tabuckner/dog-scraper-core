import { UrlLoader } from "./url-loader/url-loader";
import { AKC_BASE_URL, ACK_BREEDS_ROUTE } from "./constants/akc";
import { BreedLinksScraper } from "./scrapers/breed-links.scraper";
import { AttributeScraper } from "./scrapers/attributes.scraper";
import { parseBreedNameKey, parseDisplayNameFromBreedNameKey } from "./util/parse-breed-name";
import { BreedAttribute } from "./models/breed-attribute.model";
import { BreedInfo } from "./models/breed-info.model";

export class DogScraper {
  private breedInfo: BreedInfo;
  private breedsPageHtmlString: string;
  private breedLinks: string[];

  public async getBreedInfo() {
    await this.getBreedsPage();
    this.getBreedLinks();
    await this.setBreedInfo();
    return this.breedInfo;
  }

  private async setBreedInfo() {
    this.breedInfo = {};
    for (let i = 0; i < 2; i++) {
      const breedLink = this.breedLinks[i];
      // for (const breedLink of this.breedLinks) {
      const breedNameKey = parseBreedNameKey(breedLink);
      const displayName = parseDisplayNameFromBreedNameKey(breedNameKey);
      const nextPage = await UrlLoader.load(breedLink);
      const attributes: BreedAttribute[] = new AttributeScraper(nextPage).getBreedsAttributes();
      this.breedInfo[breedNameKey] = { displayName, attributes };
    }
  }

  private async getBreedLinks() {
    this.breedLinks = new BreedLinksScraper(this.breedsPageHtmlString).getBreedLinks();
  }

  private async getBreedsPage() {
    const akcBreedsUrl = `${AKC_BASE_URL}${ACK_BREEDS_ROUTE}`;
    this.breedsPageHtmlString = await UrlLoader.load(akcBreedsUrl)
  }
}
