import { auth, ads, tags, ui, defaultState } from "../reducers";
import { authLoginSucces, authLogoutSucces, adsLoadedSucces, adLoadedSucces, createAdSucces, deleteAdSucces, tagsLoadedSucces, createAdRequest, uiResetError, uiConfirm, uiNotConfirm, uiNotification, uiNotNotification } from "../actions"

describe('auth', () => {
    const state = defaultState.auth;
    test('Should manage "AUTH_LOGIN_SUCCES" action', () => {
        const action = authLoginSucces();
        const result = auth(state, action);
        expect(result).toBe(true)
    });

    test('Should manage "AUTH_LOGOUT" action', () => {
        const action = authLogoutSucces();
        const result = auth(state, action);
        expect(result).toBe(false)
    });

    test('Should manage any action', () => {
        const state = undefined;
        const action = {type: 'ANY'};
        const result = auth(state, action);
        expect(result).toBe(defaultState.auth);
    });
});

describe('ads', () => {
    const state = defaultState.ads;
    test('Should manage "ADS_LOADED_SUCCES" action', () => {
        const listAds = [{id:1},{id:2}]
        const action = adsLoadedSucces(listAds);
        const result = ads(state, action);
        expect(result.data).toEqual(listAds);
        expect(result.areLoaded).toBe(true);
    });
    test('Should manage "AD_LOADED_SUCCES" action', () => {
        const ad = {id:1};
        const action = adLoadedSucces(ad);
        const result = ads(state, action);
        expect(result.data).toEqual([ad]);
        expect(result.areLoaded).toBe(state.areLoaded);
    });
    test('Should manage "CREATED_AD_SUCCES" action', () => {
        const ad = {id: 1};
        const action = createAdSucces(ad);
        const result = ads(state, action);
        expect(result.data).toEqual([ad, ...state.data]);
        expect(result.areLoaded).toBe(state.areLoaded);
    });
    test('Should manage "DELETED_AD_SUCCES" action', () => {
        const action = deleteAdSucces();
        const result = ads(state, action);
        expect(result.data).toEqual(state.data);
        expect(result.areLoaded).toBe(false);
    });
    test('Should manage "ANY" action', () => {
        const action = 'ANY';
        const state = undefined;
        const result = ads(state, action);
        expect(result.data).toEqual(defaultState.ads.data);
        expect(result.areLoaded).toBe(defaultState.ads.areLoaded);
    });
});

describe('tags', () => {
    const state = defaultState.tags;
    test('Should manage "TAGS_LOADED_SUCCES" action', () => {
        const listTags = ['motor','music']
        const action = tagsLoadedSucces(listTags);
        const result = tags(state, action);
        expect(result.data).toEqual(listTags);
        expect(result.areLoaded).toBe(true);
    });
    test('Should manage "ANY" action', () => {
        const state = undefined;
        const action = 'ANY';
        const result = tags(state, action);
        expect(result.data).toEqual(defaultState.tags.data);
        expect(result.areLoaded).toBe(defaultState.tags.areLoaded);
    });
});

describe('ui', () => {
    const state = defaultState.ui;
    test('Should manage "FAILURES" actions', () => {
        const error = 'error';
        const action = {type: 'FAILURE', payload: error, error: true};
        const result = ui(state, action);
        expect(result.error).toBe(error);
        expect(result.isFetching).toBe(false);
        expect(result.confirm).toBe(state.confirm);
        expect(result.notification).toBe(state.notification)
    });
    test('Should manage "REQUEST" actions', () => {
        const action = createAdRequest();
        const result = ui(state, action);
        expect(result.isFetching).toBe(true);
        expect(result.error).toBeNull();
        expect(result.confirm).toBe(state.confirm);
        expect(result.notification).toBe(state.notification);
    });
    test('Should manage "SUCCES" actions', () => {
        const ad = 'ad'
        const action = adLoadedSucces(ad);
        const result = ui(state, action);
        expect(result.isFetching).toBe(false);
        expect(result.error).toBeNull();
        expect(result.confirm).toBe(state.confirm);
        expect(result.notification).toBe(state.notification);
    });
    test('Should manage "UI_RESET_ERROR" action', () => {
        const action = uiResetError();
        const result = ui(state, action);
        expect(result.error).toBeNull();
    });
    test('Should manage "UI_CONFIRM" action', () => {
        const message = 'confirmation'
        const action = uiConfirm(message);
        const result = ui(state, action);
        expect(result.confirm).toBe(message);
    });
    test('Should manage "UI_NOT:CONFIRM" action', () => {
        const action = uiNotConfirm();
        const result = ui(state, action);
        expect(result.confirm).toBeNull();
    });
    test('Should manage "UI_NOTIFICATION" action', () => {
        const message = 'notification'
        const action = uiNotification(message);
        const result = ui(state, action);
        expect(result.notification).toBe(message);
    });
    test('Should manage "UI_NOT_NOTIFICATION" action', () => {
        const action = uiNotNotification();
        const result = ui(state, action);
        expect(result.notification).toBeNull();
    });
    test('Should manage "ANY" actions', () => {
        const state = undefined;
        const action = 'ANY';
        const result = ui(state, action);
        expect(result.error).toBeNull();
        expect(result.isFetching).toBe(false);
        expect(result.confirm).toBeNull();
        expect(result.notification).toBeNull();
    });
});