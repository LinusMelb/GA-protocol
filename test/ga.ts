import { GA } from '../src';

describe('GA', () => {

    const ga = new GA('UA-000000-2');

    it('Sends a pageview to GA', async () => {
        const response = await ga.pageView({
            dh: 'http://localhost',
            dp: '/index',
            dt: 'Hello World',
        });
        expect(true).toBe(response);
    });


    it('Sends an event to GA', async () => {
        const response = await ga.event({
            dh: 'http://localhost',
            dp: '/index',
            dt: 'Hello World',
            ec: 'ga-event',
            ea: 'click',
            el: 'test event',
            ev: 0
        });
        expect(true).toBe(response);
    });

});