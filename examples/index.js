const DogScraper = require('../dist/index.js').DogScraper;

const myScraper = new DogScraper();
myScraper.getBreedInfo.then((breedInfo) => console.warn(breedInfo));