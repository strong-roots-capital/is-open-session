import test from 'ava'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'

/**
 * Library under test
 */

import isOpenSession from '../src/is-open-session'

test('isOpenSession calculates expected result with default argument', t => {
    const timeframe = '4H'
    const recentSessions = getRecentSessions(timeframe)
    const [openSession, ..._] = recentSessions.reverse()
    t.true(isOpenSession(new Date(openSession), timeframe))
})
