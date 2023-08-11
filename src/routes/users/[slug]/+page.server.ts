import { getUserIntegrations, getUser } from "$lib/services/db.server"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    const user = await getUser(locals.db, params.slug)
    const integrations = user ? await getUserIntegrations(locals.db, user) : null
    if (user === null || integrations === null) throw redirect(302, '/users')
    return {user, integrations}
}