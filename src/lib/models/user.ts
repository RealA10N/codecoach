import { CCBaseModel, ModelId } from "$lib/models/base"
import { z } from "zod";

export const UserNameModel = z.string().min(3)
export type UserName = z.infer<typeof UserNameModel>

export const UserEmailModel = z.string().email()
export type UserEmail = z.infer<typeof UserEmailModel>

export const UserModel = CCBaseModel.extend({
  name: UserNameModel,
  email: UserEmailModel,
  integrations: z.array(ModelId),
})

export type User = z.infer<typeof UserModel>

export const PasswordHashModel = z.string().length(60)
export type PasswordHash = z.infer<typeof PasswordHashModel>

export const UserPasswordModel = CCBaseModel.extend({
  password_hash: PasswordHashModel
})

export type UserPassword = z.infer<typeof UserPasswordModel>
