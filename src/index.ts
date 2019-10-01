import { DogScraper } from './dog-scraper';
import { writeFileSync } from 'fs';

new DogScraper().getBreedInfo().then((info) => {
  console.warn(JSON.stringify(info, null, 2)); // tslint:disable-line
  writeFileSync('breed-info.json', JSON.stringify(info), { encoding: 'utf8' });
});
