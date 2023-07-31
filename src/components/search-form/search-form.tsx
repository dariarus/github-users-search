import React, {FormEvent, FunctionComponent, useState} from 'react';

import formStyles from './search-form.module.css';
import {RadioButton} from '../radio-button/radio-button';
import {Button} from '../button/button';
import {getUsersList} from '../../services/actions/users';
import {useAppDispatch, useSelector} from '../../services/types/hooks';

export const SearchForm: FunctionComponent = () => {
  const [checked, setChecked] = useState(true);

  const {usersListState} = useSelector(state => state);
  const [searchValue, setSearchValue] = useState<string>('');

  const dispatch = useAppDispatch();

  return (
    <>
      <form className={`${formStyles.form} ${formStyles['form_search']}`}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              dispatch(getUsersList(searchValue));
            }}>
        <label htmlFor="search" className={formStyles['input__label']}>Поиск по пользователям GitHub</label>
        <input type="text"
               id="search"
               name="search"
               placeholder="Введите имя пользователя"
               value={searchValue}
               className={formStyles.input}
               onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button buttonName="Искать"/>
        <p className={formStyles['form__heading']}>Найдено результатов: {usersListState.totalResults}</p>
      </form>
      <form className={`${formStyles.form} ${formStyles['form_choose']}`}>
        <p className={formStyles['form__heading']}>Сортировать пользователей по количеству репозиториев:</p>
        <div className={formStyles['form__radio-buttons-wrap']}>
          <RadioButton label="по возрастанию" checked={checked} onClickRadio={() => {
            setChecked(!checked)
          }}/>
          <RadioButton label="по убыванию" checked={checked} onClickRadio={() => {
            setChecked(!checked)
          }}/>
        </div>
      </form>
    </>
  )
}