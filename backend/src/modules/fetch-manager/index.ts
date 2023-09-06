import fetch, { HeadersInit } from 'node-fetch';
import { FetchResponse } from './types.js';

const tryParseJson = (str:string) => {
    try{
        let data = JSON.parse(str);
        return data;
    }catch{
        return {};
    }
}

const FetchManger = () => {
    /**
     * Отправляет PATCH запрос по указанному url адресу
     * @param url Адрес запроса
     * @param body Тело запроса в Json строке
     * @param headers Заголовки типа {'Content-Type' : 'application/json; charset=UTF-8'}
     * @returns Возвращает FetchResponse
     */
    async function patch(url:string, body:string|null = null, headers:HeadersInit = {}){
        const result : FetchResponse = {
            success: false,
            data: {}
        };

        try{
            const response = await fetch(url, {
                method: 'PATCH',
                headers: headers,
                body: body
            });

            if(response.ok){
                result.success = true;
            }
            result.data = tryParseJson(await response.text());
        }catch(ex){
            
        }finally{
            return result;
        }
    }


    /**
     * Отправляет POST запрос по указанному url адресу
     * @param url Адрес запроса
     * @param body Тело запроса в Json строке
     * @param headers Заголовки типа {'Content-Type' : 'application/json; charset=UTF-8'}
     * @returns Возвращает FetchResponse
     */
    async function post(url:string, body:string|null = null, headers:HeadersInit = {}){
        const result : FetchResponse = {
            success: false,
            data: {}
        };

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });

            if(response.ok){
                result.success = true;
            }
            result.data = tryParseJson(await response.text());
        }catch(ex){
            
        }finally{
            return result;
        }
    }

    /**
     * Отправляет GET запрос по указанному url адресу
     * @param url Адрес запроса с параметрами или без
     * @param headers Заголовки типа {'Content-Type' : 'application/json; charset=UTF-8'}
     * @returns Возвращает FetchResponse
     */
    async function get(url:string, headers:HeadersInit = {}){
        const result : FetchResponse = {
            success: false,
        };

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            if(response.ok){
                result.success = true;
            }
            result.data = tryParseJson(await response.text());
        }catch(ex){
            
        }finally{
            return result;
        }
    }

    return {
        patch,
        post,
        get
    };
};
export default FetchManger;