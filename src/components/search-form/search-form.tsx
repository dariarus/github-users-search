import React, {ChangeEvent, FormEvent, FunctionComponent, useCallback, useState} from 'react';

import formStyles from './search-form.module.css';

import {RadioButton} from '../radio-button/radio-button';
import {Button} from '../button/button';

import {getUsersList, getUsersListSorted} from '../../services/actions/users';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {searchValueActions} from '../../services/store-slices/search-value';

export const SearchForm: FunctionComponent = () => {
  const {usersListState, searchValueState} = useSelector(state => state);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchOptionValue, setSearchOptionValue] = useState<string>('unsortedSearch');

  const dispatch = useAppDispatch();

  const handleSetSearchValue = useCallback((value: string) => {
    dispatch(searchValueActions.setSearchValue(value));
  }, [dispatch])

  const handleRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchOptionValue(e.target.value);
  }

  return (
    <>
      <form className={`${formStyles.form} ${formStyles['form_search']}`}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setSearchOptionValue('unsortedSearch');
              dispatch(getUsersList(searchValue, 1));
            }}>
        <label htmlFor="search" className={formStyles['input__label']}>Поиск по пользователям GitHub</label>
        <input type="text"
               id="search"
               name="search"
               placeholder="Введите логин пользователя"
               value={searchValue}
               className={formStyles.input}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setSearchValue(e.target.value);
                 handleSetSearchValue(e.target.value);
               }}
        />
        <Button buttonName="Искать" buttonType="search"/>
        <p className={formStyles['form__heading']}>Найдено результатов: {usersListState.totalResults}</p>
      </form>
      <form className={`${formStyles.form} ${formStyles['form_choose']}`}>
        <p className={formStyles['form__heading']}>Сортировать пользователей по количеству репозиториев:</p>
        <div className={formStyles['form__radio-buttons-wrap']}>
          <RadioButton label="по возрастанию"
                       value="ascendingSearch"
                       checked={searchOptionValue === "ascendingSearch"}
                       onClickRadio={(e: ChangeEvent<HTMLInputElement>) => {
                         handleRadioButtonChange(e);
                         dispatch(getUsersListSorted(searchValueState.searchValue, 'asc', 1))
                       }}/>
          <RadioButton label="по убыванию"
                       value="descendingSearch"
                       checked={searchOptionValue === "descendingSearch"}
                       onClickRadio={(e: ChangeEvent<HTMLInputElement>) => {
                         handleRadioButtonChange(e);
                         dispatch(getUsersListSorted(searchValueState.searchValue, 'desc', 1))
                       }}/>
          <RadioButton label="не сортировать"
                       value="unsortedSearch"
                       checked={searchOptionValue === "unsortedSearch"}
                       onClickRadio={(e: ChangeEvent<HTMLInputElement>) => {
                         handleRadioButtonChange(e);
                         dispatch(getUsersList(searchValueState.searchValue, 1))
                       }}/>
        </div>
      </form>
    </>
  )
}