import React from 'react';

import appStyles from './app.module.css';

import {useAppDispatch, useSelector} from '../../services/types/hooks';

import {itemsCountPerPage, siblingPageCountInView} from '../../utils/constants';

import {SearchForm} from '../search-form/search-form';
import {UserCard} from '../user-card/user-card';
import {Pagination} from '../pagination-page/pagination';
import {Popup} from '../popup/popup';
import {getPopupUserData} from '../../services/actions/users';
import {popupActions} from '../../services/state-slices/popup';

function App() {
  const {
    usersListState,
    userReposCountState,
    paginationState,
    searchValueState,
    popupState
  } = useSelector(state => state);

  const dispatch = useAppDispatch();

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
                onClickCard={() => {
                  dispatch(popupActions.onOpenPopup());
                  dispatch(getPopupUserData(user.login));
                  document.body.classList.add(appStyles.bodyOverlay);
                }}
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
      {
        popupState.isOpen &&
        <Popup login={popupState.login}
               profileUrl={popupState.profileUrl}
               username={popupState.username}
               userInfo={popupState.userInfo}
               followers={popupState.followers}
               following={popupState.following}
               onClosePopup={() => {
                 dispatch(popupActions.onClosePopup());
                 document.body.classList.remove(appStyles.bodyOverlay);
               }}/>
      }
    </main>
  );
}

export default App;
