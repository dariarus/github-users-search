import React, {FunctionComponent, useState} from 'react';

import formStyles from './search-form.module.css';
import {RadioButton} from '../radio-button/radio-button';

export const SearchForm: FunctionComponent = () => {
  const [checked, setChecked] = useState(true)

  return (
    <>
      <form className={`${formStyles.form} ${formStyles['form_search']}`}>
        <label htmlFor="search" className={formStyles['input__label']}>Поиск по пользователям GitHub</label>
        <input type="text"
               id="search"
               name="search"
               placeholder="Введите имя пользователя"
               className={formStyles.input}
        />
        <button type="submit" className={formStyles.button}>Искать</button>
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