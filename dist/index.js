"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dog_scraper_1 = require("./dog-scraper");
const fs_1 = require("fs");
new dog_scraper_1.DogScraper().getBreedInfo().then((info) => {
    console.warn(JSON.stringify(info, null, 2)); // tslint:disable-line
    fs_1.writeFileSync('breed-info.json', JSON.stringify(info), { encoding: 'utf8' });
});
//# sourceMappingURL=index.js.map