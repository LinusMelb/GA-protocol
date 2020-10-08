## GA-protocol - Wrapper of Google Analytics Measurement Protocol
[![forthebadge made-with-typescript](https://badgen.net/badge/Made%20with/Typescript/yellow)](https://www.typescriptlang.org/)
[![forthebadge contribution-is-welcome](https://badgen.net/badge/Contribution%20is/Welcome/green)](https://github.com/LinusMelb/GA-protocol)

For some hybrid apps(e.g uni-app), it's difficult to use native Google Analytics SDK. This project will help you to construct your data and manually send it to Google Analytics based on the measurement protocol provided by Google. 

## Installation and usage
```bash
npm install @linusmelb/ga-protocol

# Example usage
const ga = new GA('UA-XXXXXXXXX-X');

// Pageview
await ga.pageView({
  dh: 'http://localhost', // Document Hostname.
  dp: '/index',           // Page.
  dt: 'Hello World',      // Title.
});

// Event
await ga.event({
  dh: 'http://localhost', // Document Hostname.
  dp: '/index',           // Page.
  dt: 'Hello World',      // Title.
  ec: 'ga-event',         // Event Category.
  ea: 'click',            // Event Action. 
  el: 'test event',       // Event label.
  ev: 0                   // Event value.
});
```

## To test locally
``` bash
# clone from repo
git clone https://github.com/LinusMelb/GA-protocol.git

# install dependencies
npm install

# run test
npm run test
```

## TODO
- [x] Send pageview
- [x] Send event
- [ ] Send pageview with customer dimension 
- [ ] Send event with customer dimension 
- [ ] Send enhanced ecommerce event
