
import urlcat from 'urlcat';
import fetch from 'node-fetch';

interface PageViewParam {
    dh           : String;  // Document Hostname.
    dp           : String;  // Page.
    dt           : String;  // Title.
}

interface EventParam {
    dh           : String;  // Document Hostname.
    dp           : String;  // Page.
    dt           : String;  // Title.
    ec           : String;  // Event Category.
    ea           : String;  // Event Action. 
    el?          : String;  // Event label.
    ev?          : Number;  // Event value.
}

enum paramType {
    EventParam,
    PageViewParam
};

type hitType = 'event' | 'pageview';

const DEFAULT_CLIENT_ID  = 0;
const DEFAULT_USER_AGENT = 'PostmanRuntime/7.26.5';
const DEFAULT_VERSION    = 1;
const GA_BASE_URL        = "https://www.google-analytics.com/collect";
const HIT_TYPE           = {
    PAGE_VIEW: 'pageview',
    EVENT    : 'event'
} as const;

export class GA {

    protected _userAgent;
    protected _clientId;
    protected _propertyId;
    protected _version;

    protected _header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': DEFAULT_USER_AGENT,
    }

    constructor(propertyId: String) {
        this._propertyId = propertyId;
    }

    setUserAgent(userAgent) {
        this._header['User-Agent'] = userAgent;
    }

    setClientId(clientId: Number) {
        this._clientId = clientId;
    }

    setVersion(version: Number) {
        this._version = version;
    }

    /**
     * Assembles payload with GA propertyId, clientId and API version
     * @param payload 
     * @param hitType 
     */
    assemblePayloadWithAccount(payload, hitType: hitType) : String {
        return Object.assign({}, payload, 
            {
                tid: this._propertyId,
                cid: !!this._clientId ? this._clientId: DEFAULT_CLIENT_ID,
                v  : !!this._version ? this._version : DEFAULT_VERSION,
                t  : hitType,
            }
        );
    }

    /**
     * Sends a hit that can be either a pageview or an event
     * @param payload
     * @param hitType 
     */
    async hit(payload: paramType, hitType: hitType): Promise<Boolean> {
        const url = urlcat(GA_BASE_URL, this.assemblePayloadWithAccount(payload, hitType));
        return fetch(url, {
            method: "POST",
            headers: this._header,
        }).then((res: any) => {
            console.log(res);
            return res.status === 200;
        })
    }

    /**
     * Sends a pageview
     * @param payload 
     */
    async pageView(payload: PageViewParam) : Promise<Boolean> {
        const url = urlcat(GA_BASE_URL, this.assemblePayloadWithAccount(payload, HIT_TYPE.PAGE_VIEW));
        return fetch(url, {
            method: "POST",
            headers: this._header,
        }).then((res: any) => {
            console.log(res);
            return res.status === 200;
        })
    }

    /**
     * Sends a ga event
     * @param payload 
     */
    async event(payload: EventParam) : Promise<Boolean>  {
        const url = urlcat(GA_BASE_URL, this.assemblePayloadWithAccount(payload, HIT_TYPE.EVENT));
        return fetch(url, {
            method: "POST",
            headers: this._header,
        }).then((res: any) => {
            console.log(res);
            return res.status === 200;
        })
    }
}