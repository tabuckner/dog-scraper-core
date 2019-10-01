import { Scraper } from './abstract-scraper.scraper';
import { BreedAttribute } from '../models/breed-attribute.model';

export class AttributeScraper extends Scraper {
  private attributeListSelector = '.attribute-list';
  private attributeListRowSelector = '.attribute-list__row';
  private attributeTermSelector = '.attribute-list__term';
  private attributeDescriptionSelector = '.attribute-list__description';

  constructor(htmlString: string) {
    super(htmlString);
  }

  public getBreedsAttributes(): BreedAttribute[] {
    const breedAttributes: BreedAttribute[] = [];
    const attributeRows = this.$(this.attributeListSelector).find(this.attributeListRowSelector);
    attributeRows.each((index, el) => {
      const $rowEl = this.$(el);
      const attributeTerm = $rowEl.find(this.attributeTermSelector).text();
      const description = $rowEl.find(this.attributeDescriptionSelector).text();
      const descriptionHasList = description.indexOf(', ') > -1;
      const attribute = attributeTerm.substring(0, attributeTerm.length - 1);
      const nextAttribute: BreedAttribute = { attribute, description };
      if (descriptionHasList) {
        const descriptionList = description.split(', ');
        nextAttribute['descriptionList'] = descriptionList;
      }
      breedAttributes.push(nextAttribute);
    });
    return breedAttributes;
  }
}
