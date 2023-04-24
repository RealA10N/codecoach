export async function getCodeforcesUsername(handle: string, fetcher: typeof fetch) : Promise<string | null> {
    if (handle.split(';').length !== 1) return null;
    const url = `https://codeforces.com/api/user.info?handles=${handle}`;
    const json = await (await fetcher(url))?.json();
    if (json?.status !== 'OK') return null;
    const user = (json?.result?.[0]?.handle as string | undefined) ?? null;
    return user;
}
