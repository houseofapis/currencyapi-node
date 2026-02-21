const Endpoint = require('./Endpoint')

/**
 * Allowed intervals for OHLC data
 */
const ALLOWED_INTERVALS = ['5m', '15m', '30m', '1h', '4h', '12h', '1d']

/**
 * @class Ohlc
 */
class Ohlc extends Endpoint {

    /**
     * Ohlc constructor
     *
     * @param {string} key
     */
    constructor(key) {
        super(key, 'ohlc')
        this.addParam('interval', '1d')
    }

    /**
     * Set the quote currency
     *
     * @param {string} currency eg. 'GBP'
     * @returns {Ohlc}
     */
    currency(currency) {
        this.addParam('currency', currency.toUpperCase())
        return this
    }

    /**
     * Set the date
     *
     * @param {string} date eg. '2024-01-13'
     * @returns {Ohlc}
     */
    date(date) {
        this.addParam('date', date)
        return this
    }

    /**
     * Set the interval. Allowed values: 5m, 15m, 30m, 1h, 4h, 12h, 1d
     *
     * @param {string} interval eg. '1h'
     * @returns {Ohlc}
     */
    interval(interval) {
        this.addParam('interval', interval)
        return this
    }

    /**
     * Set the base currency
     *
     * @param {string} currency eg. 'USD'
     * @returns {Ohlc}
     */
    base(currency) {
        this.addParam('base', currency.toUpperCase())
        return this
    }
}

module.exports = Ohlc
