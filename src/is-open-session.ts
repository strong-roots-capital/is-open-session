/**
 * is-open-session
 * Test to determine if a date falls inside a currently-open timeframe
 */

import D from 'od'
import ow from 'ow'
import session from 'market-session'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'
import { inTradingviewFormat } from '@strong-roots-capital/is-tradingview-format'

/**
 * Test to determine if a date falls inside the most-recent
 * (currently-open) session.
 *
 * @param date - Date under test
 * @param timeframe - Length of session in Trading View format
 * @param now - Used as current time when calculating most-recent session
 * @returns True if `date` is inside the most-recent `timeframe` session from `now`
 */
export default function isOpenSession(
    date: Date,
    timeframe: string,
    now: Date = new Date(Date.now())
): boolean {

    ow(date, ow.date)
    ow(timeframe, ow.string.is(inTradingviewFormat))
    ow(now, ow.date)

    const timeframeInMinutes = session.fromString(timeframe)
    const time = date.getTime()

    const recentSessions = getRecentSessions(timeframe, now)
    const mostRecentOpen = recentSessions.pop()!
    const sessionClose = D.add(
        'minute',
        timeframeInMinutes,
        new Date(mostRecentOpen)
    ).getTime()

    return mostRecentOpen <= time && time < sessionClose
}
