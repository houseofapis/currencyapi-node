jest.mock("node-fetch")
const fetch = require("node-fetch")
const Ohlc = require('./../src/classes/Ohlc')

let ohlc
let invalidKey = 'invalidKey'

beforeEach(() => {
    ohlc = new Ohlc(invalidKey)
})

describe("Setting Ohlc", () => {

    test('Constructor setting params correctly', () => {
        expect(ohlc.key).toBe(invalidKey)
        expect(ohlc.endpoint).toBe('ohlc')
    })

    test('Check default params have been set', () => {
        let params = ohlc.getParams()
        expect(params).toHaveProperty('output', 'JSON')
        expect(params).toHaveProperty('interval', '1d')
    })

    test('Set currency works and returns object', () => {
        const setCurrency = ohlc.currency('gBp')
        let params = ohlc.getParams()
        expect(params).toHaveProperty('currency', 'GBP')
        expect(setCurrency).toBeInstanceOf(Ohlc)
    })

    test('Set date works and returns object', () => {
        const setDate = ohlc.date('2024-01-13')
        let params = ohlc.getParams()
        expect(params).toHaveProperty('date', '2024-01-13')
        expect(setDate).toBeInstanceOf(Ohlc)
    })

    test('Set interval works and returns object', () => {
        const setInterval = ohlc.interval('1h')
        let params = ohlc.getParams()
        expect(params).toHaveProperty('interval', '1h')
        expect(setInterval).toBeInstanceOf(Ohlc)
    })

    test('Set all allowed intervals', () => {
        const intervals = ['5m', '15m', '30m', '1h', '4h', '12h', '1d']
        intervals.forEach(i => {
            ohlc.interval(i)
            expect(ohlc.getParams()).toHaveProperty('interval', i)
        })
    })

    test('Set base works and returns object', () => {
        const setBase = ohlc.base('eUr')
        let params = ohlc.getParams()
        expect(params).toHaveProperty('base', 'EUR')
        expect(setBase).toBeInstanceOf(Ohlc)
    })

    test('Set output works and returns object', () => {
        const setOutput = ohlc.output('xMl')
        let params = ohlc.getParams()
        expect(params).toHaveProperty('output', 'XML')
        expect(setOutput).toBeInstanceOf(Ohlc)
    })

    test('Methods can be chained', () => {
        const result = ohlc.currency('GBP').date('2024-01-13').interval('1h').base('USD')
        expect(result).toBeInstanceOf(Ohlc)
        let params = ohlc.getParams()
        expect(params).toHaveProperty('currency', 'GBP')
        expect(params).toHaveProperty('date', '2024-01-13')
        expect(params).toHaveProperty('interval', '1h')
        expect(params).toHaveProperty('base', 'USD')
    })

})

describe("Fetching ohlc works as expected", () => {

    test("fetch json working as expected", async () => {

        const mockData = {
            "valid": true,
            "base": "USD",
            "quote": "GBP",
            "date": "2024-01-13",
            "interval": "1h",
            "ohlc": [
                {
                    "start": "2024-01-13T00:00:00Z",
                    "open": 1.2735,
                    "high": 1.2756,
                    "low": 1.2720,
                    "close": 1.2748
                }
            ]
        }
        fetch.mockReturnValue(
          Promise.resolve({
            json: () =>
              Promise.resolve(mockData)
          })
        )
        ohlc.currency('GBP').date('2024-01-13').interval('1h')
        const response = await ohlc.get()
        const expectedUrl = 'https://currencyapi.net/api/v2/ohlc?key=invalidKey&output=JSON&interval=1h&currency=GBP&date=2024-01-13'

        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: {
            "Content-Type": "application/json",
            "X-Sdk": "node"
          }
        })
        expect(response).toEqual(mockData)
    })

    test("fetch xml working as expected", async () => {

        const mockData = ''

        fetch.mockReturnValue(
          Promise.resolve({
            text: () =>
              Promise.resolve(mockData)
          })
        )
        ohlc.output('XmL').currency('GBP').date('2024-01-13')
        const response = await ohlc.get()

        const expectedUrl = 'https://currencyapi.net/api/v2/ohlc?key=invalidKey&output=XML&interval=1d&currency=GBP&date=2024-01-13'
        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: {
            "Content-Type": "application/xml",
            "X-Sdk": "node"
          }
        })
        expect(response).toEqual(mockData)
    })

})
