const Endpoint = require('./Endpoint')

/**
 * @class Convert
 */
class Convert extends Endpoint {

    /**
     * Convert constructor
     *
     * @param {string} key
     */
    constructor(key) {
        super(key, 'convert')
    }

    /**
     * Set the amount
     *
     * @param {number} amount eg. 10.99
     * @returns {Convert}
     */
    amount(amount) {
        this.addParam('amount', amount)
        return this
    }

    /**
     * Set the currency you want to convert to
     *
     * @param {string} currency eg. 'USD'
     * @returns {Convert}
     */
    to(currency) {
        this.addParam('to', currency.toUpperCase())
        return this
    }

    /**
     * Set the currency you want to convert from
     *
     * @param {string} currency eg. 'GBP'
     * @returns {Convert}
     */
    from(currency) {
        this.addParam('from', currency.toUpperCase())
        return this
    }
}

module.exports = Convert
