export declare interface PageViewParam {
    hostname : String;  // Document Hostname.
    pagePath : String;  // Page Path.
    pageTitle: String;  // Title.
}

export declare interface EventParam {
    hostname     : String;  // Document Hostname.
    pagePath     : String;  // Page Path.
    pageTitle    : String;  // Title.
    eventCategory: String;  // Event Category.
    eventAction  : String;  // Event Action. 
    eventLabel?  : String;  // Event label.
    eventValue?  : Number;  // Event value.
}

export declare type hitType = 'event' | 'pageview';

export declare class GA {
    constructor(propertyId: String);
    setClientId(clientId: Number): void;
    setVersion(version: Number): void;
    assemblePayloadWithAccount(payload: PageViewParam | EventParam, hitType: hitType) : String;
    hit(payload: PageViewParam | EventParam, hitType: hitType): Promise<Boolean>;
    pageView(payload: PageViewParam) : Promise<Boolean>;
    event(payload: EventParam) : Promise<Boolean>;
}