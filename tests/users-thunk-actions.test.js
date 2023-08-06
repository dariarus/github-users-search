import fetchMock from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store';

import {getUsersList, getUsersListSorted, getPopupUserData} from '../src/services/actions/users';
import thunk from 'redux-thunk';
import {gitHubRestApiSearchUrl, itemsCountPerPage} from '../src/utils/constants';
import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../src/services/types/hooks';
import {usersListActions} from '../src/services/store-slices/users-list';
import {paginationActions} from '../src/services/store-slices/pagination';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('users async actions', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('should fetch user data successfully', async () => {
    const login = 'super'
    const pageNumber = 1;
    const fetchResponse = {
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
    fetchMock.mockResponseOnce(JSON.stringify(fetchResponse));

    // Создаем виртуальное хранилище
    const store = mockStore({})
    //   usersListState: {
    //     totalResults: null,
    //     usersList: []
    //   }
    // })

    // const dispatch = useAppDispatch()
    // Получаем состояние хранилища после выполнения Thunk
    // const usersListState = useSelector(state => state.usersListState)

    const expectedActions = [
      { type: 'usersList/getUsersList' },
      { type: 'usersList/getUsersListSuccess', payload: fetchResponse },
      { type: 'pagination/getDataPerPageSuccess', payload: { total_count: fetchResponse.total_count, currentPage: pageNumber } },
      ];

      // usersListActions.getUsersList.pending(), // Redux Toolkit автоматически создаст действие pending
      // usersListActions.getUsersList.fulfilled(fetchResponse), // Redux Toolkit автоматически создаст действие fulfilled с переданными данными
      // paginationActions.getDataPerPageSuccess({total_count: fetchResponse.total_count, currentPage: pageNumber}),


      await store.dispatch(getUsersList(login, pageNumber));

    expect(store.getActions()).toEqual(expectedActions);
    // .then(() => {
    // return of async actions
    // Проверяем, что данные о пользователе правильно записались в хранилище
    // expect(store.usersListState.totalResults).toEqual(fetchResponse.total_count);
    // expect(store.usersListState.usersList).toEqual(fetchResponse.items);
    // expect(store.usersListState.user.error).toBeNull();
    // })

  })


})