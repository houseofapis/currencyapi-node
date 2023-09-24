jest.mock("node-fetch")
const fetch = require("node-fetch")
const History = require('./../src/classes/History')

let history
let invalidKey = 'invalidKey'

beforeEach(() => {
    history = new History(invalidKey)
})

describe("Setting History", () => {

    test('Constructor setting params correctly', () => {
        expect(history.key).toBe(invalidKey)
        expect(history.endpoint).toBe('history')
    })

    test('Check default params have been set', () => {
        let params = history.getParams()
        expect(params).toHaveProperty('output', 'JSON')
    })

    test('Set date works and returns object', () => {
        let expectedDate = '2023-10-10'
        const setDate = history.date(expectedDate)
        let params = history.getParams()
        expect(params).toHaveProperty('date', expectedDate)
        expect(setDate).toBeInstanceOf(History)
    })

    test('Set base works and returns object', () => {
        let expectedBase = 'GBP'
        const setBase = history.base('gBp')
        let params = history.getParams()
        expect(params).toHaveProperty('base', expectedBase)
        expect(setBase).toBeInstanceOf(History)
    })

    test('Set output works and returns object', () => {
        let expectedOutput = 'XML'
        const setBase = history.output('xMl')
        let params = history.getParams()
        expect(params).toHaveProperty('output', expectedOutput)
        expect(setBase).toBeInstanceOf(History)
    })
})

describe("Fetching history works as expected", () => {

    test("fetch json working as expected", async () => {

        const mockData = {}
        fetch.mockReturnValue(
          Promise.resolve({
            json: () =>
              Promise.resolve(mockData)
          })
        )
        history.date('2023-01-02')
        const response = await history.get();
        const expectedUrl = 'https://currencyapi.net/api/v1/history?key=invalidKey&output=JSON&base=USD&date=2023-01-02'

        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/json",
            "X-Sdk": "node"
        }
        })
        expect(expectedUrl).toContain('date=2023-01-02')
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
        history.output('xmL')
        history.date('2023-01-02')
        history.base('GbP')
        const response = await history.get();
        const expectedUrl = 'https://currencyapi.net/api/v1/history?key=invalidKey&output=XML&base=GBP&date=2023-01-02'

        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/xml",
            "X-Sdk": "node"
        }
        })
        expect(expectedUrl).toContain('date=2023-01-02')
        expect(response).toEqual(mockData);
    })

})