jest.mock("node-fetch")
const fetch = require("node-fetch")
const Convert = require('./../src/classes/Convert')

let convert
let invalidKey = 'invalidKey'

beforeEach(() => {
    convert = new Convert(invalidKey)
})

describe("Setting Convert", () => {

    test('Constructor setting params correctly', () => {
        expect(convert.key).toBe(invalidKey)
        expect(convert.endpoint).toBe('convert')
    })

    test('Check default params have been set', () => {
        let params = convert.getParams()
        expect(params).toHaveProperty('output', 'JSON')
    })

    test('Set amount works and returns object', () => {
        let expectedAmount = 100
        const setAmount = convert.amount(expectedAmount)
        let params = convert.getParams()
        expect(params).toHaveProperty('amount', expectedAmount)
        expect(setAmount).toBeInstanceOf(Convert)
    })

    test('Set to works and returns object', () => {
        let expectedTo = 'gBp'
        const setTo = convert.to(expectedTo)
        let params = convert.getParams()
        expect(params).toHaveProperty('to', 'GBP')
        expect(setTo).toBeInstanceOf(Convert)
    })

    test('Set from works and returns object', () => {
        let expectedFrom = 'BTc'
        const setFrom = convert.from(expectedFrom)
        let params = convert.getParams()
        expect(params).toHaveProperty('from', 'BTC')
        expect(setFrom).toBeInstanceOf(Convert)
    })

    test('Set output works and returns object', () => {
        let expectedOutput = 'XML'
        const setBase = convert.output('xMl')
        let params = convert.getParams()
        expect(params).toHaveProperty('output', expectedOutput)
        expect(setBase).toBeInstanceOf(Convert)
    })
})

describe("Fetching convert works as expected", () => {

    test("fetch json working as expected", async () => {

        const mockData = {}
        fetch.mockReturnValue(
          Promise.resolve({
            json: () =>
              Promise.resolve(mockData)
          })
        )
        convert.amount(10)
        convert.from('GbP')
        convert.to('UsD')
        const response = await convert.get();
        const expectedUrl = 'https://currencyapi.net/api/v2/convert?key=invalidKey&output=JSON&amount=10&from=GBP&to=USD'

        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/json",
            "X-Sdk": "node"
        }
        })
        expect(expectedUrl).toContain('output=JSON')
        expect(expectedUrl).toContain('amount=10')
        expect(expectedUrl).toContain('from=GBP')
        expect(expectedUrl).toContain('to=USD')
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
        convert.output('XmL')
        convert.amount(10)
        convert.from('GbP')
        convert.to('UsD')
        const response = await convert.get()

        const expectedUrl = 'https://currencyapi.net/api/v2/convert?key=invalidKey&output=XML&amount=10&from=GBP&to=USD'
        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/xml",
            "X-Sdk": "node"
        }
        })
        expect(response).toEqual(mockData);
    })

})