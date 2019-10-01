"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_scraper_scraper_1 = require("./abstract-scraper.scraper");
class AttributeScraper extends abstract_scraper_scraper_1.Scraper {
    constructor(htmlString) {
        super(htmlString);
        this.attributeListSelector = '.attribute-list';
        this.attributeListRowSelector = '.attribute-list__row';
        this.attributeTermSelector = '.attribute-list__term';
        this.attributeDescriptionSelector = '.attribute-list__description';
    }
    getBreedsAttributes() {
        const breedAttributes = [];
        const attributeRows = this.$(this.attributeListSelector).find(this.attributeListRowSelector);
        attributeRows.each((index, el) => {
            const $rowEl = this.$(el);
            const attributeTerm = $rowEl.find(this.attributeTermSelector).text();
            const description = $rowEl.find(this.attributeDescriptionSelector).text();
            const descriptionHasList = description.indexOf(', ') > -1;
            const attribute = attributeTerm.substring(0, attributeTerm.length - 1);
            const nextAttribute = { attribute, description };
            if (descriptionHasList) {
                const descriptionList = description.split(', ');
                nextAttribute['descriptionList'] = descriptionList;
            }
            breedAttributes.push(nextAttribute);
        });
        return breedAttributes;
    }
}
exports.AttributeScraper = AttributeScraper;
//# sourceMappingURL=attributes.scraper.js.map