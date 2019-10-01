"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = require("request-promise");
class UrlLoader {
    static load(url) {
        if (!url) {
            throw new Error('You must provide a URL.');
        }
        return request_promise_1.get(url);
    }
}
exports.UrlLoader = UrlLoader;
//# sourceMappingURL=url-loader.js.map