import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { SECRET } from './credentials';
import { DB } from './DBManager';
import { User } from './tables/User';

const TOKEN_DURATION = 1000 * 60 * 10

export class AuthManager {
    static createRefreshToken(accessToken: string, userId: number){
        const token = jwt.sign({
            access_token: accessToken,
            createdAt: new Date().getTime()
        }, SECRET)

        return token
    }

    static createAccessToken(userId: number, email: string, password: string) {
        const token = jwt.sign({
            id: userId,
            email: email,
            password: password,
            createdAt: new Date().getTime()
        }, SECRET)

        return token
    }

    static async register(user: User, password: string) {
        bcrypt.hash(password, 10, async (err, hash: string) => {
            user.pwdhash = hash
            const userId = await DB.addUser(user)
            const accessToken = this.createAccessToken(userId, user.email, password)
            const refreshToken = this.createRefreshToken(accessToken, userId)
            await DB.addUserAuth(accessToken, refreshToken, userId, new Date().getTime() + TOKEN_DURATION)
        });
    }

    static async login(userId: number, password: string) {
        const user = await DB.getUserByID(userId)

        if (user && user?.pwdhash) {
            bcrypt.compare(password, user.pwdhash, async (err, result) => {
                if (result) {
                    const accessToken = this.createAccessToken(userId, user.email, password)
                    const refreshToken = this.createRefreshToken(accessToken, userId)
                    await DB.storeAccessToken(accessToken, userId, new Date().getTime() + TOKEN_DURATION)
                    await DB.storeRefreshToken(refreshToken, userId)
                    return true
                } else {
                    return false
                }
            });
        } else {
            return false
        }
    }

    static async checkAuth(userId: number, accessToken: string) {
        const authInfos = await DB.getAuthInfos(userId)
        if (accessToken !== authInfos?.access_token) {
            return false
        }
        if (authInfos.expires_at > new Date().getTime()) {
            return false
        }
        return true
    }

    static async checkRefresh(userId: number, refreshToken: string) {
        const authInfos = await DB.getAuthInfos(userId)
        if (refreshToken !== authInfos?.refresh_token) {
            return false
        } else {
            return true
        }
    }

    static async refreshAuth(userId: number, refreshToken: string) {
        const validRefresh = await this.checkRefresh(userId, refreshToken)
    }

    // TODO : rendre les fonctions avec bycrypt vraiment async
}