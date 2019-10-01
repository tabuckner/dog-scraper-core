import { get } from 'request-promise';
import { AKC_BASE_URL, ACK_BREEDS_ROUTE } from '../constants/akc';

export class UrlLoader {
  
  constructor (private url?: string) {
    get(`${AKC_BASE_URL}${ACK_BREEDS_ROUTE}`)
      .then((res) => {
        console.warn(res);
      });
  }
}