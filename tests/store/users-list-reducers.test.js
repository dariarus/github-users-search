import usersListReducers, {usersListActions} from '../../src/services/store-slices/users-list';

describe('users-list reducers', () => {
  it('should handle initial state', () => {
    expect(usersListReducers(undefined, {})).toEqual({
      isLoading: false,
      hasError: false,
      error: {},
      totalResults: null,
      usersList: []
    })
  });

  it('should handle getUsersListSuccess', () => {
    const initialState = {
      isLoading: false,
      hasError: false,
      error: {},
      totalResults: null,
      usersList: []
    };

    const payload = {
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

    const action = usersListActions.getUsersListSuccess(payload);
    const newState = usersListReducers(initialState, action);
    const expectedNewState = {
      isLoading: false,
      hasError: false,
      error: {},
      totalResults: payload.total_count,
      usersList: payload.items
    };

    expect(newState).toEqual(expectedNewState);
  });

  it('should handle getUsersList', () => {
    const initialState = {
      isLoading: false,
      hasError: false,
      error: {},
      totalResults: null,
      usersList: []
    };

    const action = usersListActions.getUsersList();
    const newState = usersListReducers(initialState, action);
    const expectedNewState = {
      isLoading: true,
      hasError: false,
      error: {},
      totalResults: null,
      usersList: []
    }

    expect(newState).toEqual(expectedNewState);
  });

  it('should handle getUsersListFailed', () => {
    const initialState = {
      isLoading: false,
      hasError: false,
      error: {},
      totalResults: null,
      usersList: []
    };

    const errorMessage = 'Произошла какая-то ошибка';

    const action = usersListActions.getUsersListFailed({message: new Error(errorMessage).message});
    const newState = usersListReducers(initialState, action);

    expect(newState.error.message).toBe(errorMessage);
  })
})