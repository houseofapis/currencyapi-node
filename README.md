# CurrencyApi NodeJs wrapper 


[![npm version](https://badge.fury.io/js/currencyapi-node.svg)](https://www.npmjs.com/package/currencyapi-node) [![Coverage Status](https://coveralls.io/repos/github/houseofapis/currencyapi-node/badge.svg?branch=master)](https://coveralls.io/github/houseofapis/currencyapi-node?branch=master) 


<a href="https://currencyapi.net" title="CurrencyApi">CurrencyApi.net</a> provides live currency rates via a REST API. A live currency feed for over 152 currencies, including physical (USD, GBP, EUR + more) and cryptos (Bitcoin, Litecoin, Ethereum + more). A JSON and XML currency api updated every 60 seconds. 

Features:

- Live exchange rates (updated every 60 seconds).
- 152 currencies world currencies.
- Popular cryptocurrencies included; Bitcoin, Litecoin etc.
- Convert currencies on the fly with the convert endpoint.
- Historical currency rates back to year 2000.
- Easy to follow <a href="https://currencyapi.net/documentation" title="currency-api-documentation">documentation</a>

Signup for a free or paid account <a href="https://currencyapi.net/#pricing-sec" title="currency-api-pricing">here</a>.

## This package

NodeJs wrapper for <a href="https://currencyapi.net" title="CurrencyApi">CurrencyApi.net</a> endpoints.

#### Prerequisites

- Minimum NodeJs v8 (npm v5 and above)
- Working on NodeJs v18
- Free or Paid account with CurrencyApi.net

#### Test Coverage

- 100% coverage

## Installation

#### Using npm:

```bash
npm install currencyapi-node
```
then include the package with:

```javascript
const CurrencyApi = require('./currencyapi-node')
```

## Usage

### Instantiating

```javascript
const currency = new CurrencyApi('API_KEY');
```

### Live rates:

```javascript
const result = await currency.rates().get()
```
or
```javascript
currency.rates().get()
    .then(console.log)
```

Example with all available methods (methods can be chained):
```javascript
const result = await currency
                      .rates()
                      .base('USD')
                      .output('JSON')
                      .get()
```
**Available methods for rates endpoint**

| Methods | Description |
| --- | --- |
| `base()` | The base currency you wish you receive the currency conversions for. This will output all currency conversions for that currency. **Default: USD**. |
| `output()` | Response output in either JSON or XML. **Default: JSON**. |

<br>

### List of available currencies:

```javascript
const result = await currency.currencies().get()
```

Example with all available methods:
```javascript
const result = await currency
                      .currencies()
                      .output('XML')
                      .get()
```

**Available methods for currencies endpoint**

| Methods | Description |
| --- | --- |
| `output()` | Response output in either JSON or XML. **Default: JSON**. |

<br>

### Convert:

```javascript
const result = await currency
                      .convert()
                      .from('BTC')
                      .to('USD')
                      .amount(100)
                      .get()
```

**Available methods for convert endpoint**

| Methods | Description |
| --- | --- |
| `amount()` | The value of the currency you want to convert from. This should be a number and can contain a decimal place. **Required**. |
| `from()` | The currency you want to convert. This will be a three letter ISO 4217 currency code from one of the currencies we have rates for. **Required**. |
| `to()` | The currency you want to convert the amount 'to'. Again this will be a three letter currency code from the ones we offer. **Required**. |
| `output()` | Response output in either JSON or XML. **Default: JSON**. |

<br>

### Historical:

```javascript
const result = await currency.history().date('2019-01-01').get()
```

Example with all available methods:

```javascript
const result = await currency
                      .history()
                      .date('2019-01-01')
                      .base('GBP')
                      .output('JSON')
                      .get()
```

**Available methods for historical endpoint**

| Methods | Description |
| --- | --- |
| `date()` | The historical date you wish to receive the currency conversions for. This should be formatted as YYYY-MM-DD. **Required**. |
| `base()` | The base currency you wish you receive the currency conversions for. This will output all currency conversions for that currency. **Default: USD**. |
| `output()` | Response output in either JSON or XML. **Default: JSON**. |

<br>

### Timeframe:

```javascript
const result = await currency.timeframe().startDate('2019-01-01').endDate('2019-01-05').get()
```

Example with all available methods:

```javascript
const result = await currency
                      .timeframe()
                      .startDate('2019-01-01')
                      .endDate('2019-01-05')
                      .base('GBP')
                      .output('JSON')
                      .get()
```

**Available methods for timeframe endpoint**

| Methods | Description |
| --- | --- |
| `startDate()` | The historical date you wish to receive the currency conversions from. This should be formatted as YYYY-MM-DD. **Required**. |
| `endDate()` | The historical date you wish to receive the currency conversions until. This should be formatted as YYYY-MM-DD. **Required**. |
| `base()` | The base currency you wish you receive the currency conversions for. This will output all currency conversions for that currency. **Default: USD**. |
| `output()` | Response output in either JSON or XML. **Default: JSON**. |
