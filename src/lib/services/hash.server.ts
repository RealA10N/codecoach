import { createHash } from "crypto";
import { Platform, type CsesUserNumber, type CodeforcesHandle } from "$lib/models/integration";

export const hashTokens = (tokens: string[]) => {
  const hash = createHash('sha256')
  for (const token of tokens) hash.update(token)
  return hash.digest('hex')
}

export const emailToId = (email: string) => hashTokens([email])

export const getCsesIntegrationId = (user_number: CsesUserNumber) =>
  hashTokens([Platform.cses, user_number.toString()])

export const getCodeforcesIntegrationId = (handle: CodeforcesHandle) =>
  hashTokens([Platform.codeforces, handle])
