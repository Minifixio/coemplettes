export interface EntryPoint {
    method: string
    entryPointName: string
    paramName: string | null
    auth: boolean
    callbackParam?: ((param: any) => Promise<any>) | ((param: any) => any)
    callbackNoParam?: (() => Promise<any>) | (() => any)
}