"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_loader_1 = require("./url-loader/url-loader");
const akc_1 = require("./constants/akc");
const breed_links_scraper_1 = require("./scrapers/breed-links.scraper");
const attributes_scraper_1 = require("./scrapers/attributes.scraper");
const parse_breed_name_1 = require("./util/parse-breed-name");
class DogScraper {
    getBreedInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getBreedsPage();
            this.getBreedLinks();
            yield this.setBreedInfo();
            return this.breedInfo;
        });
    }
    setBreedInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.breedInfo = {};
            for (let i = 0; i < 2; i++) {
                const breedLink = this.breedLinks[i];
                // for (const breedLink of this.breedLinks) {
                const breedNameKey = parse_breed_name_1.parseBreedNameKey(breedLink);
                const displayName = parse_breed_name_1.parseDisplayNameFromBreedNameKey(breedNameKey);
                const nextPage = yield url_loader_1.UrlLoader.load(breedLink);
                const attributes = new attributes_scraper_1.AttributeScraper(nextPage).getBreedsAttributes();
                this.breedInfo[breedNameKey] = { displayName, attributes };
            }
        });
    }
    getBreedLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.breedLinks = new breed_links_scraper_1.BreedLinksScraper(this.breedsPageHtmlString).getBreedLinks();
        });
    }
    getBreedsPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const akcBreedsUrl = `${akc_1.AKC_BASE_URL}${akc_1.ACK_BREEDS_ROUTE}`;
            this.breedsPageHtmlString = yield url_loader_1.UrlLoader.load(akcBreedsUrl);
        });
    }
}
exports.DogScraper = DogScraper;
//# sourceMappingURL=dog-scraper.js.map