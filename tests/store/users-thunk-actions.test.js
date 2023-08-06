import fetchMock from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {getUsersList, getUsersListSorted, getPopupUserData} from '../../src/services/actions/users';

require("jest-fetch-mock").enableMocks();

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('users list async action', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  const login = 'super'
  const pageNumber = 1;

  it('should fetch users data successfully', async () => {
    // Создаем виртуальное хранилище
    const store = mockStore({});

    const mockFetchResponse = {
      total_count: 2,
      items: [
        {
          login: 'SuperUser',
          avatar_url: 'https://some-image.png',
          html_url: 'https://some-profile-url.com',
          type: 'User'
        },
        {
          login: 'SuperOrg',
          avatar_url: 'https://some-picture.jpg',
          html_url: 'https://some-user-url.com',
          type: 'Organization'
        },
      ]
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockFetchResponse));

    // Типы ожидаемых экшенов при вызове dispatch
    const expectedActions = [
      {type: 'usersList/getUsersList'},
      {type: 'usersList/getUsersListSuccess', payload: mockFetchResponse},
      {
        type: 'pagination/getDataPerPageSuccess',
        payload: {total_count: mockFetchResponse.total_count, currentPage: pageNumber}
      },
    ];

    await store.dispatch(getUsersList(login, pageNumber));

    expect(store.getActions()).toEqual(expectedActions);

    /* Проверяем пейлоуды в сторе: */
    // Проверяем пейлоуды в сторе для экшена типа 'pagination/getDataPerPageSuccess'
    const paginationSuccessAction = store.getActions().find(action => action.type === 'pagination/getDataPerPageSuccess');
    expect(paginationSuccessAction).toBeTruthy(); // Убеждаемся, что экшен был найден
    expect(paginationSuccessAction.payload).toEqual({
      total_count: mockFetchResponse.total_count,
      currentPage: pageNumber
    });

    // Проверяем пейлоуды в сторе для экшена типа 'usersList/getUsersListSuccess'
    const usersListSuccessAction = store.getActions().find(action => action.type === 'usersList/getUsersListSuccess');
    expect(usersListSuccessAction).toBeTruthy(); // Убеждаемся, что экшен был найден
    expect(usersListSuccessAction.payload).toEqual(mockFetchResponse);

    // Проверяем пейлоуды в сторе для экшена типа 'usersList/getUsersList'
    const usersListAction = store.getActions().find(action => action.type === 'usersList/getUsersList');
    expect(usersListAction).toBeTruthy(); // Убеждаемся, что экшен был найден
    expect(usersListAction.payload).toBeUndefined(); // Пейлоуд для 'usersList/getUsersList' не определен
  });

  it('should fetch users data failed', async () => {
    const store = mockStore({});

    const responseError = new Error('Какая-то ошибка');
    fetchMock.mockRejectOnce(responseError);

    try {
      await store.dispatch(getUsersList(login, pageNumber));
    } catch (error) {
      return error;
    } finally {
      const expectedActions = [
        {type: 'usersList/getUsersList'},
        {type: 'usersList/getUsersListFailed', payload: {message: responseError.message}},
      ];

      expect(store.getActions()).toEqual(expectedActions);

      const usersListAction = store.getActions().find(action => action.type === 'usersList/getUsersList');
      expect(usersListAction).toBeTruthy();
      expect(usersListAction.payload).toBeUndefined();

      const usersListFailedAction = store.getActions().find(action => action.type === 'usersList/getUsersListFailed');
      expect(usersListFailedAction).toBeTruthy(); // Убеждаемся, что экшен был найден
      expect(usersListFailedAction.payload).toEqual({message: responseError.message});
    }
  });
});

