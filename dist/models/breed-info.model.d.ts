import { BreedAttribute } from './breed-attribute.model';
export interface BreedInfo {
    [breedName: string]: {
        displayName: string;
        attributes: BreedAttribute[];
    };
}
