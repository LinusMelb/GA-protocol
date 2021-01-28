export declare interface PageViewParam {
    hostname : string;  // Document Hostname.
    pagePath : string;  // Page Path.
    pageTitle: string;  // Title.
}

export declare interface EventParam {
    hostname     : string;  // Document Hostname.
    pagePath     : string;  // Page Path.
    pageTitle    : string;  // Title.
    eventCategory: string;  // Event Category.
    eventAction  : string;  // Event Action. 
    eventLabel?  : string;  // Event label.
    eventValue?  : number;  // Event value.
}

export declare type hitType = 'event' | 'pageview';

export declare class GA {
    constructor(propertyId: String);
    setClientId(clientId: number): void;
    setVersion(version: number): void;
    assemblePayloadWithAccount(payload: PageViewParam | EventParam, hitType: hitType) : String;
    hit(payload: PageViewParam | EventParam, hitType: hitType): Promise<Boolean>;
    pageView(payload: PageViewParam) : Promise<Boolean>;
    event(payload: EventParam) : Promise<Boolean>;
}