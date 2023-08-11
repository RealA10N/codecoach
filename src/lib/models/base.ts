import { z } from "zod"

export const ModelId = z.string().length(64).toLowerCase().regex(/^[a-f0-9]+$/)
export const CCBaseModel = z.object({ id: ModelId })
