export function parseBreedNameKey(url: string): string {
  if (!url || url.length < 1) {
    return url;
  }
  const parts = url.split('/dog-breeds');
  if (parts[1]){
    return parts[1].replace(/\//g, '');
  }
}

export function parseDisplayNameFromBreedNameKey(breedNameKey: string) {
  return breedNameKey.split('-').join(' ');
}