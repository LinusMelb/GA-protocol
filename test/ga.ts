import { GA } from '../src';
const axios = require('axios').default;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(`GA url: ${config.url}`);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Sending hits for validation
describe('GA', () => {

    // Property ID for debug purpose
    const ga = new GA('UA-2202604-2');

    it('Sends a pageview to GA', async () => {
        const response: any = await ga.pageView({
            hostname : 'http://localhost',
            pagePath : '/index',
            pageTitle: 'Hello World',
            // Example custom dimensions
            cd1      : 'Android', // e.g. System
            cd2      : 'English', // e.g. Language
        }, true);
        expect(response.status).toBe(200);
        expect(response.status).toBe(200);
        expect(response.data.hitParsingResult[0].valid).toBe(true)
    });

    it('Sends an event to GA', async () => {
        const response: any = await ga.event({
            hostname     : 'http://localhost',
            pagePath     : '/index',
            pageTitle    : 'Hello World',
            eventCategory: 'ga-event',
            eventAction  : 'click',
            eventLabel   : 'test event',
            eventValue   : 0,
            // Example custom dimensions
            cd1          : 'Android', // e.g. System
            cd2          : 'English', // e.g. Language
        }, true);
        expect(response.status).toBe(200);
        expect(response.status).toBe(200);
        expect(response.data.hitParsingResult[0].valid).toBe(true);
        
    });

});