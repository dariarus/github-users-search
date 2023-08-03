import React from 'react';

import appStyles from './app.module.css';

import {useAppDispatch, useSelector} from '../../services/types/hooks';

import {SearchForm} from '../search-form/search-form';
import {UserCard} from '../user-card/user-card';
import {Popup} from '../popup/popup';
import {Pagination} from '../pagination-page/pagination';
import {itemsCountPerPage, siblingPageCountInView} from '../../utils/constants';
import {getUsersList} from '../../services/actions/users';

function App() {
  const {usersListState, userReposCountState, paginationState} = useSelector(state => state);

  return (
    <main className={appStyles.main}>
      <SearchForm/>
      <ul className={appStyles['users-list']}>
        {
          usersListState.usersList.map((user, ind) => {
            return (
              <UserCard
                key={ind}
                avatarSrc={user.avatar_url}
                login={user.login}
                repoNumber={userReposCountState.reposCount[user.login]}
                profileUrl={user.html_url}
              />
            )
          })
        }
      </ul>
      <Pagination totalResults={paginationState.totalResults}
                  currentPage={paginationState.currentPage}
                  siblingCount={siblingPageCountInView}
                  itemsPerPage={itemsCountPerPage}
      />
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
