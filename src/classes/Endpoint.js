const client = require("node-fetch");

/**
 * Default output format
 * @type {string}
 */
const DEFAULT_OUTPUT = 'JSON'

/**
 * Base CurrencyApi Url
 */
const BASE_URL = 'https://currencyapi.net/api/';

/**
 * Version of the API
 */
const API_VERSION = 'v1';

/**
 * Default base currency
 */
const DEFAULT_BASE = 'USD';

/**
 * Version of the application
 * @type {string}
 */
const APPLICATION_VERSION = '1.0.0'

/**
 * Application name sent as user-agent
 * @type {string}
 */
const APPLICATION = 'CurrencyApi_npm_' + APPLICATION_VERSION

/**
 * Build up the URL based on the endpoint and params
 *
 * @param {string} endpoint
 * @param {string} key
 * @param {Object} params
 * @returns {string}
 */
const buildUrl = (endpoint, key, params = {}) => {
    let ret = [];
    for (let param in params) {
        ret.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
    }
    return BASE_URL + API_VERSION + '/' + endpoint + '?key=' + key + '&' + ret.join('&')
}

/**
 * @class Endpoint
 */
class Endpoint {

    /**
     * Endpoint constructor
     * Added addParam & getParams inside the constructor to make them private
     *
     * @param {string} key
     * @param {string} endpoint
     */
    constructor(key, endpoint) {
        this.key = key
        this.endpoint = endpoint
        this.defaultBase = DEFAULT_BASE
        let _param = {output: DEFAULT_OUTPUT}
        this.addParam = (name, value) => _param[name] = value
        this.getParams = () => { return _param }
    }

    /**
     * Set the output
     *
     * @param {string} output eg. 'JSON' or 'XML'
     * @returns {Endpoint}
     */
    output(output) {
        this.addParam('output', output.toUpperCase())
        return this
    }

    /**
     * Make the request
     *
     * @returns {Promise<*>}
     */
    async get() {
        const headers = {'application': APPLICATION, 'user-agent': APPLICATION}
        const response = await client(buildUrl(this.endpoint, this.key, this.getParams()), {headers: headers})
        const isXml = this.getParams().output === 'XML'
        return isXml ? await response.text() : await response.json()
    }

}

module.exports = Endpoint