describe('sorted users list async action', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  const login = 'repos';
  const order = 'ascending';
  const pageNumber = 1;

  it('should fetch ascending-sorted users data successfully', async () => {
    // Создаем виртуальное хранилище
    const store = mockStore({});

    const mockFetchResponse = {
      total_count: 2,
      items: [
        {
          login: 'repos-10',
          avatar_url: 'https://some-image.png',
          html_url: 'https://some-profile-url.com',
          type: 'User'
        },
        {
          login: 'repos-25',
          avatar_url: 'https://some-picture.jpg',
          html_url: 'https://some-user-url.com',
          type: 'Organization'
        },
      ]
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockFetchResponse));

    // Типы ожидаемых экшенов при вызове dispatch
    const expectedActions = [
      {type: 'usersList/getUsersList'},
      {type: 'usersList/getUsersListSuccess', payload: mockFetchResponse},
      {
        type: 'pagination/getDataPerPageSuccess',
        payload: {total_count: mockFetchResponse.total_count, currentPage: pageNumber}
      },
    ];

    await store.dispatch(getUsersListSorted(login, order, pageNumber));

    expect(store.getActions()).toEqual(expectedActions);

    const paginationSuccessAction = store.getActions().find(action => action.type === 'pagination/getDataPerPageSuccess');
    expect(paginationSuccessAction).toBeTruthy();
    expect(paginationSuccessAction.payload).toEqual({
      total_count: mockFetchResponse.total_count,
      currentPage: pageNumber
    });

    const usersListSuccessAction = store.getActions().find(action => action.type === 'usersList/getUsersListSuccess');
    expect(usersListSuccessAction).toBeTruthy();
    expect(usersListSuccessAction.payload).toEqual(mockFetchResponse);

    const usersListAction = store.getActions().find(action => action.type === 'usersList/getUsersList');
    expect(usersListAction).toBeTruthy();
    expect(usersListAction.payload).toBeUndefined();
  });

  it('should fetch ascending-sorted users data failed', async () => {
    const store = mockStore({});

    const responseError = new Error('Какая-то ошибка');
    fetchMock.mockRejectOnce(responseError);

    try {
      await store.dispatch(getUsersListSorted(login, order, pageNumber));
    } catch (error) {
      return error;
    } finally {
      const expectedActions = [
        {type: 'usersList/getUsersList'},
        {type: 'usersList/getUsersListFailed', payload: {message: responseError.message}},
      ];

      expect(store.getActions()).toEqual(expectedActions);

      const usersListAction = store.getActions().find(action => action.type === 'usersList/getUsersList');
      expect(usersListAction).toBeTruthy();
      expect(usersListAction.payload).toBeUndefined();

      const usersListFailedAction = store.getActions().find(action => action.type === 'usersList/getUsersListFailed');
      expect(usersListFailedAction).toBeTruthy();
      expect(usersListFailedAction.payload).toEqual({message: responseError.message});
    }
  });
});

describe('popup user data async action', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  const login = 'Uno';
  const pageNumber = 1;

  it('should fetch user data successfully', async () => {
    // Создаем виртуальное хранилище
    const store = mockStore({});

    const mockFetchResponse = {
      login: 'Uno',
      html_url: 'https://uno-profile-url.com',
      name: 'Uno-the-One',
      bio: 'I am Uno',
      public_repos: 203,
      followers: 32,
      following: 47
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockFetchResponse));

    // Типы ожидаемых экшенов при вызове dispatch
    const expectedActions = [
      {type: 'popup/getPopupData'},
      {type: 'popup/getPopupDataSuccess', payload: mockFetchResponse},
    ];

    await store.dispatch(getPopupUserData(login));

    expect(store.getActions()).toEqual(expectedActions);

    const popupUserDataSuccessAction = store.getActions().find(action => action.type === 'popup/getPopupDataSuccess');
    expect(popupUserDataSuccessAction).toBeTruthy();
    expect(popupUserDataSuccessAction.payload).toEqual(mockFetchResponse);

    const popupUserDataAction = store.getActions().find(action => action.type === 'popup/getPopupData');
    expect(popupUserDataAction).toBeTruthy();
    expect(popupUserDataAction.payload).toBeUndefined();
  });

  it('should fetch user data failed', async () => {
    const store = mockStore({});

    const responseError = new Error('Какая-то ошибка');
    fetchMock.mockRejectOnce(responseError);

    try {
      await store.dispatch(getPopupUserData(login));
    } catch (error) {
      return error;
    } finally {
      const expectedActions = [
        {type: 'popup/getPopupData'},
        {type: 'popup/getPopupDataFailed', payload: {message: responseError.message}},
      ];

      expect(store.getActions()).toEqual(expectedActions);

      const popupUserDataFailedAction = store.getActions().find(action => action.type === 'popup/getPopupDataFailed');
      expect(popupUserDataFailedAction).toBeTruthy();
      expect(popupUserDataFailedAction.payload).toEqual({message: responseError.message});

      const popupUserDataAction = store.getActions().find(action => action.type === 'popup/getPopupData');
      expect(popupUserDataAction).toBeTruthy();
      expect(popupUserDataAction.payload).toBeUndefined();
    }
  });
});