
import urlcat from 'urlcat';
import {gaParameterRef}  from './gaParamMap';
const axios = require('axios').default;

interface PageViewParam {
    hostname : String;  // Document Hostname.
    pagePath : String;  // Page Path.
    pageTitle: String;  // Title.
}

interface EventParam {
    hostname     : String;  // Document Hostname.
    pagePath     : String;  // Page Path.
    pageTitle    : String;  // Title.
    eventCategory: String;  // Event Category.
    eventAction  : String;  // Event Action. 
    eventLabel?  : String;  // Event label.
    eventValue?  : Number;  // Event value.
}

type hitType = 'event' | 'pageview';

const DEFAULT_CLIENT_ID  = 0;
const DEFAULT_USER_AGENT = 'ga-protocol/1.0.0' as const;
const DEFAULT_VERSION    = 1;
const GA_BASE_URL        = "https://www.google-analytics.com/collect";
const HIT_TYPE           = {
    PAGE_VIEW: 'pageview',
    EVENT    : 'event'
} as const;

export class GA {

    protected _userAgent : String = DEFAULT_USER_AGENT;
    protected _clientId  : String; // This pseudonymously identifies a particular user, device, or browser instance
    protected _propertyId: String;
    protected _version   : Number;

    protected _header = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    constructor(propertyId: String) {
        this._propertyId = propertyId;
    }

    setUserAgent(userAgent: String) {
        this._userAgent = userAgent;
    }

    setClientId(clientId: String) {
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
    assemblePayloadWithProtocol(payload: PageViewParam | EventParam, hitType: hitType) : Object {

        const tempPayload = Object.assign({}, payload, 
            {
                propertyId     : this._propertyId,
                clientId       : !!this._clientId ? this._clientId: DEFAULT_CLIENT_ID,
                protocolVersion: !!this._version ? this._version  : DEFAULT_VERSION,
                hitType        : hitType,
                userAgent      : this._userAgent,
            }
        );

        let assembledPayLoad = {};
        for (let key in tempPayload) {
            if (key in gaParameterRef) {
                assembledPayLoad[gaParameterRef[key]] = tempPayload[key];
            }
        }
        return assembledPayLoad;
    }

    /**
     * Sends a hit that can be either a pageview or an event
     * @param payload
     * @param hitType 
     */
    async hit(payload: PageViewParam | EventParam, hitType: hitType): Promise<Boolean> {
        const url = urlcat(GA_BASE_URL, this.assemblePayloadWithProtocol(payload, hitType));
        return axios({
            method: 'post',
            url: url,
            headers: this._header,
        }).then((res: any) => {
            return res.status === 200;
        })
    }

    /**
     * Sends a pageview
     * @param payload 
     */
    async pageView(payload: PageViewParam) : Promise<Boolean> {
        const url = urlcat(GA_BASE_URL, this.assemblePayloadWithProtocol(payload, HIT_TYPE.PAGE_VIEW));
        return axios({
            method: 'post',
            url: url,
            headers: this._header,
        }).then((res: any) => {
            return res.status === 200;
        })
    }

    /**
     * Sends a ga event
     * @param payload 
     */
    async event(payload: EventParam) : Promise<Boolean>  {
        const url = urlcat(GA_BASE_URL, this.assemblePayloadWithProtocol(payload, HIT_TYPE.EVENT));
        return axios({
            method: 'post',
            url: url,
            headers: this._header,
        }).then((res: any) => {
            return res.status === 200;
        })
    }
}