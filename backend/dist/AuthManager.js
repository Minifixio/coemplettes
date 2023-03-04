"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const credentials_1 = require("./credentials");
const DBManager_1 = require("./DBManager");
const AuthErrors_1 = require("./models/AuthErrors");
const TOKEN_DURATION = 1000 * 60 * 10;
class AuthManager {
    static createRefreshToken(accessToken, userId) {
        const token = jwt.sign({
            user_id: userId,
            access_token: accessToken,
            createdAt: new Date().getTime()
        }, credentials_1.SECRET);
        return token;
    }
    static createAccessToken(userId, email, pwdhash) {
        const token = jwt.sign({
            user_id: userId,
            email: email,
            password: pwdhash,
            createdAt: new Date().getTime()
        }, credentials_1.SECRET);
        return token;
    }
    /**
     *
     * @param user
     * @param password
     * @returns userId si l'enregistrement a fonctionné / erreur sinon
     */
    static register(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = new Promise((resolve, reject) => {
                bcrypt.hash(password, 10, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                    const userExists = (yield DBManager_1.DB.getUserByEmail(user.email)) === null ? false : true;
                    if (userExists) {
                        reject(AuthErrors_1.AuthErrors.REGISTRATION_FAILED_EMAIL);
                    }
                    else {
                        user.pwdhash = hash;
                        const userId = yield DBManager_1.DB.addUser(user);
                        const accessToken = this.createAccessToken(userId, user.email, hash);
                        const refreshToken = this.createRefreshToken(accessToken, userId);
                        yield DBManager_1.DB.addUserAuth(accessToken, refreshToken, userId, new Date().getTime() + TOKEN_DURATION);
                        resolve(userId);
                    }
                }));
            });
            return res;
        });
    }
    /**
     *
     * @param userId
     * @param password
     * @returns userId si valide / erreur sinon
     */
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = yield DBManager_1.DB.getUserByEmail(email);
                if (user == null) {
                    reject(AuthErrors_1.AuthErrors.LOGIN_FAILED_EMAIL);
                }
                else {
                    if (user === null || user === void 0 ? void 0 : user.pwdhash) {
                        bcrypt.compare(password, user.pwdhash, (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (result) {
                                const accessToken = this.createAccessToken(user.id, user.email, user.pwdhash);
                                const refreshToken = this.createRefreshToken(accessToken, user.id);
                                yield DBManager_1.DB.storeAccessToken(accessToken, user.id, new Date().getTime() + TOKEN_DURATION);
                                yield DBManager_1.DB.storeRefreshToken(refreshToken, user.id);
                                return resolve(user.id);
                            }
                            else {
                                return reject(AuthErrors_1.AuthErrors.LOGIN_FAILED_PASSWORD);
                            }
                        }));
                    }
                    else {
                        return reject(AuthErrors_1.AuthErrors.LOGIN_FAILED_PASSWORD);
                    }
                }
            }));
            return res;
        });
    }
    /**
     *
     * @param userId
     * @param accessToken
     * @returns true si l'accessToken est valide / false sinon
     */
    static checkAuth(userId, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const authInfos = yield DBManager_1.DB.getAuthInfos(userId);
                if (authInfos) {
                    if (accessToken !== (authInfos === null || authInfos === void 0 ? void 0 : authInfos.access_token)) {
                        reject(AuthErrors_1.AuthErrors.INVALID_ACCESS_TOKEN);
                    }
                    if (authInfos.expires_at < new Date().getTime()) {
                        reject(AuthErrors_1.AuthErrors.ACCESS_TOKEN_EXPIRED);
                    }
                    resolve();
                }
                else {
                    reject(AuthErrors_1.AuthErrors.NO_AUTH_INFOS);
                }
            }));
        });
    }
    /**
     *
     * @param userId
     * @param refreshToken
     * @returns true si le refreshToken est valide / false sinon
     */
    static checkRefresh(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const authInfos = yield DBManager_1.DB.getAuthInfos(userId);
            if (refreshToken !== (authInfos === null || authInfos === void 0 ? void 0 : authInfos.refresh_token)) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    /**
     *
     * @param email
     * @param refreshToken
     * @returns true si le refresh a fonctionné i.e le refreshToken est valide / false sinon
     */
    static refreshAuth(email, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = yield DBManager_1.DB.getUserByEmail(email);
                if (user) {
                    const validRefresh = yield this.checkRefresh(user.id, refreshToken);
                    if (!validRefresh) {
                        reject(AuthErrors_1.AuthErrors.INVALID_REFRESH_TOKEN);
                    }
                    const newAccessToken = this.createAccessToken(user.id, user.email, user.pwdhash);
                    const newRefreshToken = this.createRefreshToken(newAccessToken, user.id);
                    yield DBManager_1.DB.storeAccessToken(newAccessToken, user.id, new Date().getTime() + TOKEN_DURATION);
                    yield DBManager_1.DB.storeRefreshToken(refreshToken, user.id);
                    const res = { accessToken: newAccessToken, refreshToken: newRefreshToken };
                    resolve(res);
                }
                else {
                    reject(AuthErrors_1.AuthErrors.USER_UNKNOWN);
                }
            }));
        });
    }
    static generateAuth(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = yield DBManager_1.DB.getUserByID(userId);
                if (user) {
                    const accessToken = this.createAccessToken(userId, user.email, user.pwdhash);
                    const refreshToken = this.createRefreshToken(accessToken, userId);
                    yield DBManager_1.DB.storeAccessToken(accessToken, userId, new Date().getTime() + TOKEN_DURATION);
                    yield DBManager_1.DB.storeRefreshToken(refreshToken, userId);
                    const res = { accessToken, refreshToken };
                    return res;
                }
                else {
                    reject(AuthErrors_1.AuthErrors.USER_UNKNOWN);
                }
            }));
        });
    }
    static getTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield DBManager_1.DB.getTokens(userId);
            return tokens;
        });
    }
}
exports.AuthManager = AuthManager;
