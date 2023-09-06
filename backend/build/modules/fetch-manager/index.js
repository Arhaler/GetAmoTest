var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
const tryParseJson = (str) => {
    try {
        let data = JSON.parse(str);
        return data;
    }
    catch (_a) {
        return {};
    }
};
const FetchManger = () => {
    function patch(url, body = null, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: false,
                data: {}
            };
            try {
                const response = yield fetch(url, {
                    method: 'PATCH',
                    headers: headers,
                    body: body
                });
                if (response.ok) {
                    result.success = true;
                }
                result.data = tryParseJson(yield response.text());
            }
            catch (ex) {
            }
            finally {
                return result;
            }
        });
    }
    function post(url, body = null, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: false,
                data: {}
            };
            try {
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: body
                });
                if (response.ok) {
                    result.success = true;
                }
                result.data = tryParseJson(yield response.text());
            }
            catch (ex) {
            }
            finally {
                return result;
            }
        });
    }
    function get(url, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: false,
            };
            try {
                const response = yield fetch(url, {
                    method: 'GET',
                    headers: headers
                });
                if (response.ok) {
                    result.success = true;
                }
                result.data = tryParseJson(yield response.text());
            }
            catch (ex) {
            }
            finally {
                return result;
            }
        });
    }
    return {
        patch,
        post,
        get
    };
};
export default FetchManger;
//# sourceMappingURL=index.js.map