import { DogScraper } from "./dog-scraper";

new DogScraper().getBreedInfo().then((info) => {
  console.warn(JSON.stringify(info, null, 2));
});