"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
class Scraper {
    constructor(htmlString, options) {
        this.htmlString = htmlString;
        this.options = options;
        if (!this.htmlString) {
            throw new Error('You must provide an HTML string.');
        }
        this.$ = this.load(htmlString, options);
    }
    load(htmlString, options) {
        return cheerio_1.load(htmlString, options);
    }
}
exports.Scraper = Scraper;
//# sourceMappingURL=abstract-scraper.scraper.js.map