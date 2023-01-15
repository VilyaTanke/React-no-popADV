import { adLoadedFailure, adLoadedRequest, adLoadedSucces, adsLoadedFailure, adsLoadedRequest, adsLoadedSucces, authLoginFailure, authLoginRequest, authLoginSucces, authLogout, authLogoutSucces, createAdFailure, createAdRequest, createAdSucces, deleteAdFailure, deleteAdRequest, deleteAdSucces, tagsLoadedFailure, tagsLoadedRequest, tagsLoadedSucces, uiConfirm, uiNotConfirm, uiNotification, uiNotNotification, uiResetError } from "../actions";
import { ADS_LOADED_FAILURE, ADS_LOADED_REQUEST, ADS_LOADED_SUCCES, AD_LOADED_FAILURE, AD_LOADED_REQUEST, AD_LOADED_SUCCES, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCES, AUTH_LOGOUT, CREATED_AD_FAILURE, CREATED_AD_REQUEST, CREATED_AD_SUCCES, DELETED_AD_FAILURE, DELETED_AD_REQUEST, DELETED_AD_SUCCES, TAGS_LOADED_FAILURE, TAGS_LOADED_REQUEST, TAGS_LOADED_SUCCES, UI_CONFIRM, UI_NOTIFICATION, UI_NOT_CONFIRM, UI_NOT_NOTIFICATION, UI_RESET_ERROR } from "../types";


describe('authLoginSucces', () => {
    test('Should return a "AUTH_LOGIN_SUCCES" action', () => {
        const expectedAction = {
            type: AUTH_LOGIN_SUCCES,
        };
        const action = authLoginSucces();
        expect(action).toEqual(expectedAction);
    });
});

describe('authLoginRequest', () => {
    test('Should return a "AUTH_LOGIN_REQUEST" action', () => {
        const expectedAction = {
            type: AUTH_LOGIN_REQUEST,
        };
        const action = authLoginRequest();
        expect(action).toEqual(expectedAction);
    });
});

describe('authLoginFailure', () => {
    test('Should return a "AUTH_LOGIN_FAILURE" action', () => {
        const error = 'error';
        const expectedAction = {
            type: AUTH_LOGIN_FAILURE,
            payload: error,
            error: true,
        };
        const action = authLoginFailure(error);
        expect(action).toEqual(expectedAction);
    });
});

describe('authLogoutSucces', () => {
    test('Should return a "AUTH_LOGOUT_SUCCES" action', () => {
        const expectedAction = {
            type: AUTH_LOGOUT,
        };
        const action = authLogoutSucces();
        expect(action).toEqual(expectedAction);
    });
});

describe('authLogout', () => {
    const action = authLogout();
    const dispatch = jest.fn();
    const api = { auth: {} };
    test('Should follow the logout flow', () => {
        api.auth.logout = jest.fn();
        action(dispatch, undefined, {api});
        expect(api.auth.logout).toBeCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, authLogoutSucces());
    });
});

describe('adsLoadedSucces', () => {
    test('Should return a "CREATED_AD_SUCCES" action', () => {
        const ads = 'ad';
        const expectedAction = {
            type: ADS_LOADED_SUCCES,
            payload: ads
        };
        const action = adsLoadedSucces(ads);
        expect(action).toEqual(expectedAction);
    });
});

describe('adsLoadedRequest', () => {
    test('Should return a "ADS_LOADED_REQUEST" action', () => {
        const expectedAction = {
            type: ADS_LOADED_REQUEST,
        };
        const action = adsLoadedRequest();
        expect(action).toEqual(expectedAction);
    });
});

describe('adsLoadedFailure', () => {
    test('Should return a "ADS_LOADED_FAILURE" action', () => {
        const error = 'error';
        const expectedAction = {
            type: ADS_LOADED_FAILURE,
            payload: error,
            error: true,
        };
        const action = adsLoadedFailure(error);
        expect(action).toEqual(expectedAction);
    });
});

describe('adLoadedSucces', () => {
    test('Should return a "AD_LOADED_SUCCES" action', () => {
        const ad = 'ad';
        const expectedAction = {
            type: AD_LOADED_SUCCES,
            payload: ad,
        };
        const action = adLoadedSucces(ad);
        expect(action).toEqual(expectedAction);
    });
});

describe('adLoadedRequest', () => {
    test('Should return a "AD_LOADED_REQUEST" action', () => {
        const expectedAction = {
            type: AD_LOADED_REQUEST,
        };
        const action = adLoadedRequest();
        expect(action).toEqual(expectedAction);
    });
});

