import { BreedAttribute } from './breed-attribute.model';

export interface BreedInfo {
  [key: string]: {
    displayName: string,
    attributes: BreedAttribute[],
  };
}
