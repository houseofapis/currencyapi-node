const CurrencyApi = require('./src/CurrencyApi')

const currency = new CurrencyApi('API_KEY');
currency.rates().output('JSON').get()
    .then(console.log)

