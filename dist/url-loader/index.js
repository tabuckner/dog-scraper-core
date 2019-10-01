"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = require("request-promise");
class UrlLoader {
    constructor(url) {
        this.url = url;
        if (!url) {
            throw new Error('You must provide a URL.');
        }
        request_promise_1.get(url)
            .then((res) => {
            console.warn(res);
        });
    }
}
exports.UrlLoader = UrlLoader;
//# sourceMappingURL=index.js.map