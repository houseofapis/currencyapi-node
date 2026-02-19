const Rates = require('./classes/Rates')
const Convert = require('./classes/Convert')
const History = require('./classes/History')
const Timeframe = require('./classes/Timeframe')
const Currencies = require('./classes/Currencies')
const Ohlc = require('./classes/Ohlc')

/**
 * @class CurrencyApi
 * @link https://currencyapi.net/documentation
 */
class CurrencyApi
{
    /**
     * CurrencyApi constructor
     *
     * @param {string} key
     */
    constructor(key) {
        this.key = key;
    }

    /**
     * Use the rates endpoint
     *
     * @returns {Rates}
     */
    rates() {
        return new Rates(this.key)
    }

    /**
     * Use the convert endpoint
     *
     * @returns {Convert}
     */
    convert() {
        return new Convert(this.key)
    }

    /**
     * Use the history endpoint
     *
     * @returns {History}
     */
    history() {
        return new History(this.key)
    }

    /**
     * Use the timeframe endpoint
     *
     * @returns {Timeframe}
     */
    timeframe() {
        return new Timeframe(this.key)
    }

    /**
     * Use the currencies endpoint
     *
     * @returns {Currencies}
     */
    currencies() {
        return new Currencies(this.key)
    }

    /**
     * Use the ohlc endpoint
     *
     * @returns {Ohlc}
     */
    ohlc() {
        return new Ohlc(this.key)
    }

}

module.exports = CurrencyApi
