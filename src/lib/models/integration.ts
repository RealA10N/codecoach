import { CCBaseModel } from "$lib/models/base"
import { z } from 'zod'

export const PlatformModel = z.enum(['codeforces', 'cses'])
export const Platform = PlatformModel.enum

export const CsesUserNumberModel = z.number().int().min(0).max(10_000_000)
export type CsesUserNumber = z.infer<typeof CsesUserNumberModel>

export const CsesIntegrationModel = CCBaseModel.extend({
  platform: z.literal('cses'),
  user_number: CsesUserNumberModel,
})

export type CsesIntegration = z.infer<typeof CsesIntegrationModel>

export const CodeforcesHandleModel = z.string().min(3).max(30).trim().toLowerCase()
export type CodeforcesHandle = z.infer<typeof CodeforcesHandleModel>

export const CodeforcesIntegrationModel = CCBaseModel.extend({
  platform: z.literal('codeforces'),
  handle: CodeforcesHandleModel,
})

export type CodeforcesIntegration = z.infer<typeof CodeforcesIntegrationModel>

export const AnyIntegrationModel = z.discriminatedUnion('platform', [
  CsesIntegrationModel, CodeforcesIntegrationModel
])

export type AnyIntegration = z.infer<typeof AnyIntegrationModel>
