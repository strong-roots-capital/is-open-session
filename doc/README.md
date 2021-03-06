
is-open-session [![Build status](https://travis-ci.org/strong-roots-capital/is-open-session.svg?branch=master)](https://travis-ci.org/strong-roots-capital/is-open-session) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/is-open-session.svg)](https://npmjs.org/package/@strong-roots-capital/is-open-session) [![codecov](https://codecov.io/gh/strong-roots-capital/is-open-session/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/is-open-session)
========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

> Test to determine if a date falls inside a currently-open session

Install
-------

```shell
npm install @strong-roots-capital/is-open-session
```

Use
---

```typescript
import isOpenSession from '@strong-roots-capital/is-open-session'
isOpenSession(new Date(), '4H')
// => true

isOpenSession(new Date(0), '4H')
// => false
```

Related
-------

*   [is-tradingview-format](https://github.com/strong-roots-capital/is-tradingview-format)
*   [is-latest-closed-session](https://github.com/strong-roots-capital/is-latest-closed-session)
*   [get-recent-sessions](https://github.com/strong-roots-capital/get-recent-sessions)

## Index

### Functions

* [isOpenSession](#isopensession)

---

## Functions

<a id="isopensession"></a>

###  isOpenSession

▸ **isOpenSession**(date: *`Date`*, timeframe: *`string`*, now?: *`Date`*): `boolean`

*Defined in [is-open-session.ts:22](https://github.com/strong-roots-capital/is-open-session/blob/48e183d/src/is-open-session.ts#L22)*

Test to determine if a date falls inside the most-recent (currently-open) session.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| date | `Date` | - |  Date under test |
| timeframe | `string` | - |  Length of session in Trading View format |
| `Default value` now | `Date` |  utcDate() |  Used as current time when calculating most-recent session |

**Returns:** `boolean`
True if `date` is inside the most-recent `timeframe` session from `now`

___

