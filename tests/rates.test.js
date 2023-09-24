jest.mock("node-fetch")
const fetch = require("node-fetch")
const Rates = require('./../src/classes/Rates')

let rates
let invalidKey = 'invalidKey'

beforeEach(() => {
    rates = new Rates(invalidKey)
})

describe("Setting Rates", () => {

    test('Constructor setting params correctly', () => {
        expect(rates.key).toBe(invalidKey)
        expect(rates.endpoint).toBe('rates')
    })

    test('Check default params have been set', () => {
        let params = rates.getParams()
        expect(params).toHaveProperty('base', 'USD')
        expect(params).toHaveProperty('output', 'JSON')
    })

    test('Set base works and returns object', () => {
        let expectedBase = 'GBP'
        const setBase = rates.base('gBp')
        let params = rates.getParams()
        expect(params).toHaveProperty('base', expectedBase)
        expect(setBase).toBeInstanceOf(Rates)
    })

    test('Set output works and returns object', () => {
        let expectedOutput = 'XML'
        const setBase = rates.output('xMl')
        let params = rates.getParams()
        expect(params).toHaveProperty('output', expectedOutput)
        expect(setBase).toBeInstanceOf(Rates)
    })

    
})

describe("Fetching rates works as expected", () => {

    test("fetch json working as expected", async () => {

        const mockData = {
            "valid": true,
            "updated": 1695542403,
            "base": "USD",
            "rates": {
                    "AED": 3.673,
                    "AFN": 78.58716,
                    "ALL": 99.73298,
            }
        }
        fetch.mockReturnValue(
          Promise.resolve({
            json: () =>
              Promise.resolve(mockData)
          })
        )
        const response = await rates.get();
        expect(fetch).toHaveBeenLastCalledWith("https://currencyapi.net/api/v1/rates?key=invalidKey&output=JSON&base=USD", {
          headers: { 
            "Content-Type": "application/json",
            "X-Sdk": "node"
        }
        })
        expect(response).toEqual(mockData);
      })

    test("fetch xml working as expected", async () => {

        const mockData = `<?xml version='1.0' encoding='utf-8'?>
        <root>
        <valid></valid>
        <error>
        <code>401</code>
        <message>Your API key is not valid</message>
        </error>
        </root>`

        fetch.mockReturnValue(
          Promise.resolve({
            text: () =>
              Promise.resolve(mockData)
          })
        )
        rates.output('XmL')
        const response = await rates.get()

        expect(fetch).toHaveBeenLastCalledWith("https://currencyapi.net/api/v1/rates?key=invalidKey&output=XML&base=USD", {
          headers: { 
            "Content-Type": "application/xml",
            "X-Sdk": "node"
        }
        })
        expect(response).toEqual(mockData);
    })

})