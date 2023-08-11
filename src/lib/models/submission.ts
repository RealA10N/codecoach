import { CCBaseModel } from '$lib/models/base'
import { AnyIntegrationModel } from '$lib/models/integration'
import { ProblemModel } from '$lib/models/problem'
import { z } from 'zod'

export const SubmissionVerdict = z.enum(['accepted', 'rejected'])
export type SubmissionVerdict = z.infer<typeof SubmissionVerdict>

export const SubmissionModel = CCBaseModel.extend({
  integration: AnyIntegrationModel,
  problem: ProblemModel,
  verdict: SubmissionVerdict,
  first_seen_at: z.string().datetime(),
  submitted_at: z.string().datetime().nullable(),
  submission_url: z.string().url().nullable(),
  raw_code_url: z.string().url().nullable(),
})

export type Submission = z.infer<typeof SubmissionModel>
