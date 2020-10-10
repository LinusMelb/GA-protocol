import { GA } from '../src/';

const start = async () => {

    const ga = new GA('UA-XXXXXXXXX-X');

    // Pageview Hit
    const pageviewRes:any = await ga.pageView({
        hostname: 'http://localhost',
        pagePath: '/index',
        pageTitle: 'Hello World',
    });

    console.log(`Pageview: ${pageviewRes}`);

    // Event
    const eventRes:any = await ga.event({
        hostname: 'http://localhost',
        pagePath: '/index',
        pageTitle: 'Hello World',
        eventCategory: 'ga-event',
        eventAction: 'click',
        eventLabel: 'test event',
        eventValue: 0
    });

    console.log(`Event: ${eventRes}`);
}

start();

