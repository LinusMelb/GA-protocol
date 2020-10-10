const { ModuleResolutionKind } = require("typescript")

const gaParameterRef = {
    appId          : 'aid',
    appInstallerId : 'aiid',
    appName        : 'an',
    appVersion     : 'av',
    clientId       : 'cid',
    dataSource     : 'ds',
    eventAction    : 'ea',
    eventCategory  : 'ec',
    eventLabel     : 'el',
    eventValue     : 'ev',
    hitType        : 't',
    hostname       : 'dh',
    ip             : 'uip',
    language       : 'ul',
    nonInteractive : 'ni',
    pagePath       : 'dp',
    pageTitle      : 'dt',
    pageUrl        : 'dl',
    propertyId     : 'tid',
    protocolVersion: 'v',
    sessionControl : 'sc',
    transactionId  : 'ti',
    userAgent      : 'ua',
    userId         : 'uid',
}


module.exports = {
    gaParameterRef
}