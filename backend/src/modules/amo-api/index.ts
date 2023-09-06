import FetchManger from "../fetch-manager/index.js";
import MinimalContactModel from "./types/contact.js";
import MinimalLeadModel from "./types/lead.js";

const authData = {
    client_id: "61834f9c-0598-4278-919e-53d3f5fff6da",
    client_secret: "cZFFhJoGkv5JAZC2s9VuUHeCxwU6jN69GbSD1M3gQL18D54zRmQWzt0xf6diDYjX",
    redirectUri: "https://getamotest.onrender.com/amo/updateauthcode",
    authCode: "def50200e821e3e999f8a739caafd7adb8e0b9a488f964afded519c83c2b3d0758c0e8e513571b19cb3d5e5dbd94f16ee899eeac660528d176769083ff95d1f597869f18b502eb8765907841e663a53476e12842cff561225369c1d7b459da4bcd3a8830df001e92119f56226a86d8ad9309311781d2ce6ae30fb6383f9e3e9ccc8224763259367c06be6dc458e7b1edf11320b269fef2f5f97d5218088b3b00ef44173dce8a2fbf215e68169f1d5133c1d3231a62ce98ea48c4b341f0afbdcb081ea7e2b27c4071226bf6160ca1932d876b57638f68cb709455fb5b69133198b971b3b78b899384a8732f165b46e5bbc3dfd738bfb2670dc327324e488a9fb1876e96a29512ddbd7f911c9954ebe6a12d305ac2fbba467bc12c65f11b1b3f55e6654dfaad9949e6ae97c06a8249aa1c5b1d3c39d5875525cd27e4446bd14b3e7a2c53d6d3b27f36e63375ab6ee45b910d4ba8b211a11046a0eb51a259b82353b1c4274721e3e87c8718c04dc10a8c0bc7cd840b514f3562b28395573bf050868444ef82dee81dcff9f07d92e914d5a7d584f7b4deb5e3080b7cfc79d701752f266298815c1a9535411145d7ee33682455f0ef8c050d5394a4e735d857df7846f406df56e6130afff21842a849674ce064599bc23b3440d83bbfe805069b9fe24738ffa3c7508c99d24f10a20797f9f05c4058ab0081383d8d1a1060e3141b34ed5fdc67a2",
    refreshToken: "def502008355d806b966c9aef83ed30ae819083849e2cb50d485ca6c4a124ac14bc58c618e2b3280be4cf952e3cc595b0f9709b05fc46691787081132892f28c797a7fb7a7f1584d14e2ee278dee0b896ad6ed9e6f1b3ac84f7b040e8f3777717fee10a5a890ae6a9900c663538156225e4e93cc3210c2ac2aacfd2ab11217aa069753a93660268960cc406d62fd33d42b6ec1f566fdc0bc3038e8011147d0a6705ce85f80748afb28cd86f52ccfbc6a45202421f1e2439baeba71ef6416db22e284370bdf09dea432fdfeea47552b5fea6b3c1db18a6004ed0221276d318310a800c71356a1be52d7e7bc3ae48798bcd732496a7868d946dc4a4974b94faa474b40456efbd92f341382dff5359bdba44a5756e317c027a5e20b80a84436e53de94e6b50663b7342aa8fc72955eaf4f21188bed6830d71455b122f9188a49c35de2689dfd7343e375506081f4a8b68fc1357a7ef0215cbc9e5d77b9b93aafc2fd87e4e53bd5f6a48bcff01f35181e6e516fb7a12005484806b0a095906544740548fbf5fcfb36aa8fd7e873998f6c10e08c5febdeafe1bad4b0542543e1398a335a203cc1f11c11f8f0d27092ec65ad2dcfb4230614e9ccc133db2d23e8be44cb9cd35e80c15528fe6cd78ffc6de019004a2e90419c6b29a0c2a29b6060d13659693cb9878229df238ae3022f12a14fb6a",
    accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRhYjc0NTI2ZWZlMjFmZmJmNWI2OTgxZmNlMWVhMGQ1ODlkZWU4MGE0OTk5YjkxYTVhOGFjYjQxNThmZTYzOThiZGViNjhhYzNkNTBhNzNiIn0.eyJhdWQiOiI2MTgzNGY5Yy0wNTk4LTQyNzgtOTE5ZS01M2QzZjVmZmY2ZGEiLCJqdGkiOiI0YWI3NDUyNmVmZTIxZmZiZjViNjk4MWZjZTFlYTBkNTg5ZGVlODBhNDk5OWI5MWE1YThhY2I0MTU4ZmU2Mzk4YmRlYjY4YWMzZDUwYTczYiIsImlhdCI6MTY5Mzk5NTEyMywibmJmIjoxNjkzOTk1MTIzLCJleHAiOjE2OTQwODE1MjMsInN1YiI6IjEwMDQ4MjE4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxMjc5NjQyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOiJ2MiIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.AnEEehpJTvTQbPd-5NzxDIIiyZRqvoUIQXTQZPVkoXbg0bCv6pmKmEfvTIiC_lE5xieNnxsQVCDQwC6HynGBl4BGOA83c2vVZPQuEefCE3pAjUhausXpzr9Dau6s9dqnPeOl5LneePTuBsk5LewDwcKCTsU_K9baRb2IRPZTefkM226AVyRN_Cn-XheBjCWn42IMA3SgCw9NhAxsD1Ggbi5yT-2s2CZhGbx4jFNQRWOCxsXO7R52IVYJnEp5YZuvr7YxT5-rlee6o3lCqe-Pfl4JTQHeGr1kBn_YwkbLTOb3qOyjBSqPxmPWRwX266qwMZznNyenK8oUEtIIXwSFJg",
    accessTokenExpires: new Date(Date.parse("2023-09-07T10:12:03.173Z"))
}

