# CurrencyApi NodeJs wrapper


[![npm version](https://badge.fury.io/js/currencyapi-node.svg)](https://www.npmjs.com/package/currencyapi-node) [![Coverage Status](https://coveralls.io/repos/github/houseofapis/currencyapi-node/badge.svg?branch=main)](https://coveralls.io/github/houseofapis/currencyapi-node?branch=main)

> **Note:** API v1 is deprecated and will be retired on **31st July 2026**, at which point all v1 traffic will be redirected to v2. This SDK (v2.0.0+) targets API v2. If you are on an older version of this SDK, please upgrade.


<a href="https://currencyapi.net" title="CurrencyApi">CurrencyApi.net</a> provides live currency rates via a REST API. A live currency feed for over 152 currencies, including physical (USD, GBP, EUR + more) and cryptos (Bitcoin, Litecoin, Ethereum + more). A JSON and XML currency api updated every 60 seconds.

Features:

- Live exchange rates (updated every 60 seconds).
- 152 currencies world currencies.
- Popular cryptocurrencies included; Bitcoin, Litecoin etc.
- Convert currencies on the fly with the convert endpoint.
- Historical currency rates back to year 2000.
- OHLC (candlestick) data with multiple intervals.
- Easy to follow <a href="https://currencyapi.net/documentation" title="currency-api-documentation">documentation</a>

Signup for a free or paid account <a href="https://currencyapi.net/#pricing-sec" title="currency-api-pricing">here</a>.

## This package is a:

NodeJs wrapper for <a href="https://currencyapi.net" title="CurrencyApi">CurrencyApi.net</a> endpoints.

## Developer Guide

For an easy to following developer guide, check out our [NodeJs Developer Guide](https://currencyapi.net/sdk/nodejs).

Alternatively keep reading below.

#### Prerequisites

- Minimum NodeJs v16 (npm v7 and above)
- Tested on NodeJs v16, v18, v20, v22, v24
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

<br>

### OHLC (candlestick data):

```javascript
const result = await currency
                      .ohlc()
                      .quote('GBP')
                      .date('2024-01-13')
                      .get()
```

Example with all available methods:

```javascript
const result = await currency
                      .ohlc()
                      .quote('GBP')
                      .date('2024-01-13')
                      .interval('1h')
                      .base('USD')
                      .output('JSON')
                      .get()
```

**Available methods for ohlc endpoint**

| Methods | Description |
| --- | --- |
| `quote()` | The quote currency to retrieve OHLC data for. This will be a three letter ISO 4217 currency code. **Required**. |
| `date()` | The date to retrieve OHLC data for. This should be formatted as YYYY-MM-DD. **Required**. |
| `interval()` | The time interval for each candle. Allowed values: `5m`, `15m`, `30m`, `1h`, `4h`, `12h`, `1d`. **Default: 1d**. |
| `base()` | The base currency. **Default: USD**. |
| `output()` | Response output in either JSON or XML. **Default: JSON**. |
