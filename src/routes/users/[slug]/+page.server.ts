import { getUserIntegrations, getUser } from "$lib/services/db.server"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    const user = await getUser(locals.db, params.slug)
    const integrations = user ? await getUserIntegrations(locals.db, user) : null
    return {user, integrations}
}