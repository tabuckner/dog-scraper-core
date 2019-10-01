import { DogScraper, BreedInfo } from '../dist';
import { writeFileSync } from 'fs';

new DogScraper().getBreedInfo().then((info: BreedInfo) => {
  console.warn(JSON.stringify(info, null, 2)); // tslint:disable-line
  writeFileSync('./data/breed-info.json', JSON.stringify(info), { encoding: 'utf8' });
});
