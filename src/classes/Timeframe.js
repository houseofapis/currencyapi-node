const Endpoint = require('./Endpoint')

/**
 * @class Timeframe
 */
class Timeframe extends Endpoint {

    /**
     * Timeframe constructor
     *
     * @param {string} key API key eg. 'jksdsskndjksdnsk'
     */
    constructor(key) {
        super(key, 'timeframe')
        this.addParam('base', this.defaultBase)
    }

    /**
     * Set the start date
     *
     * @param {string} date eg. '2020-12-25'
     * @returns {Timeframe}
     */
    startDate(date) {
        this.addParam('start_date', date)
        return this
    }

    /**
     * Set the end date
     *
     * @param {string} date eg. '2020-12-25'
     * @returns {Timeframe}
     */
    endDate(date) {
        this.addParam('end_date', date)
        return this
    }

    /**
     * Set the base currency
     *
     * @param {string} currency eg. 'USD'
     * @returns {Timeframe}
     */
    base(currency) {
        this.addParam('base', currency.toUpperCase())
        return this
    }
}

module.exports = Timeframe
