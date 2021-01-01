
import {gaParameterRef}  from './gaParamMap';
const axios = require('axios').default;

interface PageViewParam {
    hostname     : String;  // Document Hostname.
    pagePath     : String;  // Page Path.
    pageTitle    : String;  // Title.
    [key: string]: String|Number; // Custom Dimensions
}

interface EventParam {
    hostname     : String;  // Document Hostname.
    pagePath     : String;  // Page Path.
    pageTitle    : String;  // Title.
    eventCategory: String;  // Event Category.
    eventAction  : String;  // Event Action. 
    eventLabel?  : String;  // Event label.
    eventValue?  : Number;  // Event value.
    [key: string]: String|Number; // Custom Dimensions
}

type hitType = 'event' | 'pageview';

const DEFAULT_CLIENT_ID  = 0;
const DEFAULT_USER_AGENT = 'ga-protocol/1.0.0' as const;
const DEFAULT_VERSION    = 1;
const GA_BASE_URL        = "https://www.google-analytics.com/collect";
const GA_DEBUG_URL       = "https://www.google-analytics.com/debug/collect";
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

    setUserAgent(userAgent: String): void {
        this._userAgent = userAgent;
    }

    getUserAgent(): String {
        return this._userAgent;
    }

    setClientId(clientId: String): void {
        this._clientId = clientId;
    }

    getClientId(): String {
        return this._clientId;
    }
    
    setVersion(version: Number) {
        this._version = version;
    }

    /**
     * Overwrite axios default adapter with logic that defined by user
     * 
     * @param handler 
     */
    setAxiosAdapter(handler: Function) {
        axios.defaults.adapter = function(config) {
            return new Promise((resolve, reject) => {
                handler.length !== 3 ? reject(
                    "Handler must take 3 arguments: [config, resolve, reject]"
                ) : handler(config, resolve, reject);
            });
        }
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
            // Assembles GA built-in params
            if (key in gaParameterRef) {
                assembledPayLoad[gaParameterRef[key]] = tempPayload[key];
            }
            // Assembles custom dimensions
            if (!!key.match(/^cd\d{1,3}$/)) {
                assembledPayLoad[key] = tempPayload[key];
            }
        }
        return assembledPayLoad;
    }

    assemblePayloadWithBaseUrl(url: String, assembledPayLoad: Object ): String {

        const qs = Object.keys(assembledPayLoad)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(assembledPayLoad[key])}`)
        .join('&');

        return `${url}?${qs}`;
    }

    /**
     * Sends a hit that can be either a pageview or an event
     * @param payload
     * @param hitType 
     */
    async hit(payload: PageViewParam | EventParam, hitType: hitType, isDebug?: Boolean): Promise<Boolean> {
        const url = this.assemblePayloadWithBaseUrl(isDebug ? GA_DEBUG_URL : GA_BASE_URL, this.assemblePayloadWithProtocol(payload, hitType));
        return axios({
            method: 'post',
            url: url,
            headers: this._header,
        });
    }

    /**
     * Sends a pageview
     * @param payload 
     */
    async pageView(payload: PageViewParam, isDebug?: Boolean) : Promise<Boolean> {
        const url = this.assemblePayloadWithBaseUrl(isDebug ? GA_DEBUG_URL : GA_BASE_URL, this.assemblePayloadWithProtocol(payload, HIT_TYPE.PAGE_VIEW));
        return axios({
            method: 'post',
            url: url,
            headers: this._header,
        });
    }

    /**
     * Sends a ga event
     * @param payload 
     */
    async event(payload: EventParam, isDebug?: Boolean) : Promise<Boolean>  {
        const url = this.assemblePayloadWithBaseUrl(isDebug ? GA_DEBUG_URL : GA_BASE_URL, this.assemblePayloadWithProtocol(payload, HIT_TYPE.EVENT));
        return axios({
            method: 'post',
            url: url,
            headers: this._header,
        });
    }
}