export enum AstroType {
    POLYANET = "polyanets",
    COMETH = "comeths",
    SOLOON = "soloons",
    SPACE = "SPACE" 
}
export const astroColors = ["blue","red","purple","white"]
export interface AstroAPI {type: AstroType, API: string}

export interface Astro {row: number, column: number, type: string, direction: string, color: string}