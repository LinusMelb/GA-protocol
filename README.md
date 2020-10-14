## GA-protocol - Javascript Wrapper of Google Analytics Measurement Protocol
[![forthebadge made-with-typescript](https://badgen.net/badge/Made%20with/Typescript/yellow)](https://www.typescriptlang.org/)
[![forthebadge contribution-is-welcome](https://badgen.net/badge/Contribution%20is/Welcome/green)](https://github.com/LinusMelb/GA-protocol)

For some hybrid apps(e.g uni-app), it's difficult to use native Google Analytics SDK. This project will help you to construct your data and manually send it to Google Analytics based on the measurement protocol provided by Google. 

## Installation and usage
```bash
npm install @linusmelb/ga-protocol

# Example usage

import { GA } from '@linusmelb/ga-protocol';
const ga = new GA('UA-XXXXXXXXX-X');

# Optinal
# Default user-agent: ga-protocol/1.0.0
# Default client-id: 0. It should be a random UUID (version 4) as described in http://www.ietf.org/rfc/rfc4122.txt
ga.setUserAgent('ga-protocol/1.0.0'); # Optinal. 
ga.setClientId('123e4567-e89b-12d3-a456-426655440000');    

# Pageview 
# To debug, go to https://analytics.google.com/analytics/web -> realtime -> Content
await ga.pageView({
    hostname: 'http://localhost',
    pagePath: '/index',
    pageTitle: 'Hello World',
});

# Event 
# To debug, go to https://analytics.google.com/analytics/web -> realtime -> Events
await ga.event({
    hostname: 'http://localhost',
    pagePath: '/index',
    pageTitle: 'Hello World',
    eventCategory: 'ga-event',
    eventAction: 'click',
    eventLabel: 'test event',
    eventValue: 0
});

################################
# To solve: Uni-app 使用axios真机会提示: adapter is not a function
################################
# Define your own axios adapter:
const adapter = (config, resolve, reject) => {
    uni.request({
        method: config.method.toUpperCase(),
        url: config.url,
        header: config.headers,
        data: config.data,
        dataType: config.dataType,
        responseType: config.responseType,
        sslVerify: config.sslVerify,
        success: function (response) {
            response = {
                data: response.data,
                status: response.statusCode,
                errMsg: response.errMsg,
                header: response.header,
                config: config
            };
            resolve(response);
        },
        fail: function (response) {
            reject(response);
        }
    })
};
# Replace default axios adapter with your own handler
ga.setAxiosAdapter(adapter);
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
