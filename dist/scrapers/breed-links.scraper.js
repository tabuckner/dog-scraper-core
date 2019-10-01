"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_scraper_scraper_1 = require("./abstract-scraper.scraper");
class BreedLinksScraper extends abstract_scraper_scraper_1.Scraper {
    constructor(htmlString) {
        super(htmlString);
        this.dropDownSelector = 'select#breed-search';
        this.optionSelector = 'option';
    }
    getBreedLinks() {
        const links = [];
        this.targetDropDown = this.$(this.dropDownSelector).get(0);
        this.$(this.targetDropDown).find(this.optionSelector).each((index, el) => {
            const link = this.$(el).attr('value');
            if (link && link.length > 0) {
                links.push(link);
            }
        });
        return links;
    }
}
exports.BreedLinksScraper = BreedLinksScraper;
//# sourceMappingURL=breed-links.scraper.js.map