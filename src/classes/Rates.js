const Endpoint = require('./Endpoint')

/**
 * @class Rates
 */
class Rates extends Endpoint {

    /**
     * Rates constructor
     *
     * @param {string} key
     */
    constructor(key) {
        super(key, 'rates')
        this.addParam('base', this.defaultBase)
    }

    /**
     * Set the base currency
     *
     * @param {string} currency eg. 'USD'
     * @returns {Rates}
     */
    base(currency) {
        this.addParam('base', currency.toUpperCase())
        return this
    }
}

module.exports = Rates
