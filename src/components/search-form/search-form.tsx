import {ChangeEvent, FormEvent, FunctionComponent, useCallback, useState} from 'react';

import formStyles from './search-form.module.css';

import {Button} from '../button/button';

import {searchValueActions} from '../../services/store-slices/search-value';

import {getUsersList} from '../../services/actions/users';

import {useAppDispatch} from '../../services/types/hooks';

export const SearchForm: FunctionComponent<{onCleanSearchOption: () => void}> = (props) => {
  const [searchValue, setSearchValue] = useState<string>('');


  const dispatch = useAppDispatch();

  const handleSetSearchValue = useCallback((value: string) => {
    dispatch(searchValueActions.setSearchValue(value));
  }, [dispatch])



  return (
    <section>
      <form className={`${formStyles.form} ${formStyles['form_search']}`}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              props.onCleanSearchOption();
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
        <Button buttonName="Искать" isDisabled={searchValue === ''}/>
      </form>
    </section>
  )
}