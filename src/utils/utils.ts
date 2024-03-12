export const getAPIUrlByAstro = (astroType: string, API_URL: string | undefined) : string => {
    if(!API_URL) throw new Error("No API URL provided.")
    return `${API_URL}${astroType}`
}

export function delay(ms: number) :Promise<void>  {
    return new Promise( resolve => setTimeout(resolve, ms) );
}