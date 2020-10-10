import { GA } from '../src';

describe('GA', () => {

    const ga = new GA('UA-000000000-1');

    it('Sends a pageview to GA', async () => {
        const response = await ga.pageView({
            hostname : 'http://localhost',
            pagePath : '/index',
            pageTitle: 'Hello World',
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
            eventValue   : 0
        });
        expect(true).toBe(response);
    });

});