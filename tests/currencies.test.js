jest.mock("node-fetch")
const fetch = require("node-fetch")
const Currencies = require('./../src/classes/Currencies')

let currencies
let invalidKey = 'invalidKey'

beforeEach(() => {
    currencies = new Currencies(invalidKey)
})

describe("Setting Convert", () => {

    test('Constructor setting params correctly', () => {
        expect(currencies.key).toBe(invalidKey)
        expect(currencies.endpoint).toBe('currencies')
    })

    test('Check default params have been set', () => {
        let params = currencies.getParams()
        expect(params).toHaveProperty('output', 'JSON')
    })

    test('Set output works and returns object', () => {
        let expectedOutput = 'XML'
        const setBase = currencies.output('xMl')
        let params = currencies.getParams()
        expect(params).toHaveProperty('output', expectedOutput)
        expect(setBase).toBeInstanceOf(Currencies)
    })
})

describe("Fetching currencies works as expected", () => {

    test("fetch json working as expected", async () => {

        const mockData = {}
        fetch.mockReturnValue(
          Promise.resolve({
            json: () =>
              Promise.resolve(mockData)
          })
        )
        const response = await currencies.get();
        const expectedUrl = 'https://currencyapi.net/api/v2/currencies?key=invalidKey&output=JSON'

        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/json",
            "X-Sdk": "node"
        }
        })
        expect(expectedUrl).toContain('output=JSON')
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
        currencies.output('XmL')
        const response = await currencies.get()

        const expectedUrl = 'https://currencyapi.net/api/v2/currencies?key=invalidKey&output=XML'
        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/xml",
            "X-Sdk": "node"
        }
        })
        expect(response).toEqual(mockData);
    })

})