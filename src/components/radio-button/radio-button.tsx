import React, {FunctionComponent} from 'react';

import radioButtonStyles from './radio-button.module.css';

import {TRadioButton} from '../../services/types/props-types';

export const RadioButton: FunctionComponent<TRadioButton> = (props) => {

  return (
    <>
      <input type="radio"
             id="radio"
             name="radio"
             defaultChecked={props.checked}
             className={radioButtonStyles.input}
             onChange={props.onClickRadio}
      />
      <label htmlFor="radio" className={radioButtonStyles['input__label']}>{props.label}</label>
    </>
  )
}