"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = require("request-promise");
const akc_1 = require("../constants/akc");
class UrlLoader {
    constructor(url) {
        this.url = url;
        request_promise_1.get(`${akc_1.AKC_BASE_URL}${akc_1.ACK_BREEDS_ROUTE}`)
            .then((res) => {
            console.warn(res);
        });
    }
}
exports.UrlLoader = UrlLoader;
//# sourceMappingURL=index.js.map