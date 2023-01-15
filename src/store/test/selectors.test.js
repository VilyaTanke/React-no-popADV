import { areChargedAds, areChargedTags, getAdById, getIsLogged, getListAds, getListTags, getUi, getUiConfirm, getUiError } from "../selectors";

const state = {
    auth: false,
    ads: {
      areLoaded: true,
      data: [{id:1}, {id:2}],
    },
    tags: {
      areLoaded: true,
      data: ['motor', 'music'],
    },
    ui: {
      isFetching: false,
      error: null,
      confirm: null,
      notification: null,
    },
  };

  describe('getIsLogged', () => {
    test('Should return "false"', () => {
      const result = getIsLogged(state);
      expect(result).toBe(state.auth);
    });
  });

  describe('getListAds', () => {
    test('Should return "[{id:1}, {id:2}]"', () => {
      const result = getListAds(state);
      expect(result).toEqual(state.ads.data);
    });
  });

  describe('areChargedAds', () => {
    test('Should return "true"', () => {
      const result = areChargedAds(state);
      expect(result).toBe(state.ads.areLoaded);
    });
  });

  describe('getListTags', () => {
    test('Should return "[motor, music]"', () => {
      const result = getListTags(state);
      expect(result).toBe(state.tags.data);
    });
  });

  describe('areChargedTags', () => {
    test('Should return "true"', () => {
      const result = areChargedTags(state);
      expect(result).toBe(state.tags.areLoaded);
    });
  });

  describe('getAdById', () => {
    test('Should return a "ad by adId"', () => {
      const id = 2;
      const result = getAdById(id)(state);
      expect(result).toBe(state.ads.data[1])
    });
    test('Should return "any ad"', () => {
      const id = 3;
      const result = getAdById(id)(state);
      expect(result).toBeUndefined();
    });
  });

  describe('getUi', () => {
    test('Should return " {isFetching: false, error: null, confirm: null, notification: null,}"', () => {
      const result = getUi(state);
      expect(result).toBe(state.ui);
    });               
  });

  describe('getUiError', () => {
    test('Should return "null"', () => {
      const result = getUiError(state);
      expect(result).toBeNull();
    });
  });

  describe('getUiConfirm', () => {
    test('Should return "null"', () => {
      const result = getUiConfirm(state);
      expect(result).toBeNull();
    });
  });