describe('adLoadedFailure', () => {
    test('Should return a "AD_LOADED_FAILURE" action', () => {
        const error = 'error';
        const expectedAction = {
            type: AD_LOADED_FAILURE,
            payload: error,
            error: true,
        };
        const action = adLoadedFailure(error);
        expect(action).toEqual(expectedAction);
    });
});

describe('tagsLoadedSucces', () => {
    test('Should return a "TAGS_LOADED_SUCCES" action', () => {
        const tags = 'tags';
        const expectedAction = {
            type: TAGS_LOADED_SUCCES,
            payload: tags,
        };
        const action = tagsLoadedSucces(tags);
        expect(action).toEqual(expectedAction);
    });
});

describe('tagsLoadedRequest', () => {
    test('Should return a "TAGS_LOADED_REQUEST" action', () => {
        const expectedAction = {
            type: TAGS_LOADED_REQUEST,
        };
        const action = tagsLoadedRequest();
        expect(action).toEqual(expectedAction);
    });
});

describe('tagsLoadedFailure', () => {
    test('Should return a "TAGS_LOADED_FAILURE" action', () => {
        const error = 'error';
        const expectedAction = {
            type: TAGS_LOADED_FAILURE,
            payload: error,
            error: true,
        };
        const action = tagsLoadedFailure(error);
        expect(action).toEqual(expectedAction);
    });
});

describe('uiNotification', () => {
    test('Should return a "UI_NOTIFICATION" action', () => {
        const message = 'message';
        const expectedAction = {
            type: UI_NOTIFICATION,
            payload: message,
        };
        const action = uiNotification(message);
        expect(action).toEqual(expectedAction);
    });
});

describe('uiNotNotification', () => {
    test('Should return a "UI_NOT_NOTIFICATION" action', () => {
        const expectedAction = {
            type: UI_NOT_NOTIFICATION,
        };
        const action = uiNotNotification();
        expect(action).toEqual(expectedAction);
    });
});

describe('createAdRequest', () => {
    test('Should return a "CREATED_AD_REQUEST" action', () => {
        const expectedAction = {
            type: CREATED_AD_REQUEST,
        };
        const action = createAdRequest();
        expect(action).toEqual(expectedAction);
    });
});

describe('createAdSucces', () => {
    test('Should return a "CREATED_AD_SUCCES" action', () => {
        const ad = 'ad';
        const expectedAction = {
            type: CREATED_AD_SUCCES,
            payload: ad,
        };
        const action = createAdSucces(ad);
        expect(action).toEqual(expectedAction);
    });
});

describe('createAdFailure', () => {
    test('Should return a "CREATED_AD_FAILURE" action', () => {
        const error = 'error';
        const expectedAction = {
            type: CREATED_AD_FAILURE,
            payload: error,
            error: true,
        };
        const action = createAdFailure(error);
        expect(action).toEqual(expectedAction);
    });
});

describe('deleteAdRequest', () => {
    test('Should return a "DELETED_AD_REQUEST" action', () => {
        const expectedAction = {
            type: DELETED_AD_REQUEST,
        };
        const action = deleteAdRequest();
        expect(action).toEqual(expectedAction);
    });
});

describe('deleteAdSucces', () => {
    test('Should return a "DELETED_AD_SUCCES" action', () => {
        const expectedAction = {
            type: DELETED_AD_SUCCES,
          };
        const action = deleteAdSucces();
        expect(action).toEqual(expectedAction);
    });
});

describe('deleteAdFailure', () => {
    test('Should return a "DELETED_AD_FAILURE" action', () => {
        const error = 'error';
        const expectedAction = {
            type: DELETED_AD_FAILURE,
            payload: error,
            error: true,
        };
        const action = deleteAdFailure(error);
        expect(action).toEqual(expectedAction);
    });
});

describe('uiResetError', () => {
    test('Should return a "UI_RESET_ERROR" action', () => {
        const expectedAction = {
            type: UI_RESET_ERROR,
        };
        const action = uiResetError();
        expect(action).toEqual(expectedAction);
    });
});

describe('uiConfirm', () => {
    test('Should return a "UI_CONFIRM" action', () => {
        const params = 'params';
        const expectedAction = {
            type: UI_CONFIRM,
            payload: params,
        };
        const action = uiConfirm(params);
        expect(action).toEqual(expectedAction);
    });
});

describe('uiNotConfirm', () => {
    test('Should return a "UI_NOT_CONFIRM" action', () => {
        const expectedAction = {
            type: UI_NOT_CONFIRM,
        };
        const action = uiNotConfirm();
        expect(action).toEqual(expectedAction);
    });
});
