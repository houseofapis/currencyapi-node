const CurrencyApi = require('./../src/CurrencyApi')
const Rates = require('./../src/classes/Rates')
const History = require('./../src/classes/History')
const Timeframe = require('./../src/classes/Timeframe')
const Convert = require('./../src/classes/Convert')
const Currencies = require('./../src/classes/Currencies')

let currencyApi
let invalidKey = 'invalidKey'

beforeEach(() => {
    currencyApi = new CurrencyApi(invalidKey)
})

describe("Setting CurrencyApi", () => {

    test('Constructor setting params correctly', () => {
        expect(currencyApi.key).toBe(invalidKey);
    })

    test('Each CurrencyApi method is returning the relevant class', () => {
        expect(currencyApi.rates()).toBeInstanceOf(Rates);
        expect(currencyApi.history()).toBeInstanceOf(History);
        expect(currencyApi.timeframe()).toBeInstanceOf(Timeframe);
        expect(currencyApi.convert()).toBeInstanceOf(Convert);
        expect(currencyApi.currencies()).toBeInstanceOf(Currencies);
    })
})