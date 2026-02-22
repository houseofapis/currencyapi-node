# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-02-22

### Changed
- OHLC endpoint: renamed `currency()` to `quote()` and request parameter from `currency` to `quote` to align with API response field names.

## [2.0.0] - 2026-02-19

### Added
- OHLC (candlestick) endpoint support via `currency.ohlc()`
- `currency()`, `date()`, `interval()`, `base()` methods on the Ohlc class
- Intervals supported: `5m`, `15m`, `30m`, `1h`, `4h`, `12h`, `1d` (default: `1d`)

### Changed
- **Breaking**: Migrated from API v1 to v2 (`/api/v1/` → `/api/v2/`)
- Bumped package version to 2.0.0

## [1.2.0] - 2026-02-13

### Added
- Node.js v20, v22, and v24 support
- `engines` field in package.json specifying minimum Node.js version

### Changed
- Dockerfile updated from Node 22 to Node 24
- CI matrix updated to test against Node.js 16, 18, 20, 22, and 24
- Updated GitHub Actions to latest versions (checkout@v4, setup-node@v4)
- Minimum supported Node.js version updated from v8 to v16
- README updated to reflect current Node.js compatibility

## [1.1.1] - Previous release

- Initial tracked version