/**
 * Возвращает объект менеджера работающего с amo api v4 
 * @param subdomain - Субдомен от amoCRM (название учетной записи)
 */
const AmoApi = (subdomain:string) => {
    const fetchManager = FetchManger();
    const baseUrl = `https://${subdomain}.amocrm.ru`;

    function updateAccessToken(data:{token_type:string, expires_in:number, access_token:string, refresh_token:string}){
        authData.refreshToken = data.refresh_token;
        authData.accessToken = data.access_token;
        authData.accessTokenExpires = new Date(Date.now() + (1000 * data.expires_in));
    }


    function getHeaders(){
        return {'Content-Type' : 'application/json; charset=UTF-8'};
    }
    function getHeadersWithToken(){
        return {'Content-Type' : 'application/json; charset=UTF-8', 'Authorization' : `Bearer ${authData.accessToken}`};
    }

    
    /**
     * Получает или обновляет auth_code в authData, если срок его действия истек.
     */
    async function checkAccessToken(){
        const currentDate = new Date();
        if(authData.accessToken.length > 1 && authData.accessTokenExpires.getTime() > currentDate.getTime()) return true;

        const body = JSON.stringify({
            client_id: authData.client_id,
            client_secret: authData.client_secret,
            grant_type: authData.accessToken == "" ? "authorization_code" : "refresh_token",
            code: authData.authCode,
            redirect_uri: authData.redirectUri
        });
        const result = await fetchManager.post(`${baseUrl}/oauth2/access_token`, body, getHeaders());


        if(result.success && result.data){
            updateAccessToken(result.data);
            return true;
        }else{
            return false;
        }
    }


    /**
     * Поиск контактов по номеру телефона или email.
     * @param query - Номер телефона или email искомых контактов.
     * @returns Массив найденных контактов при успешном выполнении запроса.
     */
    async function getContacts(query:string){
        const hasToken = await checkAccessToken();
        if(!hasToken) return;

        const headers = getHeadersWithToken();
        return await fetchManager.get(`${baseUrl}/api/v4/contacts?query=${query}`, headers);
    }


    /**
     * Создание контактов.
     * @param contacts - Массив создаваемых контактов.
     * @returns Массив созданных контактов при успешном выполнении запроса.
     */
    async function createContacts(contacts:Array<MinimalContactModel>){
        if(contacts.length == 0) return;

        const hasToken = await checkAccessToken();
        if(!hasToken) return;

        const body = JSON.stringify(contacts);

        const headers = getHeadersWithToken();
        return await fetchManager.post(`${baseUrl}/api/v4/contacts`, body, headers);
    }


    /**
     * Обновление контактов.
     * @param contacts - Массив обновляемых контактов.
     * @returns Массив обновленных контактов при успешном выполнении запроса.
     */
    async function updateContacts(contacts:Array<MinimalContactModel>){
        if(contacts.length == 0) return;

        const hasToken = await checkAccessToken();
        if(!hasToken) return;
        
        const body = JSON.stringify(contacts);

        const headers = getHeadersWithToken();
        return await fetchManager.patch(`${baseUrl}/api/v4/contacts`, body, headers);
    }


    /**
     * Создание сделок.
     * @param contacts - Массив создаваемых сделок.
     * @returns Массив созданных сделок при успешном выполнении запроса.
     */
    async function createLeads(leads:Array<MinimalLeadModel>){
        if(leads.length == 0) return;

        const hasToken = await checkAccessToken();
        if(!hasToken) return;

        const body = JSON.stringify(leads);

        const headers = getHeadersWithToken();
        return await fetchManager.post(`${baseUrl}/api/v4/leads`, body, headers);
    }


    return {
        getContacts,
        createContacts,
        updateContacts,
        
        createLeads
    }
}
export default AmoApi;