import React, {useCallback} from 'react';

import appStyles from './app.module.css';

import {useAppDispatch, useSelector} from '../../services/types/hooks';

import {SearchForm} from '../search-form/search-form';
import {UserCard} from '../user-card/user-card';
import {Popup} from '../popup/popup';
import {Button} from '../button/button';
import {getUserReposCount} from '../../services/actions/users';
import {AppThunk} from '../../services/types';
import {ThunkAction} from 'redux-thunk';

function App() {
  const {usersListState, userReposCountState} = useSelector(state => state);
  const dispatch = useAppDispatch();

  // Promise.resolve(getUserReposCount('dariarus')).then(res => console.log(res))

console.log(userReposCountState.reposCount)

  return (
    <main className={appStyles.main}>
      <SearchForm/>
      <div className={appStyles['main__cards-wrap']}>
        {
          usersListState.usersList.map((user) => {
            return (
              <UserCard
                avatarSrc={user.avatar_url}
                login={user.login}
                // repoNumber={3}
                repoNumber={userReposCountState.reposCount[user.login]}
                profileUrl={user.html_url}
              />
            )
          })
        }
        <Button buttonName="Показать еще" onClick={() => console.log('hi')}/>
      </div>
      {/*<Popup onClosePopup={() => console.log('hi')}*/}
      {/*       login="dariarus"*/}
      {/*       profileUrl="https://github.com/dariarus"*/}
      {/*       username="Daria"*/}
      {/*       userInfo="Привет! Меня зовут Дарья. Меняю профессию и постепенно приближаюсь к цели стать веб-разработчиком! Связаться со мной можно по почте rusanova_dv@mail.ru"*/}
      {/*       followers={2}*/}
      {/*       following={4}*/}

      {/*/>*/}
    </main>
  );
}

export default App;
