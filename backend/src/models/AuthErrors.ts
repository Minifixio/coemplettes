export interface AuthError {
    error: string
    error_message: string
}

export class AuthErrors {
    static AUTH_HEADER_MISSING: AuthError = {
        error: "auth_header_missing",
        error_message: "fournir un authorization header"
    }
    static USER_ID_MISSING: AuthError = {
        error: "user_id_missing",
        error_message: "user_id non fourni"
    }
    static USER_UNKNOWN: AuthError = {
        error: "user_unknown",
        error_message: "user_id inconnu"
    }
    static INVALID_ACCESS_TOKEN: AuthError = {
        error: "invalid_access_token",
        error_message: "l'access_token fournit est invalide"
    }
    static REGISTRATION_FAILED_EMAIL: AuthError = {
        error: "registration_failed_email",
        error_message: "email deja pris"
    }
    static LOGIN_FAILED_EMAIL: AuthError = {
        error: "login_failed_email",
        error_message: "email inconnu"
    }
    static LOGIN_FAILED_PASSWORD: AuthError = {
        error: "login_failed_password",
        error_message: "mot de passe incorrect"
    }
    static INVALID_REFRESH_TOKEN: AuthError = {
        error: "invalid_refresh_token",
        error_message: "le refresh_token fournit est invalide"
    }
    static NO_ACCESS_TOKEN: AuthError = {
        error: "no_access_token",
        error_message: "pas d\'access token"
    }
    static ACCESS_TOKEN_EXPIRED: AuthError = {
        error: "access_token_expired",
        error_message: "l'access token a expiré"
    }
    static NO_AUTH_INFOS: AuthError = {
        error: "no_auth_infos",
        error_message: "pas d'informations dans la table oauth"
    }
}