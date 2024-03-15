import { APIRequestContext } from '@playwright/test';

export class ApiHelpers {
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async makeRequest(method: string, url: string, payload?: any) {
        let response;
        switch(method.toUpperCase()){
            case 'GET':
                response = await this.apiContext.get(url);
                break;
            case 'POST':
                response = await this.apiContext.post(url, {data: payload});
                break;
            case 'PUT':
                response = await this.apiContext.put(url,{ data:payload});
                break;
            case 'DELETE':
                response = await this.apiContext.delete(url);
                break;
            default:
                throw new Error(`Unsupported method: ${method}`)
        }
        return response;
    }

}