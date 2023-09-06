var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import FetchManger from "../fetch-manager/index.js";
import AuthData from './authData.json' assert { type: "json" };
const authData = {
    client_id: "61834f9c-0598-4278-919e-53d3f5fff6da",
    client_secret: "cZFFhJoGkv5JAZC2s9VuUHeCxwU6jN69GbSD1M3gQL18D54zRmQWzt0xf6diDYjX",
    redirectUri: "https://getamotest.onrender.com/amo/updateauthcode",
    authCode: "def50200425f79486bb40a420149c1bc510888808e83fd8acf956314102c27d2639c6a99185bbfa90c1b9095cdafd22a2a24949f0fb82e78e2fa3944cda5f80ced159f3599b63a8dfafc988af6a7127df3050a7e7decbb19fedc3dae5ccea30c5b613f8b23bde55a57f730a9b951ba65717df94750edba8456515b8d07bd19e9a7fba33c5a0107adf95e779faa2791b3954195ac5a4a4ea752b2f2d629fb010d5a60330fcbd0c8f9831ba177b7c3c30f292937b4a4ad7adebd6101d0ea7b12e9039c310874d03035b1cfa6491c67f6a59cfc60faa43d2fc1a7d56afbfa25c605d80f908ac13b8f681eb5d20c662b241345bd3fef2f3c2b31cc758c345e5a00e39337b01312ddaa6e1c91b797349cfc05988e7003c28fa4483459b162b5e9239898285fa701c47584db3b2da067afd63cf74c7a33baae9f8eb05dd7ad25c601953632cc8d74b928500c87f1970afeac03aac18286fac20a59df57f217bfdf10341f6fbf94a7d1895979ecb634fe69d843253916573c97a5d89c27ea33711afca031bb405b905c4cebb97f63cd922a6ff07962983e5240c9c1090f791d8dbd19c8566d4af2f994e2360cf8d9eaff48e24c824e9147c563263f1974e5beb19c2c3baaf729b43e7805cb16e92335b6956fa17a3c32d716890844127d6972b8d3cec887dee6721348cd8d0d24ba9bcd13c5204840f964e5362812508cc80601bbcbac8fdb8b95bc",
    accessToken: "",
    accessTokenExpires: new Date(),
    refreshToken: ""
};
const AmoApi = (subdomain) => {
    const fetchManager = FetchManger();
    const baseUrl = `https://${subdomain}.amocrm.ru`;
    function updateAccessToken(data) {
        AuthData.refreshToken = data.refresh_token;
        authData.refreshToken = data.refresh_token;
        authData.accessToken = data.access_token;
        authData.accessTokenExpires = new Date(Date.now() + (1000 * data.expires_in));
        console.log(authData.accessTokenExpires);
    }
    function getHeaders() {
        return { 'Content-Type': 'application/json; charset=UTF-8' };
    }
    function getHeadersWithToken() {
        return { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${authData.accessToken}` };
    }
    function checkAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            if (authData.accessToken.length > 1 && authData.accessTokenExpires.getTime() > currentDate.getTime())
                return true;
            const body = JSON.stringify({
                client_id: authData.client_id,
                client_secret: authData.client_secret,
                grant_type: authData.accessToken == "" ? "authorization_code" : "refresh_token",
                code: authData.authCode,
                redirect_uri: authData.redirectUri
            });
            const result = yield fetchManager.post(`${baseUrl}/oauth2/access_token`, body, getHeaders());
            if (result.success && result.data) {
                updateAccessToken(result.data);
                return true;
            }
            else {
                return false;
            }
        });
    }
    function getContacts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasToken = yield checkAccessToken();
            if (!hasToken)
                return;
            const headers = getHeadersWithToken();
            return yield fetchManager.get(`${baseUrl}/api/v4/contacts?query=${query}`, headers);
        });
    }
    function createContacts(contacts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (contacts.length == 0)
                return;
            const hasToken = yield checkAccessToken();
            if (!hasToken)
                return;
            const body = JSON.stringify(contacts);
            const headers = getHeadersWithToken();
            return yield fetchManager.post(`${baseUrl}/api/v4/contacts`, body, headers);
        });
    }
    function updateContacts(contacts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (contacts.length == 0)
                return;
            const hasToken = yield checkAccessToken();
            if (!hasToken)
                return;
            const body = JSON.stringify(contacts);
            const headers = getHeadersWithToken();
            return yield fetchManager.patch(`${baseUrl}/api/v4/contacts`, body, headers);
        });
    }
    function createLeads(leads) {
        return __awaiter(this, void 0, void 0, function* () {
            if (leads.length == 0)
                return;
            const hasToken = yield checkAccessToken();
            if (!hasToken)
                return;
            const body = JSON.stringify(leads);
            const headers = getHeadersWithToken();
            return yield fetchManager.post(`${baseUrl}/api/v4/leads`, body, headers);
        });
    }
    return {
        getContacts,
        createContacts,
        updateContacts,
        createLeads
    };
};
export default AmoApi;
//# sourceMappingURL=index.js.map