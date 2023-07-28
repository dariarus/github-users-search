import React, {FunctionComponent} from 'react';

import formStyles from './search-form.module.css';

export const SearchForm: FunctionComponent = () => {
  return (
    <form className={formStyles.form}>
      <label htmlFor="search" className={formStyles['input__label']}>Поиск по пользователям GitHub</label>
        <input type="text"
               name="search"
               placeholder="Введите имя пользователя"
               className={formStyles.input}
        />
      <button type="submit" className={formStyles.button}>Искать</button>
    </form>
  )
}