"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseBreedNameKey(url) {
    if (!url || url.length < 1) {
        return url;
    }
    const parts = url.split('/dog-breeds');
    if (parts[1]) {
        return parts[1].replace(/\//g, '');
    }
}
exports.parseBreedNameKey = parseBreedNameKey;
function parseDisplayNameFromBreedNameKey(breedNameKey) {
    return breedNameKey.split('-').join(' ');
}
exports.parseDisplayNameFromBreedNameKey = parseDisplayNameFromBreedNameKey;
//# sourceMappingURL=parse-breed-name.js.map