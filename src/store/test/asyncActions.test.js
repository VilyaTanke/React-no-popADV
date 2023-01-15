import { authLogin, authLoginFailure, authLoginRequest, authLoginSucces, adsLoad, adsLoadedRequest, adsLoadedSucces, adsLoadedFailure } from '../actions.js'

describe('authLogin', () => {
    const credentials = 'credentials';
    const action = authLogin(credentials);
    const dispatch = jest.fn();
    const api = {auth: {}};
    const router = {navigate: jest.fn()};
    const url = '/'
    describe('When login api resolves', () => {
        test('Should follow the login flow', async () => {
            api.auth.login = jest.fn().mockResolvedValue('token');
            const accesToken = await action(dispatch, undefined, {api, router});
            expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
            expect(api.auth.login).toBeCalledWith(credentials);
            expect(accesToken).toBe('token');
            expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSucces());
            expect(router.navigate).toHaveBeenCalledWith(url);
        });
        
    });
    describe('When login api rejects', () => {
        const error = new Error('error');
        test('Should follow the error flow', async () => {
            api.auth.login = jest.fn().mockRejectedValue(error);
            const promise = action(dispatch, undefined, {api, router});
            await expect(promise).rejects.toThrow(error);
            expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
            expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
        });

    });
});

describe('adsLod',() => {
    const action = adsLoad();
    const dispatch = jest.fn();
    const api = { ads: { } };
    const state = { ads: { } };
    describe('When ads areLoaded', () => {
        test('Should return without follow the flow action', async () => {
            state.ads.areLoaded = true;
            state.ads.data = [{id:1}];
            const getState = jest.fn().mockReturnValue(state);
            api.ads.getAds = jest.fn();
            action(dispatch, getState, {api});
            expect(dispatch).not.toHaveBeenCalled();
            expect(api.ads.getAds).not.toHaveBeenCalled();
        });
    });
    describe('When ads api resolves', () => {
        test('Should follow the flow action', async () => {
            state.ads.areLoaded = false;
            state.ads.data = [{id:1}];
            const getState = jest.fn().mockReturnValue(state);
            api.ads.getAds = jest.fn().mockResolvedValue(state.ads.data);
            await action(dispatch, getState, {api});
            expect(dispatch).toHaveBeenNthCalledWith(1, adsLoadedRequest());
            expect(api.ads.getAds).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenNthCalledWith(2, adsLoadedSucces(state.ads.data));
        });
    });
    describe('When ads api rejects', () => {
        test('Should follow the error flow', async () => {
            const error = new Error('error');
            state.ads.areLoaded = false;
            state.ads.data = [];
            const getState = jest.fn().mockReturnValue(state);
            api.ads.getAds = jest.fn().mockRejectedValue(error);
            const promise = action(dispatch, getState, {api});
            await expect(promise).rejects.toThrow(error);
            expect(dispatch).toHaveBeenNthCalledWith(1, adsLoadedRequest());
            expect(dispatch).toHaveBeenNthCalledWith(2, adsLoadedFailure(error));
        });
    });
});