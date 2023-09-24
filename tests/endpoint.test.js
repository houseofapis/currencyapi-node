const Endpoint = require('./../src/classes/Endpoint')


let endpoint
let invalidKey = 'invalidKey'

beforeEach(() => {
    endpoint = new Endpoint(invalidKey,'endpoint')
})

describe("Setting Endpoint", () => {

    test('Constructor setting params correctly', () => {
        expect(endpoint.key).toBe(invalidKey)
        expect(endpoint.endpoint).toBe('endpoint');
    })

    test('Check default params have been set', () => {
        let params = endpoint.getParams()
        expect(params).toHaveProperty('output', 'JSON')
    })

    test('Set output works and returns object', () => {
        let expectedOutput = 'XML'
        const setBase = endpoint.output('xMl')
        let params = endpoint.getParams()
        expect(params).toHaveProperty('output', expectedOutput)
        expect(setBase).toBeInstanceOf(Endpoint)
    })

})