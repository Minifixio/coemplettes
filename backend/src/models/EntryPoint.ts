export interface EntryPoint {
    method: string
    entryPointName: string
    paramName: string | null
    callbackParam?: ((param: any) => Promise<any>)
    callbackNoParam?: (() => Promise<any>)
}