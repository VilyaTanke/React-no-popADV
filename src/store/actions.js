import { ADS_LOADED, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCES, AUTH_LOGOUT, TAGS_LOADED, UI_RESET_ERROR } from "./types";

export const authLoginSucces = () => ({
    type: AUTH_LOGIN_SUCCES,
});

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = (error) => ({
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true
});

export const authLogout = () => ({
    type: AUTH_LOGOUT,
});

export const adsLoaded = (ads) => ({
    type: ADS_LOADED,
    payload: ads,
});

export const tagsLoaded = (tags) => ({
    type: TAGS_LOADED,
    payload: tags
});

export const uiResetError = () => ({
    type: UI_RESET_ERROR,
});