import { getUserSubmissions } from '$src/lib/services/db.server';
import {
  getAvailableSessions,
  markSolvedProblemsInSession
} from '$src/lib/services/problems.server';

export const load = async ({ locals }) => {
  const userSubmissions = await getUserSubmissions(
    locals.db,
    locals.loggedInUser
  )

  const availableSessions = getAvailableSessions();
  const servedSessions = markSolvedProblemsInSession(
    availableSessions,
    userSubmissions
  )

  return { sessions: servedSessions, loggedInUser: locals.loggedInUser }
}
