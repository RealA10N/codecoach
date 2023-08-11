import { CCBaseModel } from "$lib/models/base"
import { z } from "zod"

export const ProblemModel = CCBaseModel.extend({
  problem_url: z.string().url(),
})
