"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthErrors = void 0;
class AuthErrors {
}
exports.AuthErrors = AuthErrors;
AuthErrors.AUTH_HEADER_MISSING = {
    error: "auth_header_missing",
    error_message: "fournir un authorization header"
};
AuthErrors.USER_ID_MISSING = {
    error: "user_id_missing",
    error_message: "user_id non fourni"
};
AuthErrors.USER_UNKNOWN = {
    error: "user_unknown",
    error_message: "user_id inconnu"
};
AuthErrors.INVALID_ACCESS_TOKEN = {
    error: "invalid_access_token",
    error_message: "l'access_token fournit est invalide"
};
AuthErrors.REGISTRATION_FAILED_EMAIL = {
    error: "registration_failed_email",
    error_message: "email deja pris"
};
AuthErrors.LOGIN_FAILED_EMAIL = {
    error: "login_failed_email",
    error_message: "email inconnu"
};
AuthErrors.LOGIN_FAILED_PASSWORD = {
    error: "login_failed_password",
    error_message: "mot de passe incorrect"
};
AuthErrors.INVALID_REFRESH_TOKEN = {
    error: "invalid_refresh_token",
    error_message: "le refresh_token fournit est invalide"
};
AuthErrors.NO_ACCESS_TOKEN = {
    error: "no_access_token",
    error_message: "pas d\'access token"
};
AuthErrors.ACCESS_TOKEN_EXPIRED = {
    error: "access_token_expired",
    error_message: "l'access token a expiré"
};
AuthErrors.NO_AUTH_INFOS = {
    error: "no_auth_infos",
    error_message: "pas d'informations dans la table oauth"
};
