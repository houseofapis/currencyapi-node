// run.js
const CurrencyApi = require('./src/CurrencyApi');

const currency = new CurrencyApi('0deed35c6c5dfd31070178ce11dcc3913346');

async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const result = await currency.convert()
            .from(fromCurrency)
            .to(toCurrency)
            .amount(amount)
            .get();
        return result.conversion.result;
    } catch (error) {
        throw new Error(`Conversion failed: ${error.message}`);
    }
}

(async () => {
    try {
        const converted = await convertCurrency(100, 'BTC', 'USD');
        console.log(`100 BTC is equal to ${converted} USD`);
    } catch (error) {
        console.error(error);
    }
})();