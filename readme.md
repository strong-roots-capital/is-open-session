# is-open-session [![Build status](https://travis-ci.org/strong-roots-capital/is-open-session.svg?branch=master)](https://travis-ci.org/strong-roots-capital/is-open-session) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/is-open-session.svg)](https://npmjs.org/package/@strong-roots-capital/is-open-session) [![codecov](https://codecov.io/gh/strong-roots-capital/is-open-session/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/is-open-session)

> Test to determine if a date falls inside the currently-open session

## Install

``` shell
npm install @strong-roots-capital/is-open-session
```

## Use

``` typescript
import isOpenSession from '@strong-roots-capital/is-open-session'
isOpenSession(new Date(), '4H')
// => true

isOpenSession(new Date(0), '4H')
// => false
```

## Related

- [is-tradingview-format](https://github.com/strong-roots-capital/is-tradingview-format)
- [is-latest-closed-session](https://github.com/strong-roots-capital/is-latest-closed-session)
- [get-recent-sessions](https://github.com/strong-roots-capital/get-recent-sessions)
