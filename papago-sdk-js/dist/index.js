Object.defineProperty(exports, '__esModule', { value: true });

var fetch = require('node-fetch');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fetch__default = /*#__PURE__*/_interopDefault(fetch);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
class Papago {
    buildHeaders() {
        return {
            'X-NCP-APIGW-API-KEY-ID': this.client_id,
            'X-NCP-APIGW-API-KEY': this.client_secret,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
    }
    fetch(params, api) {
        var _this = this;
        return _async_to_generator(function*() {
            const headers = _this.buildHeaders();
            const hasText = params.has('text');
            const hasHtml = params.has('html');
            try {
                const response = yield fetch__default.default(api, {
                    method: 'POST',
                    headers,
                    body: params
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                if (hasText) return yield response.json();
                if (hasHtml) return {
                    translatedHtml: yield response.text()
                };
                return undefined;
            } catch (error) {
                console.error(error);
            }
        })();
    }
    detect({ query }) {
        var _this = this;
        return _async_to_generator(function*() {
            const API_URL = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect';
            const headers = _this.buildHeaders();
            const formData = new URLSearchParams({
                query
            });
            try {
                const response = yield fetch__default.default(API_URL, {
                    method: 'POST',
                    headers,
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = yield response.json();
                return responseData;
            } catch (error) {
                throw error;
            }
        })();
    }
    constructor({ client_id, client_secret }){
        var _this = this;
        this.text = {
            translate: /*#__PURE__*/ _async_to_generator(function*({ from, to, text, options }) {
                var _options, _response_message_result, _response_message;
                const api = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';
                const params = new URLSearchParams({
                    source: from,
                    target: to,
                    text
                });
                const response = yield _this.fetch(params, api);
                if (!response) return {
                    message: 'Failed to translate. Please try again.'
                };
                if ((_options = options) == null ? void 0 : _options.textOnly) return {
                    translatedText: (_response_message = response.message) == null ? void 0 : (_response_message_result = _response_message.result) == null ? void 0 : _response_message_result.translatedText
                };
                return response;
            })
        };
        var _this1 = this;
        this.html = {
            translate: /*#__PURE__*/ _async_to_generator(function*({ from, to, html }) {
                const api = 'https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate';
                const params = new URLSearchParams({
                    source: from,
                    target: to,
                    html
                });
                const response = yield _this1.fetch(params, api);
                return response;
            })
        };
        this.client_id = client_id;
        this.client_secret = client_secret;
    }
}

exports.Papago = Papago;
