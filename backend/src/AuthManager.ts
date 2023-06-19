import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { SECRET } from './credentials';
import { DB } from './DBManager';
import { TokenResponse } from './models/TokenResponse';
import { UserDefault } from './models/UserDefault';
import { AuthErrors } from './models/AuthErrors';

const TOKEN_DURATION = 1000 * 60 * 60 * 3

export class AuthManager {

    static createRefreshToken(accessToken: string, userId: number){
        console.log('[AuthManager] Création d\'un refresh token pour le user n°' + userId)
        const token = jwt.sign({
            user_id: userId,
            access_token: accessToken,
            createdAt: new Date().getTime()
        }, SECRET)

        return token
    }

    static createAccessToken(userId: number, email: string, pwdhash: string) {
        console.log('[AuthManager] Création d\'un access token pour ' + email)
        const token = jwt.sign({
            user_id: userId,
            email: email,
            password: pwdhash,
            createdAt: new Date().getTime()
        }, SECRET)

        return token
    }

    /**
     * 
     * @param user 
     * @param password 
     * @returns userId si l'enregistrement a fonctionné / erreur sinon
     */
    static async register(user: UserDefault, password: string): Promise<number> {
        console.log('[AuthManager] Enregistrement de ' + user.email)
        const res = new Promise<number>((resolve, reject) => {

            bcrypt.hash(password, 10, async (err, hash: string) => {
                
                const userExists = (await DB.getUserByEmail(user.email)) === null ? false : true

                if (userExists) {
                    console.log('[AuthManager] Erreur : l\'email ' + user.email + ' existe déjà.')
                    reject(AuthErrors.REGISTRATION_FAILED_EMAIL)
                } else {
                    user.pwdhash = hash
                    const userId = await DB.addUser(user)
                    const accessToken = this.createAccessToken(userId, user.email, hash)
                    const refreshToken = this.createRefreshToken(accessToken, userId)
                    await DB.addUserAuth(accessToken, refreshToken, userId, new Date().getTime() + TOKEN_DURATION)
                    console.log('[AuthManager] Enregistrement effecuté!')
                    resolve(userId)
                }
            })
        })

        return res
    }

    /**
     * 
     * @param userId 
     * @param password 
     * @returns userId si valide / erreur sinon
     */
    static async login(email: string, password: string): Promise<number> {

        console.log(`[Auth] Login pour ${email}`)

        const res = new Promise<number>(async (resolve, reject) => {
            const user = await DB.getUserByEmail(email)
            if (user == null) {
                console.log(`[Auth] Login impossible : email inconnu`)
                reject(AuthErrors.LOGIN_FAILED_EMAIL)
            } else {
                if (user?.pwdhash) {
                    bcrypt.compare(password, user.pwdhash, async (err, result) => {
                        if (result) {
                            const accessToken = this.createAccessToken(user.id, user.email, user.pwdhash)
                            const refreshToken = this.createRefreshToken(accessToken, user.id)
                            await DB.storeAccessToken(accessToken, user.id, new Date().getTime() + TOKEN_DURATION)
                            await DB.storeRefreshToken(refreshToken, user.id)
                            console.log(`[Auth] Login effectué!`)
                            return resolve(user.id)
                        } else {
                            console.log(`[Auth] Login impossible : mauvais password`)
                            return reject(AuthErrors.LOGIN_FAILED_PASSWORD)
                        }
                    });
                } else {
                    console.log(`[Auth] Login impossible : mauvais password`)
                    return reject(AuthErrors.LOGIN_FAILED_PASSWORD)
                }
            }
        })

        return res
    }

    /**
     * 
     * @param userId 
     * @param accessToken 
     * @returns true si l'accessToken est valide / false sinon
     */
    static async checkAuth(userId: number, accessToken: string): Promise<void> {

        return new Promise(async (resolve, reject) => {
            const authInfos = await DB.getAuthInfos(userId)

            if (authInfos) {
                if (accessToken !== authInfos?.access_token) {
                    console.log(`[Auth] Check d\'auth pour user n°${userId} incorrect > invalid access token`)
                    reject(AuthErrors.INVALID_ACCESS_TOKEN)
                }
                if (authInfos.expires_at < new Date().getTime()) {
                    console.log(`[Auth] Check d\'auth pour user n°${userId} incorrect > access token expired`)
                    reject(AuthErrors.ACCESS_TOKEN_EXPIRED)
                }

                resolve()
            } else {
                console.log(`[Auth] Check d\'auth pour user n°${userId} incorrect > no auth infos`)
                reject(AuthErrors.NO_AUTH_INFOS)
            }

        })

    }

    /**
     * 
     * @param userId 
     * @param refreshToken 
     * @returns true si le refreshToken est valide / false sinon
     */
    static async checkRefresh(userId: number, refreshToken: string): Promise<boolean> {
        const authInfos = await DB.getAuthInfos(userId)
        if (refreshToken !== authInfos?.refresh_token) {
            console.log(`[Auth] Check de refresh pour user n°${userId} incorrect`)
            return false
        } else {
            console.log(`[Auth] Check de refresh pour user n°${userId} correct`)
            return true
        }
    }

    /**
     * 
     * @param email 
     * @param refreshToken 
     * @returns true si le refresh a fonctionné i.e le refreshToken est valide / false sinon
     */
    static async refreshAuth(email: string, refreshToken: string): Promise<TokenResponse> {
        console.log(`[Auth] Refresh > email : ${email} & refresh_token : ${refreshToken}`)
        
        return new Promise<TokenResponse>(async (resolve, reject) => {
            const user = await DB.getUserByEmail(email)
            if (user) {
                const validRefresh = await this.checkRefresh(user.id, refreshToken)

                if (!validRefresh) {
                    console.log('[Auth] Refresh impossible : invalid refresh')
                    reject(AuthErrors.INVALID_REFRESH_TOKEN)
                } 
        
                const newAccessToken = this.createAccessToken(user.id, user.email, user.pwdhash)
                const newRefreshToken = this.createRefreshToken(newAccessToken, user.id)
                await DB.storeAccessToken(newAccessToken, user.id, new Date().getTime() + TOKEN_DURATION)
                await DB.storeRefreshToken(newRefreshToken, user.id)
                const res: TokenResponse = {accessToken: newAccessToken, refreshToken: newRefreshToken}
                console.log('[Auth] Refresh effectué!')
                resolve(res)
            } else {
                console.log('[Auth] Refresh impossible : user unknown')
                reject(AuthErrors.USER_UNKNOWN)
            }
        })
    }

    static async generateAuth(userId: number): Promise<TokenResponse> {
        return new Promise<TokenResponse>(async (resolve, reject) => {
    
            const user = await DB.getUserByID(userId)
            if (user) {
                const accessToken = this.createAccessToken(userId, user.email, user.pwdhash)
                const refreshToken = this.createRefreshToken(accessToken, userId)
                await DB.storeAccessToken(accessToken, userId, new Date().getTime() + TOKEN_DURATION)
                await DB.storeRefreshToken(refreshToken, userId)
                const res: TokenResponse = {accessToken, refreshToken}
                console.log('[Auth] Génération d\'auth effectuée!')
                return res

            } else {
                console.log('[Auth] Génération d\'auth impossible : user unknown')
                reject(AuthErrors.USER_UNKNOWN)
            }
        })
    }

    static async getTokens(userId: number): Promise<TokenResponse | null> {
        const tokens = await DB.getTokens(userId)
        return tokens
    }


}