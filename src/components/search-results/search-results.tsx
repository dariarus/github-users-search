import {ChangeEvent, FunctionComponent} from 'react';

import searchResultsStyles from './search-results.module.css';
import appStyles from '../app/app.module.css';

import {RadioButton} from '../radio-button/radio-button';
import {getPopupUserData, getUsersList, getUsersListSorted} from '../../services/actions/users';
import {UserCard} from '../user-card/user-card';

import {popupActions} from '../../services/store-slices/popup';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {SearchOptions, TSearchResults} from '../../services/types/props';
import {searchValueActions} from "../../services/store-slices/search-value";

export const SearchResults: FunctionComponent<TSearchResults> = (props) => {
  const {usersListState, searchValueState} = useSelector(state => state);

  const dispatch = useAppDispatch();
  return (
    <section className={searchResultsStyles.section}>
      {
        usersListState.usersList.length !== 0
          ? <>
            <p className={searchResultsStyles['form__text']}>Найдено результатов: {usersListState.totalResults}</p>
            <form className={searchResultsStyles.form}>
              <p className={searchResultsStyles['form__text']}>Сортировать пользователей по количеству репозиториев:</p>
              <div className={searchResultsStyles['form__radio-buttons-wrap']}>
                <RadioButton label="по возрастанию"
                             value="ascendingSearch"
                             checked={props.searchOptionValue === SearchOptions.ASCENDING}
                             onClickRadio={(e: ChangeEvent<HTMLInputElement>) => {
                               props.onChangeOptionValue(e);
                               dispatch(getUsersListSorted(searchValueState.searchValue, 'asc', 1));
                               // dispatch(searchValueActions.setOrderState('asc'))
                             }}/>
                <RadioButton label="по убыванию"
                             value="descendingSearch"
                             checked={props.searchOptionValue === SearchOptions.DESCENDING}
                             onClickRadio={(e: ChangeEvent<HTMLInputElement>) => {
                               props.onChangeOptionValue(e);
                               dispatch(getUsersListSorted(searchValueState.searchValue, 'desc', 1))
                             }}/>
                <RadioButton label="не сортировать"
                             value="unsortedSearch"
                             checked={props.searchOptionValue === SearchOptions.UNSORTED}
                             onClickRadio={(e: ChangeEvent<HTMLInputElement>) => {
                               props.onChangeOptionValue(e);
                               dispatch(getUsersList(searchValueState.searchValue, 1))
                             }}/>
              </div>
            </form>
            <ul className={searchResultsStyles['users-list']}>
              {
                usersListState.usersList.map((user, ind) => {
                  return (
                    <UserCard
                      key={ind}
                      avatarSrc={user.avatar_url}
                      login={user.login}
                      type={user.type}
                      profileUrl={user.html_url}
                      onClickCard={() => {
                        dispatch(popupActions.onOpenPopup("default"));
                        dispatch(getPopupUserData(user.login));
                        document.body.classList.add(appStyles.bodyOverlay);
                      }}
                    />
                  )
                })
              }
            </ul>
          </>
          : usersListState.totalResults === 0
            ? <p className={`${searchResultsStyles['form__text']} ${searchResultsStyles['form__text_secondary']}`}>
              Ничего не найдено
          </p>
            : <p className={`${searchResultsStyles['form__text']} ${searchResultsStyles['form__text_secondary']}`}>
              Здесь будут отображены результаты поиска и параметры сортировки
            </p>
      }
    </section>
  )
}