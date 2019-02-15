/**
 * is-open-session
 * Test to determine if a date falls inside a currently-open timeframe
 */

import ow from 'ow'
import moment from 'moment'
import session from 'market-session'
import { utcDate } from '@hamroctopus/utc-date'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'
import { inTradingviewFormat } from '@strong-roots-capital/is-tradingview-format'

/**
 * Test to determine if a date falls inside the most-recent
 * (currently-open) session.
 *
 * @param date - Date under test
 * @param timeframe - Length of session in Trading View format
 * @param now - Used as current time when calculating most-recent timeframe
 * @returns True if `date` is inside the most-recent `timeframe` session from `now`.
 */
export default function isOpenSession(date: Date, timeframe: string, now: Date = utcDate()): boolean {

    ow(timeframe, ow.string.is(inTradingviewFormat))

    const timeframeInMinutes = session.fromString(timeframe)
    const time = moment.utc(date)

    const recentSessions = getRecentSessions(timeframe, now)
    const mostRecentOpen = moment.utc(recentSessions.pop()!)
    const sessionClose = mostRecentOpen.clone().add(timeframeInMinutes, 'minutes')

    return time.isSameOrAfter(mostRecentOpen) && time.isBefore(sessionClose)
}
