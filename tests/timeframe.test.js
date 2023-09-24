jest.mock("node-fetch")
const fetch = require("node-fetch")
const Timeframe = require('./../src/classes/Timeframe')

let timeframe
let invalidKey = 'invalidKey'

beforeEach(() => {
    timeframe = new Timeframe(invalidKey)
})


describe("Setting Timeframe", () => {

    test('Constructor setting params correctly', () => {
        expect(timeframe.key).toBe(invalidKey)
        expect(timeframe.endpoint).toBe('timeframe')
    })

    test('Check default params have been set', () => {
        let params = timeframe.getParams()
        expect(params).toHaveProperty('output', 'JSON')
    })

    test('Set base works and returns object', () => {
        let expectedBase = 'GBP'
        const setBase = timeframe.base('gBp')
        let params = timeframe.getParams()
        expect(params).toHaveProperty('base', expectedBase)
        expect(setBase).toBeInstanceOf(Timeframe)
    })

    test('Set start date works and returns object', () => {
        let expectedStart = '2023-01-02'
        const setStart = timeframe.startDate(expectedStart)
        let params = timeframe.getParams()
        expect(params).toHaveProperty('start_date', expectedStart)
        expect(setStart).toBeInstanceOf(Timeframe)
    })

    test('Set end date works and returns object', () => {
        let expectedEnd = '2023-01-06'
        const setEnd = timeframe.endDate(expectedEnd)
        let params = timeframe.getParams()
        expect(params).toHaveProperty('end_date', expectedEnd)
        expect(setEnd).toBeInstanceOf(Timeframe)
    })

    test('Set output works and returns object', () => {
        let expectedOutput = 'XML'
        const setBase = timeframe.output('xMl')
        let params = timeframe.getParams()
        expect(params).toHaveProperty('output', expectedOutput)
        expect(setBase).toBeInstanceOf(Timeframe)
    })
})

describe("Fetching timeframe works as expected", () => {

    test("fetch json working as expected", async () => {

        const mockData = {}
        fetch.mockReturnValue(
          Promise.resolve({
            json: () =>
              Promise.resolve(mockData)
          })
        )
        timeframe.startDate('2023-01-02')
        timeframe.endDate('2023-01-03')
        const response = await timeframe.get();
        const expectedUrl = 'https://currencyapi.net/api/v1/timeframe?key=invalidKey&output=JSON&base=USD&start_date=2023-01-02&end_date=2023-01-03'

        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/json",
            "X-Sdk": "node"
        }
        })
        expect(expectedUrl).toContain('start_date=2023-01-02')
        expect(expectedUrl).toContain('end_date=2023-01-03')
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
        timeframe.output('xMl')
        timeframe.startDate('2023-01-02')
        timeframe.endDate('2023-01-03')
        const response = await timeframe.get();
        const expectedUrl = 'https://currencyapi.net/api/v1/timeframe?key=invalidKey&output=XML&base=USD&start_date=2023-01-02&end_date=2023-01-03'

        expect(fetch).toHaveBeenLastCalledWith(expectedUrl, {
          headers: { 
            "Content-Type": "application/xml",
            "X-Sdk": "node"
        }
        })
        expect(expectedUrl).toContain('start_date=2023-01-02')
        expect(expectedUrl).toContain('end_date=2023-01-03')
        expect(response).toEqual(mockData);
    })

})