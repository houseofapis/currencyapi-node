const Endpoint = require('./Endpoint')

/**
 * @class History
 */
class History extends Endpoint {

    /**
     * History constructor
     *
     * @param {string} key
     */
    constructor(key) {
        super(key, 'history')
        this.addParam('base', this.defaultBase)
    }

    /**
     * Set the date
     *
     * @param {string} date eg. '2020-12-25'
     * @returns {History}
     */
    date(date) {
        this.addParam('date', date)
        return this
    }

    /**
     * Set the base currency
     *
     * @param {string} currency eg. 'USD'
     * @returns {History}
     */
    base(currency) {
        this.addParam('base', currency.toUpperCase())
        return this
    }
}

module.exports = History
