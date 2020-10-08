import { GA } from '../src/';

const start = async () => {

    const ga = new GA('UA-XXXXXXXXX-X');

    // PageView Hit
    await ga.pageView({
        dh: 'http://localhost',
        dp: '/index',
        dt: 'Hello World',
    });

    // Event
    await ga.event({
        dh: 'http://localhost',
        dp: '/index',
        dt: 'Hello World',
        ec: 'ga-event',
        ea: 'click',
        el: 'test event',
        ev: 0
    });
}

start();

