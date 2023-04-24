import * as cheerio from 'cheerio';

export async function getCsesUsername(userNumber: number, fetcher: typeof fetch) : Promise<string | null> {
    const url = `https://cses.fi/user/${userNumber}`;
    const content = await (await fetcher(url)).text();
    const $ = cheerio.load(content)
    return await $('h1')?.text()?.split(' ')?.at(1) ?? null;
}