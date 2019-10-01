"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const akc_1 = require("../constants/akc");
const abstract_scraper_scraper_1 = require("./abstract-scraper.scraper");
class BreedLetterLinksScraper extends abstract_scraper_scraper_1.Scraper {
    constructor(htmlString) {
        super(htmlString);
        this.breedLinkCssSelector = '.breed-letters-filter__letter';
    }
    getBreedUrls() {
        return this.getBreedLetterRoutes().map((route) => {
            return `${akc_1.AKC_BASE_URL}${route}`;
        });
    }
    getBreedLetterRoutes() {
        const links = [];
        this.fillLinksArray(links);
        return links;
    }
    fillLinksArray(links) {
        this.$(`${this.breedLinkCssSelector}`).each((index, linkEl) => {
            const anchor = this.$(linkEl).find('a');
            const href = anchor.attr('href');
            if (href) {
                links.push(href);
            }
        });
    }
}
exports.BreedLetterLinksScraper = BreedLetterLinksScraper;
//# sourceMappingURL=breed-letter-links.scraper.js.map