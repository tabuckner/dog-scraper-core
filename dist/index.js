"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dog_scraper_1 = require("./dog-scraper");
new dog_scraper_1.DogScraper().getBreedInfo().then((info) => {
    console.warn(JSON.stringify(info, null, 2));
});
//# sourceMappingURL=index.js.map