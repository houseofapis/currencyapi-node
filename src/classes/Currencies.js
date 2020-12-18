const Endpoint = require('./Endpoint')

/**
 * @class Rates
 */
class Currencies extends Endpoint {

    /**
     * Rates constructor
     *
     * @param {string} key
     */
    constructor(key) {
        super(key, 'currencies')
    }
}

module.exports = Currencies
