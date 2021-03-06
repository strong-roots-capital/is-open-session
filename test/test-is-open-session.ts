import test from 'ava'
import moment from 'moment'
import session from 'market-session'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'
import listTradingviewFormats from '@strong-roots-capital/list-tradingview-formats'

/**
 * Library under test
 */

import isOpenSession from '../src/is-open-session'

/*********************************************************************
 * Macro definitions
 ********************************************************************/

const rejectsInvalidTradingviewFormats = (t: any, timeframe: string) => {
    t.throws(() => isOpenSession(new Date(), timeframe))
}
rejectsInvalidTradingviewFormats.title = (_ = '', timeframe: string) => `should reject timeframe as invalid Trading View format: ${timeframe}`

const isInOpenSession = (t: any, date: Date, timeframe: string, from: Date = new Date(Date.now())) => t.true(isOpenSession(date, timeframe, from))
isInOpenSession.title = (_ = '', date: Date, timeframe: string, from: Date = new Date(Date.now())) => `${date.toISOString()} should be considered inside most-recent ${timeframe} session from ${from.toISOString()} (isInOpenSession)`

const isNotInOpenSession = (t: any, date: Date, timeframe: string, from: Date = new Date(Date.now())) => t.false(isOpenSession(date, timeframe, from))
isNotInOpenSession.title = (_ = '', date: Date, timeframe: string, from: Date = new Date(Date.now())) => `${date.toISOString()} should not be considered inside most-recent ${timeframe} session from ${from.toISOString()} (isNotInOpenSession)`

const equalToSessionOpenCountsAsInOpenSession = (t: any, date: Date, timeframe: string, from: Date = new Date(Date.now())) => t.true(isOpenSession(date, timeframe, from))
equalToSessionOpenCountsAsInOpenSession.title = (_ = '', date: Date, timeframe: string, from: Date = new Date(Date.now())) => `${date.toISOString()} should be considered inside most-recent ${timeframe} session from ${from.toISOString()} (equalToSessionOpenCountsAsInOpenSession)`

const equalToSessionCloseDoesNotCountAsInOpenSession = (t: any, date: Date, timeframe: string, from: Date = new Date(Date.now())) => t.false(isOpenSession(date, timeframe, from))
equalToSessionCloseDoesNotCountAsInOpenSession.title = (_ = '', date: Date, timeframe: string, from: Date = new Date(Date.now())) => `${date.toISOString()} should not be considered inside most-recent ${timeframe} session from ${from.toISOString()} (equalToSessionCloseDoesNotCountAsInOpenSession)`


/*********************************************************************
 * Test definitions
 ********************************************************************/

const invalidTimeframes = [ 'Y', '!!', '.', 'bumble', '~<>', 'happy', 'valentine\'s', 'day', 'little', 'banana']
invalidTimeframes.forEach((timeframe: string) => test(rejectsInvalidTradingviewFormats, timeframe))

for (const timeframe of listTradingviewFormats()) {
    const now = new Date(Date.now())
    const recentSessions = getRecentSessions(timeframe, now)
    const [openSession, ..._] = recentSessions.reverse()
    test(isInOpenSession, new Date(openSession), timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = new Date(Date.now())
    const recentSessions = getRecentSessions(timeframe, now)
    const [openSession, closedSession, ..._] = recentSessions.reverse()
    test(isNotInOpenSession, new Date(closedSession), timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = new Date(Date.now())
    test(isNotInOpenSession, new Date(0), timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = new Date(Date.now())
    const recentSessions = getRecentSessions(timeframe, now)
    const openSession = new Date(recentSessions.pop()!)
    test(equalToSessionOpenCountsAsInOpenSession, openSession, timeframe, openSession)
}

for (const timeframe of listTradingviewFormats()) {
    const timeframeInMinutes = session.fromString(timeframe)
    const now = new Date(Date.now())
    const recentSessions = getRecentSessions(timeframe, now)
    const sessionOpen = new Date(recentSessions.pop()!)
    const sessionClose = moment.utc(sessionOpen).add(timeframeInMinutes, 'minutes').toDate()
    test(equalToSessionCloseDoesNotCountAsInOpenSession, sessionClose, timeframe, now)
}

//  LocalWords:  equalToSessionOpenCountsAsInOpenSession
//  LocalWords:  equalToSessionCloseDoesNotCountAsInOpenSession
