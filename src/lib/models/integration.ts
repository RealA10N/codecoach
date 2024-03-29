import { CCBaseModel } from '$lib/models/base';
import { z } from 'zod';

export const PlatformModel = z.enum(['codeforces', 'cses']);
export const Platform = PlatformModel.enum;

const BaseIntegrationModel = CCBaseModel.extend({
	last_fetch: z.string().datetime().nullable()
});

export const CsesUserNumberModel = z.number().int().min(0).max(10_000_000);
export type CsesUserNumber = z.infer<typeof CsesUserNumberModel>;
export const CsesHandleModel = z.string().min(1).max(30).trim();
export type CsesHandle = z.infer<typeof CsesHandleModel>;

export const CsesIntegrationModel = BaseIntegrationModel.extend({
	platform: z.literal('cses'),
	user_number: CsesUserNumberModel,
	handle: CsesHandleModel
});

export type CsesIntegration = z.infer<typeof CsesIntegrationModel>;

export const CodeforcesHandleModel = z.string().min(3).max(30).trim();
export type CodeforcesHandle = z.infer<typeof CodeforcesHandleModel>;

export const CodeforcesIntegrationModel = BaseIntegrationModel.extend({
	platform: z.literal('codeforces'),
	handle: CodeforcesHandleModel
});

export type CodeforcesIntegration = z.infer<typeof CodeforcesIntegrationModel>;

export const AnyIntegrationModel = z.discriminatedUnion('platform', [
	CsesIntegrationModel,
	CodeforcesIntegrationModel
]);

export type AnyIntegration = z.infer<typeof AnyIntegrationModel>;
