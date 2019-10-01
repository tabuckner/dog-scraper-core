import { get, RequestPromise } from 'request-promise';

export class UrlLoader {

  public static load(url: string): RequestPromise {
    if (!url) {
      throw new Error('You must provide a URL.');
    }
    return get(url);
  }

}
