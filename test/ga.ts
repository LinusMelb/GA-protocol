import { GA } from '../src';
const axios = require('axios').default;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config.url);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

describe('GA', () => {

    const ga = new GA('UA-000000000-1');

    it('Sends a pageview to GA', async () => {
        const response = await ga.pageView({
            hostname : 'http://localhost',
            pagePath : '/index',
            pageTitle: 'Hello World',
            // Example custom dimensions
            cd1      : 'Android', // e.g. System
            cd2      : 'English', // e.g. Language
        });
        expect(true).toBe(response);
    });

    it('Sends an event to GA', async () => {
        const response = await ga.event({
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
        });
        expect(true).toBe(response);
    });

});